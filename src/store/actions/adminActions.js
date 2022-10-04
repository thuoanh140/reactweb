import actionTypes from './actionTypes';
import { getGenreService, createNewMovieService, getNowShowingService, getAllMovie, getCinemaRoomService, getProvinceService, getTheaterService } from '../../services/userServices';

export const fetchGenreStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENRE_START })
            let res = await getGenreService();
            if (res && res.errCode === 0) {
                // console.log('check get state', getState)
                dispatch(fetchGenreSuccess(res.data))
            } else {
                dispatch(fetchGenreFailed());
            }
        } catch (e) {
            dispatch(fetchGenreFailed());
            console.log('fetch genre start error', e);
        }
    }
}

export const fetchProvinceStart = () => {
    return async (dispatch, getState) => {
        try {
            
            let res = await getProvinceService();
            if (res && res.errCode === 0) {
                // console.log('check get state', getState)
                dispatch(fetchProvinceSuccess(res.data.reverse()))
            } else {
                dispatch(fetchProvinceFailed());
            }
        } catch (e) {
            dispatch(fetchProvinceFailed());
            console.log('fetch Province start error', e);
        }
    }
}

export const fetchTheaterStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTheaterService();
            if (res && res.errCode === 0) {
                // console.log('check get state', getState)
                dispatch(fetchTheaterSuccess(res.data.reverse()))
            } else {
                dispatch(fetchTheaterFailed());
            }
        } catch (e) {
            dispatch(fetchTheaterFailed());
            console.log('fetch Theater start error', e);
        }
    }
}

export const fetchCinemaRoomStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getCinemaRoomService();
            if (res && res.errCode === 0) {
                // console.log('check get state', getState)
                dispatch(fetchCinemaRoomSuccess(res.data.reverse()))
            } else {
                dispatch(fetchCinemaRoomFailed());
            }
        } catch (e) {
            dispatch(fetchCinemaRoomFailed());
            console.log('fetch Cinema Room start error', e);
        }
    }
}

export const fetchProvinceSuccess = (provinceData) => ({
    type: actionTypes.FETCH_PROVINCE_SUCCESS,
    data: provinceData
})

export const fetchTheaterSuccess = (theaterData) => ({
    type: actionTypes.FETCH_THEATER_SUCCESS,
    data: theaterData
})

export const fetchCinemaRoomSuccess = (cinemaRoomData) => ({
    type: actionTypes.FETCH_CINEMA_ROOM_SUCCESS,
    data: cinemaRoomData
})

export const fetchProvinceFailed = () => ({
    type: actionTypes.FETCH_PROVINCE_FAILED
})

export const fetchTheaterFailed = () => ({
    type: actionTypes.FETCH_THEATER_FAILED
})

export const fetchCinemaRoomFailed = () => ({
    type: actionTypes.FETCH_CINEMA_ROOM_FAILED
})

export const fetchGenreSuccess = (genreData) => ({
    type: actionTypes.FETCH_GENRE_SUCCESS,
    data: genreData
})

export const fetchGenreFailed = () => ({
    type: actionTypes.FETCH_GENRE_FAILED
})


// export const fetchMovieSuccess = (movieData) => ({
//     type: actionTypes.FETCH_MOVIE_SUCCESS,
//     data: movieData
// })

// export const fetchMovieFailed = () => ({
//     type: actionTypes.FETCH_MOVIE_FAILED
// })

// export const fetchMovieStart = () => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await getAllMovieService("ALL");
//             let res1 = await getNowShowingService('');
//             console.log('check get now showing: ', res1)
//             if (res && res.errCode === 0) {
//                 // console.log('check get state', getState)
//                 dispatch(fetchMovieSuccess(res.data))
//             } else {
//                 dispatch(fetchMovieFailed());
//             }
//         } catch (e) {
//             dispatch(fetchMovieFailed());
//             console.log('fetch Movie start error', e);
//         }
//     }
// }

export const fetchAllMovieStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllMovie("ALL");
            // let res1 = await getNowShowingService('');
            // console.log('check get now showing: ', res1)
            if (res && res.errCode === 0) {
                // console.log('check get state', getState)
                dispatch(fetchAllMovieSuccess(res.movies.reverse()))
            } else {
                dispatch(fetchAllMovieFailed());
            }
        } catch (e) {
            dispatch(fetchAllMovieFailed());
            console.log('fetch All Movie start error', e);
        }
    }
}

export const fetchAllMovieSuccess = (data) => ({
    type: 'FETCH_ALL_MOVIE_SUCCESS',
    movies: data
})

export const fetchAllMovieFailed = () => ({
    type: 'FETCH_ALL_MOVIE_FAILED',
})

// export const fetchDirectorStart = () => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await getDirectorService();
//             if (res && res.errCode === 0) {
//                 // console.log('check get state', getState)
//                 dispatch(fetchDirectorSuccess(res.data))
//             } else {
//                 dispatch(fetchDirectorFailed());
//             }
//         } catch (e) {
//             dispatch(fetchDirectorFailed());
//             console.log('fetch director start error', e);
//         }
//     }
// }

// export const fetchCastStart = () => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await getCastService();
//             if (res && res.errCode === 0) {
//                 // console.log('check get state', getState)
//                 dispatch(fetchCastSuccess(res.data))
//             } else {
//                 dispatch(fetchCastFailed());
//             }
//         } catch (e) {
//             dispatch(fetchCastFailed());
//             console.log('fetch cast start error', e);
//         }
//     }
// }

// export const fetchDirectorSuccess = (directorData) => ({
//     type: actionTypes.FETCH_DIRECTOR_SUCCESS,
//     data: directorData
// })

// export const fetchDirectorFailed = () => ({
//     type: actionTypes.FETCH_DIRECTOR_FAILED
// })

// export const fetchCastSuccess = (castData) => ({
//     type: actionTypes.FETCH_CAST_SUCCESS,
//     data: castData
// })

// export const fetchCastFailed = () => ({
//     type: actionTypes.FETCH_CAST_FAILED
// })

export const createNewMovie = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewMovieService(data);
            console.log('check create movie redux', res)
            if (res && res.errCode === 0) {
                // console.log('check get state', getState)
                dispatch(createMovieSuccess(res.data))
            } else {
                dispatch(createMovieFailed());
            }
        } catch (e) {
            dispatch(createMovieFailed());
            console.log('fetch movie start error', e);
        }
    }
}

export const createMovieSuccess = () => ({
    type: 'CREATE_MOVIE_SUCCESS'
})

export const createMovieFailed = () => ({
    type: 'CREATE_MOVIE_FAILED'
})

export const fetchNowShowing = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getNowShowingService();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_NOW_SHOWING_SUCCESS,
                    dataNowShowing: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_NOW_SHOWING_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_NOW_SHOWING_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_NOW_SHOWING_FAILED
            })
        }
    }
}

// export const fetchNowShowingSuccess = (nowShowingData) => ({
//         type: actionTypes.FETCH_NOW_SHOWING_SUCCESS,
//         data: dataNowShowing
//     })
    
//     export const fetchCastFailed = () => ({
//         type: actionTypes.FETCH_NOW_SHOWING_FAILED
//     })