import React, { Component } from 'react';
import { connect } from "react-redux";
import './Showtime.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import { getShowtimeByDate } from '../../../services/userServices';
import { LANGUAGES } from '../../../utils';
import { withRouter } from "react-router";
import Seat from './Seat';


class Showtime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            listProvince: [],
            selectedProvince: {},
            allAvaiableTime: [],
            selectedShowtime: {},
            showtimeClick: {},
            // isLoggedIn: false

        }
    }

    async componentDidMount() {
        let { language } = this.props;
        this.setArrDays(language);

        // let allDays = this.setArrDays(language);
        // this.setState({
        //     allDays: allDays,
        // })

        this.props.fetchAllProvince();

    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setArrDays = async (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (this.props.language === LANGUAGES.VI) {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi)
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd -  DD/MM');
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);

        }
        this.setState({
            allDays: allDays,
        })


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allProvince !== this.props.allProvince) {
            let dataSelect = this.buildDataInputSelectProvince(this.props.allProvince);
            this.setState({
                listProvince: dataSelect
            })
        }


        if (prevProps.language !== this.props.language) {
            this.setArrDays(this.props.language)
            // let allDays = this.setArrDays(this.props.language)
            // this.setState({
            //     allDays: allDays
            // })
        }

        // let res = await getShowtimeByDate(30, 1, 07 / 10 / 2022);
        // console.log('check res', res)
    }


    handleChangeSelectProvince = async (selectedOption) => {
        this.setState({
            selectedProvince: selectedOption
        })
    }

    handleChangeSelectShowtime = async (selectedOption) => {
        this.setState({
            selectedShowtime: selectedOption
        })
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



    handleOnChangeSelect = async (event) => {
        if (this.props.showtimeIdFromParent && this.props.showtimeIdFromParent !== -1) {
            let movieId = this.props.showtimeIdFromParent;
            let date = event.target.value;
            let { selectedProvince } = this.state;
            let provinceId = selectedProvince.value;


            let res = await getShowtimeByDate(movieId, provinceId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvaiableTime: res.data ? res.data : [],

                })

            }
            console.log('check function: ', res);
        }
    }

    handleViewSeat = (showtime) => {

        this.setState({
            showtimeClick: showtime
        })
        console.log('check call seat', showtime);

    }

    handleBookingSeat = () => {
        let showtimeData = this.state;
        // const { isLoggedIn } = this.state;
        this.props.history.push({
            pathname: this.props.isLoggedIn ? "/booking-seat" : "/login-membership",
            // pathname: "/booking-seat",
            state: { showtimeData }
        });

        // console.log("check isLoggedIn: ", isLoggedIn)
        console.log("check showtimeData: ", showtimeData)
    }




    render() {
        let { allDays, allAvaiableTime, showtimeClick, selectedShowtime } = this.state;
        console.log('check selectedShowtime', selectedShowtime)
        return (
            <>
                <div className='movie-showtime-container'>
                    <div className='all-showtime'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>Chọn Tỉnh/TP:</label>
                                    <Select
                                        value={this.state.selectedProvince}
                                        onChange={this.handleChangeSelectProvince}
                                        options={this.state.listProvince}
                                    />
                                </div>
                                <div className='col-6 pickdate'>
                                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                                        {allDays && allDays.length > 0 &&
                                            allDays.map((item, index) => {
                                                return (
                                                    <option value={item.value} key={index}>{item.label}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='all-avaiable-showtime'>
                                    <div className='text-calendar'>
                                        <i className='fas fa-calendar-alt'> <span>Lịch chiếu</span></i>
                                        <hr />
                                    </div>
                                    <div className='theater-name'>
                                        {allAvaiableTime && allAvaiableTime.length > 0 &&
                                            allAvaiableTime.slice(0, 1).map((item, index) => {
                                                return (
                                                    <span >{item.theaterData.ten_rap}</span>
                                                )
                                            })
                                        }
                                    </div>
                                    <hr />
                                    <div className='movieFormat-name'>
                                        {allAvaiableTime && allAvaiableTime.length > 0 &&
                                            allAvaiableTime.slice(0, 1).map((item, index) => {

                                                return (
                                                    <span key={index}>Rạp {item.movieFormatData.ten_ddc}</span>
                                                )

                                            })
                                        }
                                    </div>

                                    <hr />
                                    <div className='time-content'>

                                        {allAvaiableTime && allAvaiableTime.length > 0 ?

                                            <>
                                                <div className='time-content-btns' >
                                                    {allAvaiableTime.map((item, index) => {
                                                        return (
                                                            <button key={index}
                                                            className={item.id === showtimeClick.id && 'time-content-btns--active'}
                                                                // onChange={(item) => this.handleChangeSelectShowtime(item)}
                                                                onClick={() => this.handleViewSeat(item)}>{item.showTime}</button>
                                                        )
                                                    })}
                                                </div>

                                                <div className='booking-showtime'>
                                                    <button
                                                        onClick={() => this.handleBookingSeat()}
                                                        disabled={!this.state.showtimeClick?.id}
                                                    ><i className='far fa-hand-point-up'></i>Đặt vé</button>
                                                </div>



                                            </>
                                            :
                                            <div className='not-showtime'>Không có suất chiếu trong thời gian này, vui lòng chọn ngày khác!</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* <Seat showtime={showtime} /> */}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        allProvince: state.admin.province,
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProvince: () => dispatch(actions.fetchProvinceStart()),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Showtime));
