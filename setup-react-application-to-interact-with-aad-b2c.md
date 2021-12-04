# Setup react application to interact with AAD B2C

After the [react application](https://reactjs.org/docs/create-a-new-react-app.html) is created, install [@azure/msal-react](https://www.npmjs.com/package/@azure/msal-react).
Read [Getting Started](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md) documentation, it will help to easily understand the [POC](https://tfs17.evozon.com/tfs/DotNetDocumentation/DotNetDocumentation/_git/Authentication?path=%2Fspa_authentication_client).

[@azure/msal-react](https://www.npmjs.com/package/@azure/msal-react) is built on the React context API and all parts of the app that require authentication must be wrapped in the MsalProvider component. 

In the POC a component, [AppProvider](https://tfs17.evozon.com/tfs/DotNetDocumentation/DotNetDocumentation/_git/Authentication?path=%2Fspa_b2c_auth_client%2Fsrc%2FAppProvider.js), that wraps the entire app was implemented.
```javascript
  const pca = new PublicClientApplication(config);
        return (
            <MsalProvider instance={pca}>
                <App />
            </MsalProvider>
        );
```

In the [App](https://tfs17.evozon.com/tfs/DotNetDocumentation/DotNetDocumentation/_git/Authentication?path=%2Fspa_b2c_auth_client%2Fsrc%2FApp.js) component, it is checked if the user is authenticated and redirected to Azure B2C login page if it is not: 
```javascript
    useEffect(() => {
        async function loginRedirect() {
            if (!account && inProgress === InteractionStatus.None) {
                try {
                    await instance.loginRedirect();
                } catch (error) {
                    console.error(error); //handle error
                }
            }
        }
        loginRedirect()
    }, [account, inProgress, instance])
```
After the user is authenticated, the token is requested:

```javascript
    useEffect(() => {
        if (account && config) {
            instance.acquireTokenSilent({
                scopes: config.azure_b2c.scopes,
                account: account
            }).then((response) => {
                if (response) {
                    setAccessToken(response.accessToken);
                }
            });
        }
    }, [account, config, instance]);
```

Once we have the access token secured calls can be done to the API. The token is added to the request header.
```javascript
    const callApi = useCallback(async () => {
        let request = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json; charset=utf-8; application/problem+json'
            }
          };
        const data = await axios('https://localhost:5002/weatherforecast',request);
        console.log(data);
    },[accessToken])
```

The configurations are added in the configuration file config.json
```json
{
    "azure_b2c":{
        "clientId": "6f8333fa-c844-44a9-85da-92118b7a0b54",
        "authority": "https://azureb2cdocumentation.b2clogin.com/azureb2cdocumentation.onmicrosoft.com/B2C_1_SignUpIn",
        "knownAuthorities": ["azureb2cdocumentation.b2clogin.com"],
        "redirectUri": "http://localhost:3000",
        "scopes": ["https://azureb2cdocumentation.onmicrosoft.com/6fb40fef-5d35-40bf-8dc3-b5d404de19f4/api.operations"]
    }
}
```
_clientId_  => the id  of the application registred for the react application, see [Register react single-page application](https://tfs17.evozon.com/tfs/DotNetDocumentation/DotNetDocumentation/_wiki/wikis/DotNetDocumentation.wiki/21/Register-react-single-page-application) 
_authority_ => computed as https://{tenant-name}.b2clogin.com/{tenant-name}.onmicrosoft.com/{sign-in-policy-name}
_knownAuthorities_ => the name of the tenant 
_scopes_ => the API Permission added when [registered react single-page application](https://tfs17.evozon.com/tfs/DotNetDocumentation/DotNetDocumentation/_wiki/wikis/DotNetDocumentation.wiki/21/Register-react-single-page-application) 


