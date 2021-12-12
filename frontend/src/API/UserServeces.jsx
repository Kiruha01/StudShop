import axios from "axios";

export default class UserServeces{
    static async getInfo() {
        try {
            const response = await axios.get('http://localhost:5000/api/user/'
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
            const response = await axios.get('http://localhost:5000/api/user/' + id + '/'
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
            const response = await axios.put('http://localhost:5000/api/user/' + (user_id ? (user_id + '/') : ''), {
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

    static async updateStaff(user_id, is_staff) {
        try {
            const response = await axios.put('http://localhost:5000/api/user/' + user_id +'/', {
                    is_staff: is_staff
                }
            )
            return response
        } catch (e) {
            if (e.response) {
                return e.response
            }
            else {
                console.log(e)
                return {status: 0}
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
        console.log('Send post')
        const r = await axios.get('http://localhost:5000/login')
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