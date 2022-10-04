import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGenre: false,
    genres: [],
    movies: [],
    // all_movies: [],
    nowShowing: [],
    province: [],
    theater: [],
    cinemaRoom: []
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



        default:
            return state;
    }
}



export default adminReducer;
