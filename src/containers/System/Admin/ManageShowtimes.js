import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageShowtimes.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import _ from 'lodash';
import { dateFormat } from '../../../utils';
import { createShowtimeService, getTheaterService, getCinemaRoomService } from '../../../services/userServices'
import { toast } from 'react-toastify';



class ManageShowtimes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProvince: [],
            selectedProvince: {},
            selectedTheater: {},
            selectedCinemaRoom: {},
            listTheater: [],
            listCinemaRoom: [],
            listMovie: [],
            selectedMovie: {},
            listMovieFormat: [],
            selectedMovieFormat: {},
            currentDate: '',
            showtime: []
        }
    }

    componentDidMount() {
        let { selectedProvince } = this.state;

        this.props.fetchAllProvince();
        // this.props.fetchAllTheater(selectedProvince.value);
        // this.props.fetchAllCinemaRoom();
        this.props.fetchAllShowtime();
        this.props.fetchMovieRedux();
        this.props.fetchAllMovieFormat();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allProvince !== this.props.allProvince) {
            let dataSelect = this.buildDataInputSelectProvince(this.props.allProvince);
            this.setState({
                listProvince: dataSelect
            })
        }

        // if (this.state.allTheater) {
        //     let dataSelect = this.buildDataInputSelectTheater(this.state.allTheater);
        //     this.setState({
        //         listTheater: dataSelect
        //     })
        // }

        // if (prevProps.allCinemaRoom !== this.props.allCinemaRoom) {
        //     let dataSelect = this.buildDataInputSelectCinemaRoom(this.props.allCinemaRoom);
        //     this.setState({
        //         listCinemaRoom: dataSelect
        //     })
        // }

        if (prevProps.allMovie !== this.props.allMovie) {
            let dataSelect = this.buildDataInputSelectMovie(this.props.allMovie);
            this.setState({
                listMovie: dataSelect
            })
        }

        if (prevProps.allMovieFormat !== this.props.allMovieFormat) {
            let dataSelect = this.buildDataInputSelectMovieFormat(this.props.allMovieFormat);
            this.setState({
                listMovieFormat: dataSelect
            })
        }

        if (prevProps.allShowtime !== this.props.allShowtime) {
            let data = this.props.allShowtime;
            if (data && data.length > 0) {
                // data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // })

                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                showtime: data
            })
        }
    }

    buildDataInputSelectProvince = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                // let labelProvince = `${item.ten_tinh}`;
                // object.label = labelProvince;
                object.label = `${item.ten_tinh}`;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    buildDataInputSelectMovieFormat = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                // let labelProvince = `${item.ten_tinh}`;
                // object.label = labelProvince;
                object.label = `${item.ten_ddc}`;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    buildDataInputSelectMovie = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                // let labelProvince = `${item.ten_tinh}`;
                // object.label = labelProvince;
                object.label = `${item.ten_phim}`;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    buildDataInputSelectTheater = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                // let labelProvince = `${item.ten_tinh}`;
                // object.label = labelProvince;
                object.label = `${item.ten_rap}`;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    buildDataInputSelectCinemaRoom = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                // let labelProvince = `${item.ten_tinh}`;
                // object.label = labelProvince;
                object.label = `${item.so_phong}`;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    handleChangeSelectProvince = async (selectedOption) => {
        this.setState({
            selectedProvince: selectedOption
        })
        let tinh_tpId = selectedOption.value;
        console.log('check province', tinh_tpId)
        let res = await getTheaterService(tinh_tpId);
        if (res && res.errCode === 0) {
            this.setState({
                allTheater: res.data ? res.data : [],

            })
        }
        console.log('check theater', res.data)
        let theaterData = res.data;
        console.log('check theaterData', theaterData)

        let dataSelect = this.buildDataInputSelectTheater(theaterData);
        this.setState({
            listTheater: dataSelect
        })

    }

    handleChangeSelectMovie = async (selectedOption) => {
        this.setState({
            selectedMovie: selectedOption
        })
    }

    handleChangeSelectMovieFormat = async (selectedOption) => {
        this.setState({
            selectedMovieFormat: selectedOption
        })
    }

    handleChangeSelectTheater = async (selectedOption) => {
        this.setState({
            selectedTheater: selectedOption
        })
        let rapId = selectedOption.value;
        console.log('check theater', rapId)
        let res = await getCinemaRoomService(rapId);
        if (res && res.errCode === 0) {
            this.setState({
                allCinemaroom: res.data ? res.data : [],

            })
        }
        console.log('check theater', res.data)
        let cinemaRoomData = res.data;
        console.log('check theaterData', cinemaRoomData)

        let dataSelect = this.buildDataInputSelectCinemaRoom(cinemaRoomData);
        this.setState({
            listCinemaRoom: dataSelect
        })
    }

    handleChangeSelectCinemaRoom = async (selectedOption) => {
        this.setState({
            selectedCinemaRoom: selectedOption
        })
    }



    handleOnChangeDataPicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnShowtime = (show_time) => {
        let { showtime } = this.state;
        if (showtime && showtime.length > 0) {
            showtime = showtime.map(item => {
                if (item.id === show_time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                showtime: showtime
            })
        }
    }

    handleSaveShowtime = async () => {
        let { showtime, selectedMovieFormat, selectedProvince, selectedTheater, selectedCinemaRoom, currentDate, selectedMovie } = this.state;
        let result = [];
        if (!currentDate) {
            alert('Ch??a nh???p v??o ng??y!');
            return;
        }
        if (selectedProvince && _.isEmpty(selectedProvince)) {
            alert('Ch??a ch???n t???nh/tp!');
            return;
        }
        if (selectedMovieFormat && _.isEmpty(selectedMovieFormat)) {
            alert('Ch??a ch???n ?????nh d???ng chi???u!');
            return;
        }
        if (selectedMovie && _.isEmpty(selectedMovie)) {
            alert('Ch??a ch???n phim!');
            return;
        }
        if (selectedTheater && _.isEmpty(selectedTheater)) {
            alert('Ch??a ch???n t??n r???p!');
            return;
        }
        if (selectedCinemaRoom && _.isEmpty(selectedCinemaRoom)) {
            alert('Ch??a ch???n ph??ng chi???u!');
            return;
        }

        let formatedDate = new Date(currentDate).getTime();
        if (showtime && showtime.length > 0) {
            let selectedShowtime = showtime.filter(item => item.isSelected === true);
            if (selectedShowtime && selectedShowtime.length > 0) {
                selectedShowtime.map(item => {
                    let object = {};
                    object.provinceId = selectedProvince.value;
                    object.theaterId = selectedTheater.value;
                    object.cinemaRoomId = selectedCinemaRoom.value;
                    object.movieFormatId = selectedMovieFormat.value;
                    object.movieId = selectedMovie.value;
                    object.showTime = item.suat;
                    object.date = formatedDate;

                    result.push(object);
                })
            } else {
                toast.warn('Ch??a ch???n su???t chi???u!');
                return;
            }
            let res = await createShowtimeService({
                arrShowtime: result,
                provinceId: selectedProvince.value,
                movieId: selectedMovie.value,
                formatedDate: formatedDate
            });
            if (res.errCode === 0) {
                toast.success("Th??m su???t chi???u th??nh c??ng")
            }
            else {
                toast.warn("Th??m su???t chi???u th???t b???i!")
            }
            console.log('check res: ', res);
            console.log('check result: ', result);
        }
    }


    render() {
        // console.log('danh sach tinh/tp', this.props.allProvince);
        console.log('danh sach rap', this.state.listTheater);
        // console.log('danh sach phong chieu', this.props.allCinemaRoom);

        let { showtime } = this.state;
        console.log('check showtime', showtime);
        return (
            <div className='manage-showtimes-container'>
                <div className='manage-showtimes-title'>
                    <span>Qu???n l?? su???t chi???u</span>
                </div>
                <div className='container'>
                    <div className='row'>

                        <div className='col-6 form-group'>
                            <label>Ch???n T???nh/TP:</label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelectProvince}
                                options={this.state.listProvince}
                            />
                        </div>
                        <div className='col-6 pickdate'>
                            <label>Ch???n ng??y:</label>
                            <DatePicker
                                onChange={this.handleOnChangeDataPicker}
                                className='form-control'
                                value={this.state.currentDate[0]}
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Ch???n R???p:</label>
                            <Select
                                value={this.state.selectedTheater}
                                onChange={this.handleChangeSelectTheater}
                                options={this.state.listTheater}
                            />
                        </div>
                        <div className='col-6'>
                            <label>Ch???n Ph??ng:</label>
                            <Select
                                value={this.state.selectedCinemaRoom}
                                onChange={this.handleChangeSelectCinemaRoom}
                                options={this.state.listCinemaRoom}
                            />
                        </div>
                        {/* <div className='col-6'>
                            <label>Ch???n ng??y:</label>
                            <DatePicker
                                onChange={this.handleOnChangeDataPicker}
                                className='form-control'
                                value={this.state.currentDate[0]}
                                minDate={new Date()}
                            />
                        </div> */}
                        <div className='col-6'>
                            <label>Ch???n Phim:</label>
                            <Select
                                value={this.state.selectedMovie}
                                onChange={this.handleChangeSelectMovie}
                                options={this.state.listMovie}
                            />
                        </div>
                        <div className='col-6'>
                            <label>Ch???n ?????nh d???ng chi???u:</label>
                            <Select
                                value={this.state.selectedMovieFormat}
                                onChange={this.handleChangeSelectMovieFormat}
                                options={this.state.listMovieFormat}
                            />
                        </div>
                        <div className='col-12 pick-showtimes-container'>
                            {showtime && showtime.length > 0 &&
                                showtime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? 'btn btn-showtime active' : 'btn btn-showtime'}
                                            key={index}
                                            onClick={() => this.handleClickBtnShowtime(item)}
                                        >{item.suat}</button>
                                    )
                                })
                            }
                        </div>
                        <button className='col-4 btn btn-primary btn-save-showtime'
                            onClick={() => this.handleSaveShowtime()}
                        >L??u su???t chi???u</button>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.admin.language,
        allProvince: state.admin.province,
        // allTheater: state.admin.theater,
        // allCinemaRoom: state.admin.cinemaRoom,
        allShowtime: state.admin.allShowtime,
        allMovie: state.admin.movies,
        allMovieFormat: state.admin.movieFormat
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProvince: () => dispatch(actions.fetchProvinceStart()),
        // fetchAllTheater: (inputId) => dispatch(actions.fetchTheaterStart(inputId)),
        // fetchAllCinemaRoom: () => dispatch(actions.fetchCinemaRoomStart()),
        fetchAllShowtime: () => dispatch(actions.fetchShowtimeStart()),
        fetchMovieRedux: () => dispatch(actions.fetchAllMovieStart()),
        fetchAllMovieFormat: () => dispatch(actions.fetchMovieFormatStart()),



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageShowtimes);