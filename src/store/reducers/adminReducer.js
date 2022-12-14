import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGenre: false,
    genres: [],
    movies: [],
    // all_movies: [],
    nowShowing: [],
    province: [],
    theater: [],
    cinemaRoom: [],
    allShowtime: [],
    movieFormat: [],
    movieFormatById: [],
    theaterById: [],
    eventData: [],
    foodData: [],
    reportData: [],
    isLoggedInAdmin: false,
    adminInfo: null
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENRE_START:
            let copyState = { ...state };
            copyState.isLoadingGenre = true;
            return {
                ...copyState
            }

        case actionTypes.FETCH_GENRE_SUCCESS:
            state.genres = action.data;
            state.isLoadingGenre = false;
            return {
                ...state
            }

        case actionTypes.FETCH_GENRE_FAILED:
            state.isLoadingGenre = false;
            state.genres = [];
            return {
                ...state
            }
        // case actionTypes.FETCH_MOVIE_SUCCESS:
        //     state.movies = action.data;
        //     console.log('check movies success: ', state)
        //     return {
        //         ...state
        //     }

        // case actionTypes.FETCH_MOVIE_FAILED:
        //     state.movies = [];
        //     return {
        //         ...state
        //     }


        case actionTypes.FETCH_ALL_MOVIE_SUCCESS:
            state.movies = action.movies;
            // console.log('check director success: ', state)
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_MOVIE_FAILED:
            state.movies = [];
            return {
                ...state
            }

        case actionTypes.FETCH_REPORT_SUCCESS:
            state.reportData = action.data;
            // console.log('check director success: ', state)
            return {
                ...state
            }

        case actionTypes.FETCH_REPORT_FAILED:
            state.reportData = [];
            return {
                ...state
            }


        case actionTypes.FETCH_NOW_SHOWING_SUCCESS:
            state.nowShowing = action.dataNowShowing;
            // console.log('check nation success: ', state)
            return {
                ...state
            }

        case actionTypes.FETCH_NOW_SHOWING_FAILED:
            state.nowShowing = [];
            return {
                ...state
            }

        case actionTypes.FETCH_EVENT_SUCCESS:
            state.eventData = action.dataEvent;
            // console.log('check nation success: ', state)
            return {
                ...state
            }

        case actionTypes.FETCH_EVENT_FAILED:
            state.eventData = [];
            return {
                ...state
            }

        case actionTypes.FETCH_FOOD_SUCCESS:
            state.foodData = action.dataFood;
            // console.log('check nation success: ', state)
            return {
                ...state
            }

        case actionTypes.FETCH_FOOD_FAILED:
            state.foodData = [];
            return {
                ...state
            }

        case actionTypes.FETCH_PROVINCE_SUCCESS:
            state.province = action.data;
            // console.log('check nation success: ', state)
            return {
                ...state
            }

        case actionTypes.FETCH_PROVINCE_FAILED:
            state.province = [];
            return {
                ...state
            }

        case actionTypes.FETCH_THEATER_SUCCESS:
            state.theater = action.data;
            // console.log('check nation success: ', state)
            return {
                ...state
            }

        case actionTypes.FETCH_THEATER_FAILED:
            state.theater = [];
            return {
                ...state
            }

        case actionTypes.FETCH_CINEMA_ROOM_SUCCESS:
            state.cinemaRoom = action.data;
            // console.log('check nation success: ', state)
            return {
                ...state
            }

        case actionTypes.FETCH_CINEMA_ROOM_FAILED:
            state.cinemaRoom = [];
            return {
                ...state
            }

        case actionTypes.FETCH_SHOWTIME_SUCCESS:
            state.allShowtime = action.data;
            // console.log('check nation success: ', state)
            return {
                ...state
            }

        case actionTypes.FETCH_SHOWTIME_FAILED:
            state.allShowtime = [];
            return {
                ...state
            }

        case actionTypes.FETCH_MOVIE_FORMAT_SUCCESS:
            state.movieFormat = action.data;
            // console.log('check nation success: ', state)
            return {
                ...state
            }

        case actionTypes.FETCH_MOVIE_FORMAT_FAILED:
            state.movieFormat = [];
            return {
                ...state
            }

        case actionTypes.FETCH_MOVIE_FORMAT_BY_ID_SUCCESS:
            state.movieFormatById = action.data;
            // console.log('check nation success: ', state)
            return {
                ...state
            }

        case actionTypes.FETCH_MOVIE_FORMAT_BY_ID_FAILED:
            state.movieFormatById = [];
            return {
                ...state
            }

        case actionTypes.FETCH_THEATER_BY_ID_SUCCESS:
            state.theaterById = action.data;
            // console.log('check nation success: ', state)
            return {
                ...state
            }

        case actionTypes.FETCH_THEATER_BY_ID_FAILED:
            state.theaterById = [];
            return {
                ...state
            }

        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedInAdmin: true,
                adminInfo: action.adminInfo
            }
        case actionTypes.ADMIN_LOGIN_FAIL:
            return {
                ...state,
                isLoggedInAdmin: false,
                adminInfo: null
            }
        case actionTypes.ADMIN_PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedInAdmin: false,
                adminInfo: null
            }



        default:
            return state;
    }
}



export default adminReducer;
