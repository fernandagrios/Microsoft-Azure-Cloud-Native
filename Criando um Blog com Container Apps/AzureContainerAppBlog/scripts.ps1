# 1. Build da imagem Docker
docker build -t blog-webapp .

# 2. Rodar localmente para testar
docker run -d -p 8080:80 blog-webapp

# 3. Login no Azure
az login

# 4. Variáveis
$resourceGroup = "BlogRG"
$location = "eastus"
$acrName = "blogacr$((Get-Random -Maximum 9999))"
$containerAppEnv = "blogEnv"
$appName = "blogApp"

# 5. Criar grupo de recursos
az group create --name $resourceGroup --location $location

# 6. Criar Azure Container Registry
az acr create --resource-group $resourceGroup --name $acrName --sku Basic --admin-enabled true

# 7. Fazer login no ACR
az acr login --name $acrName

# 8. Obter login server
$loginServer = (az acr show --name $acrName --query loginServer --output tsv)

# 9. Tag da imagem
docker tag blog-webapp $loginServer/blog-webapp:v1

# 10. Push da imagem
docker push $loginServer/blog-webapp:v1

# 11. Criar ambiente do Azure Container Apps
az containerapp env create --name $containerAppEnv --resource-group $resourceGroup --location $location

# 12. Criar Azure Container App
az containerapp create `
  --name $appName `
  --resource-group $resourceGroup `
  --environment $containerAppEnv `
  --image "$loginServer/blog-webapp:v1" `
  --target-port 80 `
  --ingress 'external' `
  --registry-server $loginServer `
  --query properties.configuration.ingress.fqdn
