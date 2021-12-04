import React, { useEffect, useState } from "react";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import axios from 'axios';

import App from "./App.js";

const AppProvider = () => {
    const [config, setConfig] = useState(undefined);
    
    useEffect(() => {
        const fetchConfig = async () => {
            const config = await axios('http://localhost:3000/config.json');
            setConfig({
                auth: {
                    clientId: config.data.azure_b2c.clientId,
                    authority: config.data.azure_b2c.authority,
                    knownAuthorities: config.data.azure_b2c.knownAuthorities,
                    redirectUri: config.data.azure_b2c.redirectUri
                }
            });
        }
        fetchConfig();
    }, []);

    if (config) {
        const pca = new PublicClientApplication(config);
        return (
            <MsalProvider instance={pca}>
                <App />
            </MsalProvider>
        );
    } else {
        return <></>
    }
};

export default AppProvider;