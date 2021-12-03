import { useAuth0 } from "@auth0/auth0-react";

async function getToken(){
    const { getAccessTokenSilently } = useAuth0();
    return await getAccessTokenSilently();

}
