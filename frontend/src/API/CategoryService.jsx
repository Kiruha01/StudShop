import axios from "axios";

export default class CategoryService{
    static async getAll() {
        try {
            const response = await axios.get('http://localhost:5000/api/categories/'
            )
            return response.data
        } catch (e) {
                console.log(e)
                return []
        }
    }

    static async create(name) {
        try {
            const response = await axios.post('http://localhost:5000/api/categories/', {
                name: name
                }
            )
            return response
        } catch (e) {
            console.log(e)
            return null
        }
    }

    static async delete(id) {
        try {
            const response = await axios.delete('http://localhost:5000/api/categories/' + id + '/'
            )
            return response
        } catch (e) {
            console.log(e)
            return null
        }
    }
}