import axios from "axios";

export default class AdvertServices{
    static async getAll(params) {
        const response = await axios.get('http://localhost:5000/api/products/', {
            params: params
        })
        console.log(response.data)
        return response.data
    }

    static async create(params) {
        try {
            const response = await axios.post('http://localhost:5000/api/products/', params)
            console.log(response.data)
            return response
        }
        catch (e){
            return e.response
        }
    }

    static async edit(id, params) {
        try {
            const response = await axios.put('http://localhost:5000/api/products/' + id + '/', params)
            return response
        }
        catch (e){
            return e.response
        }
    }

    static async add_photo(id, photo) {
        try {
            const response = await axios.post('http://localhost:5000/api/products/' + id + '/pictures/', photo, {
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

    static async delete_photo(id, p_id) {
        try {
            const response = await axios.delete('http://localhost:5000/api/products/' + id + '/pictures/' + p_id + '/'
            )
            return response
        }
        catch (e){
            return e.response
        }
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

    static async set_selled(id) {
        try {
            const response = await axios.get('http://localhost:5000/api/products/' + id + '/bookings/approve/')
            return response
        }
        catch (e){
            return e.response
        }
    }
}