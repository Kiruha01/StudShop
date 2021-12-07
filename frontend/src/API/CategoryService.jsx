import axios from "axios";

export default class CategoryService{
    static async getAll() {
        try {
            const response = await axios.get('https://fadverts-kirill.azurewebsites.net/api/Category/'
            )
            return response.data
        } catch (e) {
                console.log(e)
                return []
        }
    }
}