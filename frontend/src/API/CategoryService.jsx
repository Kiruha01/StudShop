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
}