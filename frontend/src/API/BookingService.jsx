import axios from "axios";

export default class BookingService{
    static async getAllBookings(product_id) {
        const response = await axios.get('http://localhost:5000/api/products/' + product_id + '/bookings/')
        console.log(response.data)
        return response.data
    }

}