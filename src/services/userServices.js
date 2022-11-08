import axios from '../axios'

const handleLoginApi = (userTen_tk, userMat_khau) => {
    return axios.post('/api/login', { ten_tk: userTen_tk, mat_khau: userMat_khau });
}

const getAllStaff = (inputId) => {
    return axios.get(`/api/get-all-staff?id=${inputId}`)
}

const getAllMovie = (inputId) => {
    return axios.get(`/api/get-all-movie?id=${inputId}`)
}

const createNewStaffService = (data) => {
    return axios.post('/api/create-new-staff', data)
}

const createNewMovieService = (data) => {
    return axios.post('/api/create-new-movie', data)
}

const createNewEventService = (data) => {
    return axios.post('/api/create-new-event', data)
}

const createNewFoodService = (data) => {
    return axios.post('/api/create-new-food', data)
}

const createNewTicketService = (data) => {
    return axios.post('/api/create-ticket', data)
}

const createNewBillFoodService = (data) => {
    return axios.post('/api/create-bill-food', data)
}

const createNewDetailTicketService = (data) => {
    return axios.post('/api/create-detail-ticket', data)
}

const createShowtimeService = (data) => {
    return axios.post('/api/create-showtime-detail', data)
}

const registerNowService = (data) => {
    return axios.post('/api/register-now', data)
}

const createRatingService = (data) => {
    return axios.post('/api/create-new-rating', data)
}

const createReportService = (data) => {
    return axios.post('/api/report-rating', data)
}

const createPaymentCheckoutService = (data) => {
    return axios.post('/create_payment_url', data)
}



const deleteStaffService = (staffId) => {
    return axios.delete('/api/delete-staff', {
        data: {
            id: staffId
        }
    });
}

const deleteTicketService = (ticketId) => {
    return axios.delete('/api/delete-ticket', {
        data: {
            id: ticketId
        }
    });
}

const deleteRatingService = (ratingId) => {
    return axios.delete('/api/delete-rating', {
        data: {
            id: ratingId
        }
    });
}

const deleteReportService = (reportId) => {
    return axios.delete('/api/delete-report', {
        data: {
            id_dg: reportId
        }
    });
}

const editStaffService = (inputData) => {
    return axios.put('/api/edit-staff', inputData)
}

const editMemberService = (inputData) => {
    return axios.put('/api/edit-member', inputData)
}

const getGenreService = (inputId) => {
    return axios.get(`/api/get-genre?id=${inputId}`)
}

const getEmailService = (inputId) => {
    return axios.get(`/api/get-email-by-Id?id=${inputId}`)
}

const getProvinceService = (inputId) => {
    return axios.get(`/api/get-province?id=${inputId}`)
}

const getTheaterService = (inputId) => {
    return axios.get(`/api/get-theater?tinh_tpId=${inputId}`)
}

const getComingSoonService = () => {
    return axios.get(`/api/get-coming-soon`)
}

const getPaymentMethodsService = (inputId) => {
    return axios.get(`/api/get-payment-methods?id=${inputId}`)
}

const getStateMovieService = () => {
    return axios.get(`/api/get-state-movie`)
}

const getTheaterByIdService = (inputId) => {
    return axios.get(`/api/get-theater-by-Id?idd=${inputId}`)
}

const getMovieByIdService = (inputId) => {
    return axios.get(`/api/get-movie-by-Id?id=${inputId}`)
}

const getTicketByIdTVService = (inputId) => {
    return axios.get(`/api/get-Ticket-by-IdTV?id_tv=${inputId}`)
}

const getDetailTicketByIdTicketService = (inputId) => {
    return axios.get(`/api/get-DetailTicket-by-IdTicket?id=${inputId}`)
}

const getPaymentByIdService = (inputId) => {
    return axios.get(`/api/get-payment-by-Id?id=${inputId}`)
}

const getCinemaRoomService = (inputId) => {
    return axios.get(`/api/get-cinema-room?rapId=${inputId}`)
}

const getShowtimeService = (inputId) => {
    return axios.get(`/api/get-showtime?id=${inputId}`)
}

const getNowShowingService = (inputId) => {
    return axios.get(`/api/get-now-showing?id=${inputId}`)
}

const getEventService = (inputId) => {
    return axios.get(`/api/get-event?id=${inputId}`)
}



const getMovieNowShowingById = (inputId) => {
    return axios.get(`/api/get-movie-detail?ten_phim=${inputId}`)
}

// const getNationService = (inputId) => {
//     return axios.get(`/api/get-nation?id=${inputId}`)
// }

// const getDirectorService = (inputId) => {
//     return axios.get(`/api/get-director?id=${inputId}`)
// }

const getMovieFormatService = (inputId) => {
    return axios.get(`/api/get-movie-format?id=${inputId}`)
}

const getFoodService = () => {
    return axios.get(`/api/get-food`)
}

const getAllTicketService = () => {
    return axios.get(`/api/get-all-ticket`)
}

const getAllReportService = () => {
    return axios.get(`/api/get-report`)
}

const getLimitTicketService = (params) => {
    return axios.get(`/api/get-ticket-limit`, { params })
}

const getSeatByCinemaRoomIdService = (inputId) => {
    return axios.get(`/api/get-seat-by-cinemaRoomId?id_phong_chieu=${inputId}`)
}

const getSeatByCinemaRoomIdVIPService = (inputId) => {
    return axios.get(`/api/get-seat-by-cinemaRoomIdVIP?id_phong_chieu=${inputId}`)
}

const getMemberByIdTKService = (inputId) => {
    return axios.get(`/api/get-member-by-IdTK?id_tk=${inputId}`)
}

const getRatingByMovieIdService = (inputId) => {
    return axios.get(`/api/get-rating-by-IdMovie?id_phim=${inputId}`)
}

const getIdSeatByIdShowtimeService = (inputId) => {
    return axios.get(`/api/get-idSeat-by-idShowtime?id_suat_chieu=${inputId}`)
}

const searchTicketService = (condition) => {
    return axios.get(`/api/search-ticket`, {
        params: condition
    })
}

const getMovieFormatByIdService = (movieId, provinceId, date) => {
    return axios.get(`/api/get-movie-format-by-Id?movieId=${movieId}&provinceId=${provinceId}&date=${date}`)
}

const getShowtimeByDate = (movieId, provinceId, date) => {
    return axios.get(`/api/get-showtime-by-date?movieId=${movieId}&provinceId=${provinceId}&date=${date}`)
}

const getPayment = (data) => {
    return axios.post('/create_payment_url', data);

}

// const cancelTicket = (id) => {
//     return axios.post('/api/cancel-ticket?id=${id}')

// }

const cancelTicket = (inputId) => {
    return axios.put(`/api/cancel-ticket?id=${inputId}`)
}

export {
    handleLoginApi, getAllStaff, createNewStaffService,
    deleteStaffService, editStaffService, getGenreService,
    createNewMovieService, getNowShowingService, getAllMovie,
    getMovieNowShowingById, getProvinceService, getTheaterService,
    getCinemaRoomService, getShowtimeService, getMovieFormatService,
    createShowtimeService, getShowtimeByDate, getMovieFormatByIdService,
    getTheaterByIdService, getSeatByCinemaRoomIdService, getSeatByCinemaRoomIdVIPService,
    createNewEventService, getEventService, getPaymentMethodsService,
    getMovieByIdService, createNewTicketService, createNewDetailTicketService,
    getEmailService, createNewFoodService, getFoodService, getPaymentByIdService,
    createNewBillFoodService, createPaymentCheckoutService, getTicketByIdTVService,
    getPayment, getDetailTicketByIdTicketService, cancelTicket, getMemberByIdTKService,
    createRatingService, getRatingByMovieIdService, getIdSeatByIdShowtimeService,
    getAllTicketService, deleteTicketService, searchTicketService, registerNowService,
    editMemberService, getLimitTicketService, createReportService, getAllReportService,
    deleteRatingService, deleteReportService, getStateMovieService, getComingSoonService
    // getNationService, getDirectorService, getCastService
}