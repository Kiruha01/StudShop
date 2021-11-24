import axios from "axios";

export default class UserServeces{
    static async getInfoAboutMe() {
        try {
            const response = await axios.get('http://localhost:5000/api/user/'
            )
            console.log('!' + response.status)
            return response.data
        } catch (e) {
            if (e.response.status === 401)
                return null

        }
    }

    static getLoginUrl(redirectUrl){
        return 'http://localhost:5000/login'
    }

    static getLogoutUrl(){
        return 'http://localhost:5000/logout'
    }
}