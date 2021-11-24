import axios from "axios";

export default class BookingService{
    static async getAllBookings(product_id) {
        const response = await axios.get('http://localhost:5000/api/products/' + product_id + '/bookings/', {withCredentials: true})
        console.log(response.data)
        return response.data
    }

    static async deleteBooking(product_id, booking_id) {
        await axios.delete('http://localhost:5000/api/products/' + product_id +
            '/bookings/' + booking_id + '/', {withCredentials: true})
    }

    static async Book(product_id) {
        await axios.post('http://localhost:5000/api/products/' + product_id +
            '/bookings/', {withCredentials: true})
    }

    static async Unbook(product_id) {
        await axios.delete('http://localhost:5000/api/products/' + product_id +
            '/bookings/', {withCredentials: true})
    }

}