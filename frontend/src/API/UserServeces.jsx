import axios from "axios";

export default class UserServeces{
    static async getInfo() {
        try {
            const response = await axios.get('http://localhost:5000/api/user/'
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

    static async getInfoById(id) {
        try {
            const response = await axios.get('http://localhost:5000/api/user/' + id + '/'
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

    static async updateComMethod(user_id, method) {
        try {
            const response = await axios.put('http://localhost:5000/api/user/' + user_id ? (user_id + '/') : '', {
                com_method: method
                }
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

    static async getAllDeals(user_id) {
        try {
            const response = await axios.get('http://localhost:5000/api/user/' + user_id + '/deals/'
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
        await axios.get('http://localhost:5000/hook/',)
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