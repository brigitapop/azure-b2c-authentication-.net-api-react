# Authentication in a single-page application using AAD B2C

This documentation page provides the steps on how to implement authentication for a single-page application using Azure AD B2C. 

The single-page application is implemented in react, and calls an API implemented in ASP.Net Core. 
- [Create a new React app](https://reactjs.org/docs/create-a-new-react-app.html)
- [Create a new ASP.NET Core API](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio)


The interaction between the single-page application and Azure AD B2C will look as in the diagram below: 

![alt text](https://github.com/brigitapop/azure-b2c-authentication/blob/main/diagram.png?raw=true)



Before your applications can interact with Azure AD B2C, they must be registered in a tenant that you manage.

- [Tutorial on how to create a new tenant](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant)

After you have access to the tenant, register both react and API application: 

- [Register ASP.Net Core API application](https://github.com/brigitapop/azure-b2c-authentication/blob/main/register-net-api-application.md)

- [Register react front-end application](https://github.com/brigitapop/azure-b2c-authentication/blob/main/register-react-client-application.md)


The next step is to define the user interaction with the application. Azure AD B2C offers two methods of defining how users interact with the applications: through predefined user flows, or through fully configurable custom policies.

 **User flows** are predefined, built-in, configurable policies that provide a way to create sign-up, sign-in, edit profile, reset password directly from Azure AD B2C UI.
 - [Create user journey in Azure Active Directory B2C using predefined user flows](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-user-flows?pivots=b2c-user-flow)
 - [Set up a sign-up and sign-in](https://docs.microsoft.com/en-us/azure/active-directory-b2c/add-sign-up-and-sign-in-policy?pivots=b2c-user-flow)
 - [Password reset flow](https://docs.microsoft.com/en-us/azure/active-directory-b2c/add-password-reset-policy?pivots=b2c-user-flow)

 **Custom policies** enable the creation of user journeys using xml configuration files. The files are build based on templates provided by the Azure team and uploaded into Azure B2C.

- [Create user journey in Azure Active Directory B2C using custom policies](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-user-flows?pivots=b2c-custom-policy)
- [User journey custom policies templates](https://github.com/Azure-Samples/active-directory-b2c-custom-policy-starterpack) 


After the user journey is created, the single-page application can be configured to interact with Azure B2C. 

- [Setup front-end application to interact with AAD B2C](https://github.com/brigitapop/azure-b2c-authentication-.net-api-react/blob/main/setup-react-application-to-interact-with-aad-b2c.md)
- [Setup API to interact with AAD B2C](https://github.com/brigitapop/azure-b2c-authentication-.net-api-react/blob/main/setup-api-to-interect-with-aad-b2c%20.md)



Other useful resources: 
[Azure Active Directory B2C (AAD B2C) for beginners](https://www.youtube.com/watch?v=M23P7tj_bXA)
[Azure Active Directory B2C with Azure Active Directory](https://www.youtube.com/watch?v=6H3iOIWaSzM)
