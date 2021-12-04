import React, { useCallback, useEffect, useState } from "react"
import { useMsal, useAccount } from "@azure/msal-react";
import { InteractionStatus } from '@azure/msal-browser';
import axios from 'axios';

export function App() {
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [config, setConfig] = useState(undefined);
    const [accessToken, setAccessToken] = useState(undefined);

    useEffect(() => {
        const fetchConfig = async () => {
            const config = await axios('http://localhost:3000/config.json');
            setConfig(config.data);
        }
        fetchConfig();
    }, []);

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

    if (accounts.length > 0) {
        return <>
            <span>There are currently {accounts.length} users signed in!</span>
            <button onClick={() => instance.logout()}>Logout</button>
            <button onClick={() => callApi()}>Call API</button>
        </>
    }
    else {
        return <></>
    }
}

export default App;
