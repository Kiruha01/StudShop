import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(
    <Auth0Provider
        domain="dev-glbhrzbb.us.auth0.com"
        clientId="SNMfOzcwuhLclAfa7Ubb6LavEtgMfm2p"
        redirectUri={window.location.origin}
        audience="http://rfuipwdpfisvndipfvmpitmvsdimsdfivf.com"
    >
        <App />
    </Auth0Provider>,
  document.getElementById('root')
);
