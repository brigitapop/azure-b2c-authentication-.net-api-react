
# Register API application

- Select your B2C tenant directory, 
- Go to App registrations and select New registration
- Add a dummy redirect URI
  
![alt text](https://github.com/brigitapop/azure-b2c-authentication/blob/main/register-api.png?raw=true)

- Expose the API
 
![alt text](https://github.com/brigitapop/azure-b2c-authentication/blob/main/expose-api.png?raw=true)

All APIs have to publish a minimum of one scope for the client's to obtain an access token successfully. 


Useful resources:
https://docs.microsoft.com/en-us/samples/azure-samples/active-directory-aspnetcore-webapp-openidconnect-v2/how-to-secure-a-web-api-built-with-aspnet-core-using-the-azure-ad-b2c/
