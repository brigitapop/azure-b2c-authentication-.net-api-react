#Setup API to interact with AAD B2C
After you created a new Asp .Net Core API, install [Microsoft.Identity.Web](https://www.nuget.org/packages/Microsoft.Identity.Web). This package enables ASP.NET Core web apps and web APIs to use the Microsoft identity platform (formerly Azure AD v2.0).

Configure the authentication service in the Startup:
```Csharp
  services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddMicrosoftIdentityWebApi(options =>
               {
                  Configuration.Bind("AzureAdB2C", options);

                   options.TokenValidationParameters.NameClaimType = "name";
               },
               options => { Configuration.Bind("AzureAdB2C", options); });
```
Call authentication service in the middleware: 
```Csharp
   app.UseAuthentication();
            
   app.UseAuthorization();
```

Decorate controller with authorization attribute:
```Csharp
   [Authorize]
   Route("[controller]")]
   public class WeatherForecastController : ControllerBase
``` 

Add Azure AD B2C information the the config file: 
```json
"AzureAdB2C": {
    "Instance": "https://azureb2cdocumentation.b2clogin.com",
    "ClientId": "6fb40fef-5d35-40bf-8dc3-b5d404de19f4",
    "Domain": "azureb2cdocumentation.onmicrosoft.com",
    "SignUpSignInPolicyId": "B2C_1_SignUpIn"
  }
```
ClientId => the id of the [application registered for the API](https://github.com/brigitapop/azure-b2c-authentication-.net-api-react/blob/main/register-net-api-application.md).



Useful resources:
https://docs.microsoft.com/en-us/samples/azure-samples/active-directory-aspnetcore-webapp-openidconnect-v2/how-to-secure-a-web-api-built-with-aspnet-core-using-the-azure-ad-b2c/
