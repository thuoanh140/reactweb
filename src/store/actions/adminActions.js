import actionTypes from './actionTypes';
import {getAllReportService, getGenreService, createNewMovieService, getNowShowingService, getAllMovie, getCinemaRoomService, getProvinceService, getTheaterService, getShowtimeService, getMovieFormatService, getTheaterByIdService, getMovieFormatByIdService, createNewEventService, createNewFoodService, getEventService, createNewTicketService, createNewDetailTicketService, getFoodService, createNewBillFoodService } from '../../services/userServices';

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

export const fetchReportStart = () => {
    return async (dispatch, getState) => {
        try {
            
            let res = await getAllReportService();
            if (res && res.errCode === 0) {
                // console.log('check get state', getState)
                dispatch(fetchReportSuccess(res.data))
            } else {
                dispatch(fetchReportFailed());
            }
        } catch (e) {
            dispatch(fetchReportFailed());
            console.log('fetch Report start error', e);
        }
    }
}

export const fetchMovieFormatStart = () => {
    return async (dispatch, getState) => {
        try {
            
            let res = await getMovieFormatService();
            if (res && res.errCode === 0) {
                // console.log('check get state', getState)
                dispatch(fetchMovieFormatSuccess(res.data.reverse()))
            } else {
                dispatch(fetchMovieFormatFailed());
            }
        } catch (e) {
            dispatch(fetchMovieFormatFailed());
            console.log('fetch MovieFormat start error', e);
        }
    }
}

export const fetchMovieFormatByIdStart = () => {
    return async (dispatch, getState) => {
        try {
            
            let res = await getMovieFormatByIdService();
            if (res && res.errCode === 0) {
                // console.log('check get state', getState)
                dispatch(fetchMovieFormatByIdSuccess(res.data.reverse()))
            } else {
                dispatch(fetchMovieFormatByIdFailed());
            }
        } catch (e) {
            dispatch(fetchMovieFormatByIdFailed());
            console.log('fetch MovieFormat start error', e);
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

export const fetchTheaterByIdStart = (inputId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getTheaterByIdService(inputId);
            if (res && res.errCode === 0) {
                // console.log('check get state', getState)
                dispatch(fetchTheaterByIdSuccess(res.data.reverse()))
            } else {
                dispatch(fetchTheaterByIdFailed());
            }
        } catch (e) {
            dispatch(fetchTheaterByIdFailed());
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

export const fetchShowtimeStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getShowtimeService();
            if (res && res.errCode === 0) {
                // console.log('check get state', getState)
                dispatch(fetchShowtimeSuccess(res.data))
            } else {
                dispatch(fetchShowtimeFailed());
            }
        } catch (e) {
            dispatch(fetchShowtimeFailed());
            console.log('fetch Theater start error', e);
        }
    }
}

export const fetchProvinceSuccess = (provinceData) => ({
    type: actionTypes.FETCH_PROVINCE_SUCCESS,
    data: provinceData
})
export const fetchReportSuccess = (reportData) => ({
    type: actionTypes.FETCH_REPORT_SUCCESS,
    data: reportData
})

export const fetchMovieFormatSuccess = (movieFormatData) => ({
    type: actionTypes.FETCH_MOVIE_FORMAT_SUCCESS,
    data: movieFormatData
})

export const fetchMovieFormatByIdSuccess = (movieFormatData) => ({
    type: actionTypes.FETCH_MOVIE_FORMAT_BY_ID_SUCCESS,
    data: movieFormatData
})

export const fetchShowtimeSuccess = (showtimeData) => ({
    type: actionTypes.FETCH_SHOWTIME_SUCCESS,
    data: showtimeData
})

export const fetchTheaterSuccess = (theaterData) => ({
    type: actionTypes.FETCH_THEATER_SUCCESS,
    data: theaterData
})

export const fetchTheaterByIdSuccess = (theaterData) => ({
    type: actionTypes.FETCH_THEATER_BY_ID_SUCCESS,
    data: theaterData
})

export const fetchCinemaRoomSuccess = (cinemaRoomData) => ({
    type: actionTypes.FETCH_CINEMA_ROOM_SUCCESS,
    data: cinemaRoomData
})

export const fetchProvinceFailed = () => ({
    type: actionTypes.FETCH_PROVINCE_FAILED
})

export const fetchReportFailed = () => ({
    type: actionTypes.FETCH_REPORT_FAILED
})

export const fetchMovieFormatFailed = () => ({
    type: actionTypes.FETCH_MOVIE_FORMAT_FAILED
})

export const fetchMovieFormatByIdFailed = () => ({
    type: actionTypes.FETCH_MOVIE_FORMAT_BY_ID_FAILED
})

export const fetchShowtimeFailed = () => ({
    type: actionTypes.FETCH_SHOWTIME_FAILED
})

export const fetchTheaterFailed = () => ({
    type: actionTypes.FETCH_THEATER_FAILED
})

export const fetchTheaterByIdFailed = () => ({
    type: actionTypes.FETCH_THEATER_BY_ID_FAILED
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

export const createNewFood = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewFoodService(data);
            console.log('check create food redux', res)
            if (res && res.errCode === 0) {
                dispatch(createFoodSuccess(res.data))
            } else {
                dispatch(createFoodFailed());
            }
        } catch (e) {
            dispatch(createFoodFailed());
            console.log('fetch food start error', e);
        }
    }
}

export const createMovieSuccess = () => ({
    type: 'CREATE_MOVIE_SUCCESS'
})

export const createFoodSuccess = () => ({
    type: 'CREATE_FOOD_SUCCESS'
})

export const createMovieFailed = () => ({
    type: 'CREATE_MOVIE_FAILED'
})

export const createFoodFailed = () => ({
    type: 'CREATE_FOOD_FAILED'
})

export const createNewEvent = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewEventService(data);
            console.log('check create event redux', res)
            if (res && res.errCode === 0) {
                // console.log('check get state', getState)
                dispatch(createEventSuccess(res.data))
            } else {
                dispatch(createEventFailed());
            }
        } catch (e) {
            dispatch(createEventFailed());
            console.log('fetch Event start error', e);
        }
    }
}

export const createNewTicket = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewTicketService(data);
            console.log('check create Ticket redux', res)
            if (res && res.errCode === 0) {
                // console.log('check get state', getState)
                dispatch(createTicketSuccess(res.data))
            } else {
                dispatch(createTicketFailed());
            }
        } catch (e) {
            dispatch(createTicketFailed());
            console.log('fetch Ticket start error', e);
        }
    }
}

export const createNewBillFood = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewBillFoodService(data);
            console.log('check create bill food redux', res)
            if (res && res.errCode === 0) {
                // console.log('check get state', getState)
                dispatch(createBillFoodSuccess(res.data))
            } else {
                dispatch(createBillFoodFailed());
            }
        } catch (e) {
            dispatch(createBillFoodFailed());
            console.log('fetch BillFood start error', e);
        }
    }
}

export const createNewDetailTicket = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewDetailTicketService(data);
            console.log('check createNewDetailTicketService redux', res)
            if (res && res.errCode === 0) {
                // console.log('check get state', getState)
                dispatch(createDetailTicketSuccess(res.data))
            } else {
                dispatch(createDetailTicketFailed());
            }
        } catch (e) {
            dispatch(createDetailTicketFailed());
            console.log('fetch Detail Ticket start error', e);
        }
    }
}

export const createEventSuccess = () => ({
    type: 'CREATE_EVENT_SUCCESS'
})

export const createTicketSuccess = () => ({
    type: 'CREATE_TICKET_SUCCESS'
})

export const createBillFoodSuccess = () => ({
    type: 'CREATE_BILL_FOOD_SUCCESS'
})

export const createDetailTicketSuccess = () => ({
    type: 'CREATE_DETAIL_TICKET_SUCCESS'
})

export const createEventFailed = () => ({
    type: 'CREATE_EVENT_FAILED'
})

export const createTicketFailed = () => ({
    type: 'CREATE_TICKET_FAILED'
})

export const createBillFoodFailed = () => ({
    type: 'CREATE_BILL_FOOD_FAILED'
})

export const createDetailTicketFailed = () => ({
    type: 'CREATE_DETAIL_TICKET_FAILED'
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

export const fetchFood = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getFoodService();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_FOOD_SUCCESS,
                    dataFood: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_FOOD_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_FOOD_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_FOOD_FAILED
            })
        }
    }
}

export const fetchEvent = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getEventService();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_EVENT_SUCCESS,
                    dataEvent: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_EVENT_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_EVENT FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_EVENT_FAILED
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