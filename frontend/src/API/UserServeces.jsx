import axios from "axios";

export default class UserServeces{
    static async getInfo() {
        try {
            const response = await axios.get('https://fadverts-kirill.azurewebsites.net/api/User/'
            )
            return response.data
        } catch (e) {
            if (e.response) {
                return null
            }
        }
    }

    static async getInfoById(id) {
        try {
            const response = await axios.get('https://fadverts-kirill.azurewebsites.net/api/User/' + id + '/'
            )
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

    static async updateComMethod(user_id, method) {
        try {
            return await axios.put('https://fadverts-kirill.azurewebsites.net/api/User/' + (user_id ? (user_id + '/') : ''), {
                com_method: method
                }
            ).data
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

    static async getAllDeals(user_id) {
        try {
            const response = await axios.get('https://fadverts-kirill.azurewebsites.net/api/User/' + user_id + '/deals/'
            )
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
        console.log('Send post')
        const r = await axios.post('https://fadverts-kirill.azurewebsites.net/api/User/')
        console.log(r)
    }

    static async logout(){

    }

    static getLoginUrl(redirectUrl){
        return 'http://localhost:5000/login'
    }

    static getLogoutUrl(){
        return 'http://localhost:5000/logout'
    }
}