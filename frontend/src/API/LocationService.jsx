import axios from "axios";

export default class LocationService{
    static async getAll() {
        try {
            const response = await axios.get('https://fadverts-kirill.azurewebsites.net/api/Location/'
            )
            return response.data
        } catch (e) {
            console.log(e)
            return []
        }
    }
}