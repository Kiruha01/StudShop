import axios from "axios";

export default class AdvertServices{
    static async getAll(params) {
            const response = await axios.get('https://fadverts-kirill.azurewebsites.net/api/Products/', {
                params: params
            })
            console.log(response.data)
            return response.data

    }

    static async create(params) {
        try {
            const response = await axios.post('https://fadverts-kirill.azurewebsites.net/api/Products/', params)
            console.log(response.data)
            return response
        }
        catch (e){
            return e.response
        }
    }

    static async edit(id, params) {
        try {
            const response = await axios.put('https://fadverts-kirill.azurewebsites.net/api/Products/' + id + '/', params)
            return response
        }
        catch (e){
            return e.response
        }
    }

    static async add_photo(id, photo) {
        try {
            const response = await axios.post('https://fadverts-kirill.azurewebsites.net/api/Products/' + id + '/pictures/', photo, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                }

            )
            return response
        }
        catch (e){
            return e.response
        }
    }

    static async getById(id) {
        try {
            const response = await axios.get('https://fadverts-kirill.azurewebsites.net/api/Products/' + id + '/')
            return response
        }
        catch (e){
            return e.response
        }
    }

    static async set_is_active(id, is_active) {
        try {
            const response = await axios.put('http://localhost:5000/api/products/' + id + '/', {
                is_active: is_active
            })
            return response
        }
        catch (e){
            return e.response
        }
    }
}