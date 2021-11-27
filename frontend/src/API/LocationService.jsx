import axios from "axios";

export default class LocationService{
    static async getAll() {
        try {
            const response = await axios.get('http://localhost:5000/api/locations/'
            )
            return response.data
        } catch (e) {
            console.log(e)
            return []
        }
    }
}