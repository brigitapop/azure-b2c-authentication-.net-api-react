


- Go to App registrations and select New registration
- Add redirect URL 
- 
![alt text](https://github.com/brigitapop/azure-b2c-authentication/blob/main/1-register-client-add-redirect-uri.png?raw=true)

- Select the tokens you would like to be issued by the authorization endpoint
- 
![alt text](https://github.com/brigitapop/azure-b2c-authentication/blob/main/2-register-client-add-token.png)

See more details regarding [Tokens in Azure Active Directory B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview)


- In the _API permission_ section we need to add our web API permission (you should be able to see the web API listed in the My APIs section in the Request API permissions blade) to this front end application and make sure to grant admin consent
![alt text](https://github.com/brigitapop/azure-b2c-authentication/blob/main/3-register-client-api-permission.png)
![alt text](https://github.com/brigitapop/azure-b2c-authentication/blob/main/4-register-client-api-permission.png)
![alt text](https://github.com/brigitapop/azure-b2c-authentication/blob/main/5-register-client-api-permission.png)

