import axios from "axios";

export default class AdvertServices{
    static async getAll(params) {
        const response = await axios.get('http://localhost:5000/api/products/', {
            params: params
        })
        console.log(response.data)
        return response.data
    }

    static async getById(id) {
        try {
            const response = await axios.get('http://localhost:5000/api/products/' + id + '/')
            return response
        }
        catch (e){
            return e.response
        }
    }
}