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

const deleteStaffService = (staffId) => {
    return axios.delete('/api/delete-staff', {
        data: {
            id: staffId
        }
    });
}

const editStaffService = (inputData) => {
    return axios.put('/api/edit-staff', inputData)
}

const getGenreService = (inputId) => {
    return axios.get(`/api/get-genre?id=${inputId}`)
}

const getProvinceService = (inputId) => {
    return axios.get(`/api/get-province?id=${inputId}`)
}

const getTheaterService = (inputId) => {
    return axios.get(`/api/get-theater?id=${inputId}`)
}

const getCinemaRoomService = (inputId) => {
    return axios.get(`/api/get-cinema-room?id=${inputId}`)
}

const getNowShowingService = (inputId) => {
    return axios.get(`/api/get-now-showing?id=${inputId}`)
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

// const getCastService = (inputId) => {
//     return axios.get(`/api/get-cast?id=${inputId}`)
// }

export {
    handleLoginApi, getAllStaff, createNewStaffService,
    deleteStaffService, editStaffService, getGenreService,
    createNewMovieService, getNowShowingService, getAllMovie,
    getMovieNowShowingById, getProvinceService, getTheaterService,
    getCinemaRoomService
    // getNationService, getDirectorService, getCastService
}