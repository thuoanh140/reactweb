import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './Seat.scss'
import Showtime from './Showtime';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { getSeatByCinemaRoomIdService, getSeatByCinemaRoomIdVIPService, getMovieByIdService } from '../../../services/userServices';
import HomeFooter from '../../HomePage/HomeFooter';

class Seat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allSeat: [],
            allSeatVIP: [],
            seat: [],
            movieName: [],
            // showtimeClick: {}

        }
    }

    async componentDidMount() {

        console.log('checkkkk:', this.props);
        // let cinemaRoomId = this.props.location.state.cinemaRoomId;
        // let res = await getSeatByCinemaRoomIdService(cinemaRoomId);
        // if (res && res.errCode === 0) {
        //     this.setState({
        //         allSeat: res.data ? res.data : [],
        //     })
        // }
        // console.log('check allseat: ', res)

        if (this.props.location && this.props.location.state && this.props.location.state.showtimeData && this.props.location.state.showtimeData.showtimeClick && this.props.location.state.showtimeData.showtimeClick.movieId) {
            let movieId = this.props.location.state.showtimeData.showtimeClick.movieId;
            let respon = await getMovieByIdService(movieId);
            if (respon && respon.errCode === 0) {
                this.setState({
                    movieName: respon.data ? respon.data : [],

                })
            }
            console.log('check movieName: ', respon)
        }




        if (this.props.location && this.props.location.state && this.props.location.state.showtimeData && this.props.location.state.showtimeData.showtimeClick && this.props.location.state.showtimeData.showtimeClick.cinemaRoomId) {
            let cinemaRoomId = this.props.location.state.showtimeData.showtimeClick.cinemaRoomId;
            let response = await getSeatByCinemaRoomIdService(cinemaRoomId);
            if (response && response.errCode === 0) {
                this.setState({
                    allSeat: response.data ? response.data : [],

                })
            }
            console.log('check allseat: ', response)
        }


        if (this.props.location && this.props.location.state && this.props.location.state.showtimeData && this.props.location.state.showtimeData.showtimeClick && this.props.location.state.showtimeData.showtimeClick.cinemaRoomId) {
            let cinemaRoomId = this.props.location.state.showtimeData.showtimeClick.cinemaRoomId;
            let res = await getSeatByCinemaRoomIdVIPService(cinemaRoomId);
            if (res && res.errCode === 0) {
                this.setState({
                    allSeatVIP: res.data ? res.data : [],
                })
            }
            console.log('check allseatVIP: ', res)
        }

        let data = this.state.allSeat;
        if (data && data.length > 0) {
            // data.map(item => {
            //     item.isSelected = false;
            //     return item;
            // })

            data = data.map(item => ({ ...item, isSelected: false }))
            this.setState({
                seat: data
            })
        }
    }

    handleClickBtnSeat = (inputSeat) => {
        let { seat } = this.state;
        if (seat && seat.length > 0) {
            seat = seat.map(item => {
                if (item.id === inputSeat.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                seat: seat
            })
        }

    }

    // handleClickCheckoutBtn = () => {
    //     let stateData = this.props.location.state.showtimeData;
    //     let showtimeClick = this.props.location.state.showtimeData.showtimeClick.date;
    //     let { seat, movieName } = this.state;
    //     let selectedSeat = seat.filter(item => item.isSelected === true);
    //     this.props.history.push({
    //         pathname: "/payment-methods",
    //         state: { stateData, selectedSeat, movieName }
    //     }
    //     );

    handleClickCheckoutBtn = () => {
        let stateData = this.props.location.state.showtimeData;
        let showtimeClick = this.props.location.state.showtimeData.showtimeClick.date;
        let { seat, movieName } = this.state;
        let selectedSeat = seat.filter(item => item.isSelected === true);
        this.props.history.push({
            pathname: "/booking-food",
            state: { stateData, selectedSeat, movieName }
        }
        );

        console.log('check stateData', stateData)
        console.log('check showtimeClick', showtimeClick)
        let myDate = Number(showtimeClick)
        let date = new Date(myDate)
        console.log('check date: ', date)
        let datee = moment(date).format("Do MMM YYYY");
        console.log('check datee: ', datee)
    }


    render() {
        // let { showtime } = this.props;
        let { allSeat, allSeatVIP, seat, movieName } = this.state;
        let movieNamepick = this.state.movieName.ten_phim;
        let theaterName = this.props.location.state.showtimeData.showtimeClick.theaterData.ten_rap;
        console.log('ten rap: ', theaterName);
        let showtimepick = this.props.location.state.showtimeData.showtimeClick.showTime;
        let movieFormatpick = this.props.location.state.showtimeData.showtimeClick.movieFormatData.ten_ddc;
        let selectedSeat = seat.filter(item => item.isSelected === true);
        console.log('check selected seat: ', selectedSeat)
        // console.log('check props: ', state);
        console.log('check isSelected: ', seat)
        let total = selectedSeat.reduce((total, item) => total + Number(item.seatTypeData.gia_tien), 0);
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='booking-seat-container'>
                    <div className='booking-seat'>
                        <div className='booking-online'>
                            <hr />
                            <span>BOOKING ONLINE</span>
                        </div>
                        <div className='information'>
                            {/* {JSON.stringify(showtime)} */}
                        </div>
                        <div className='screen'>
                            <span>SCREEN</span>
                        </div>

                        <div className='seat-btn'>
                            <div className='seat-normal'>
                                {seat && seat.length > 0 &&
                                    seat.map((item, index) => {
                                        return (
                                            <button key={index}
                                                className={`seat-normal-child ${item.isSelected && 'active'} ${item.da_chon && 'seat-normal-child--disabled'}`}
                                                onClick={() => !item.da_chon && this.handleClickBtnSeat(item)}
                                            >{item.da_chon ? 'X' : item.ten_ghe}</button>
                                        )
                                    })
                                }
                            </div>

                            <div className='seat-vip'>
                                {allSeatVIP && allSeatVIP.length > 0 &&
                                    allSeatVIP.map((item, index) => {
                                        return (
                                            <button key={index} className={`${item.isSelected && 'active'} ${item.da_chon && 'seat-vip-child--disabled'}`}>{item.da_chon ? 'X' : item.ten_ghe}</button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='note'>
                            <div className='normal'>
                                <button></button>
                                <span>Ghế thường</span>
                            </div>
                            <div className='VIP'>
                                <button></button>
                                <span>Ghế VIP</span>
                            </div>
                            <div className='pick'>
                                <button></button>
                                <span>Đang chọn</span>
                            </div>
                            <div className='picked'>
                                <button></button>
                                <span>Đã chọn</span>
                            </div>
                            <div className='X'>
                                <button>X</button>
                                <span>Không thể chọn</span>
                            </div>
                        </div>
                        <div className='price'>

                            <div className='content-left'>
                                <div>
                                    <span>Tên phim: {movieNamepick}</span>
                                </div>
                                <div>
                                    <span>Tên rạp: {theaterName}</span>
                                </div>
                                <div>
                                    <span>Suất chiếu: {showtimepick}</span>
                                </div>
                                <div>
                                    <span>Định dạng chiếu: {movieFormatpick}</span>
                                </div>
                            </div>
                            <div className='content-right'>
                                <div>


                                    <div>
                                        <span>Ghế: </span>
                                        {selectedSeat && selectedSeat.length > 0 &&
                                            selectedSeat.map((item, index) => {
                                                return (
                                                    <span>{item.ten_ghe} </span>
                                                )
                                            })
                                        }
                                    </div>

                                    <span>Loại ghế: </span>
                                    {selectedSeat && selectedSeat.length > 0 &&
                                        selectedSeat.slice(0, 1).map((item, index) => {
                                            return (
                                                <span>{item.seatTypeData.ten_loai_ghe} </span>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <span>Phòng chiếu: </span>
                                    {selectedSeat && selectedSeat.length > 0 &&
                                        selectedSeat.slice(0, 1).map((item, index) => {
                                            return (
                                                <span>Cinema {item.cinemaRoomData.so_phong} </span>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <span>Chiết khấu: </span>

                                </div>
                                <div>
                                    <span>Thành tiền : <NumberFormat
                                        value={total}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    />
                                        {/* {selectedSeat.reduce((total, item) => total + Number(item.seatTypeData.gia_tien), 0)} */}
                                    </span>
                                    {/* <span>Thành tiền:</span>
                                    {selectedSeat && selectedSeat.length > 0 &&
                                        selectedSeat.map((item, index) => {
                                            return (
                                                <span>{item.seatTypeData.gia_tien}*{selectedSeat.length}</span>
                                            )
                                        })
                                    } */}
                                </div>
                            </div>

                        </div>
                        <div className='checkout-btn'>
                            <button
                                disabled={!this.state.seat.filter(item => item.isSelected)?.length}
                                onClick={() => this.handleClickCheckoutBtn()}
                            >Tiếp theo</button>
                        </div>
                    </div>
                </div>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Seat);
