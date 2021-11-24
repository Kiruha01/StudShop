import axios from "axios";

export default class UserServeces{
    static async getInfoAboutMe() {
        try {
            const response = await axios.get('http://localhost:5000/api/user/', {withCredentials: true}
            )
            console.log('!' + response.status)
            return response.data
        } catch (e) {
            if (e.response) {
                if (e.response.status === 401)
                    return null

            }
            else {
                console.log(e)
                return null
            }
        }
    }

    static async login(){
        await axios.get('http://localhost:5000/hook/', {withCredentials: true})
    }

    static async logout(){
        await axios.get('http://localhost:5000/logout/', {withCredentials: true})
    }

    static getLoginUrl(redirectUrl){
        return 'http://localhost:5000/login'
    }

    static getLogoutUrl(){
        return 'http://localhost:5000/logout'
    }
}