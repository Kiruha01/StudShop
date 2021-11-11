import axios from "axios";

export default class AdvertServices{
    static async getAll() {
        const response = await axios.get('http://localhost:5000/api/products/')
        console.log(response.data)
        return response.data
    }
}