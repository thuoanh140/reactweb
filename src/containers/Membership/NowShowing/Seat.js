import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './Seat.scss'
import Showtime from './Showtime';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { getSeatByCinemaRoomIdService, getIdSeatByIdShowtimeService, getMovieByIdService } from '../../../services/userServices';
import HomeFooter from '../../HomePage/HomeFooter';

class Seat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allSeat: [],
            seat: [],
            movieName: [],
            banSeat: []
            // showtimeClick: {}

        }
    }

    async componentDidMount() {

        if (this.props.location && this.props.location.state && this.props.location.state.showtimeData && this.props.location.state.showtimeData.showtimeClick && this.props.location.state.showtimeData.showtimeClick.movieId) {
            let movieId = this.props.location.state.showtimeData.showtimeClick.movieId;
            let respon = await getMovieByIdService(movieId);
            if (respon && respon.errCode === 0) {
                this.setState({
                    movieName: respon.data ? respon.data : [],

                })
            }
        }

        if (this.props.location && this.props.location.state && this.props.location.state.showtimeData && this.props.location.state.showtimeData.showtimeClick && this.props.location.state.showtimeData.showtimeClick.cinemaRoomId) {
            let cinemaRoomId = this.props.location.state.showtimeData.showtimeClick.cinemaRoomId;
            let response = await getSeatByCinemaRoomIdService(cinemaRoomId);
            if (response && response.errCode === 0) {
                this.setState({
                    allSeat: response.data ? response.data : [],

                })
            }
        }

        let data = this.state.allSeat;
        if (data && data.length > 0) {

            data = data.map(item => ({ ...item, isSelected: false }))
            this.setState({
                seat: data
            })
        }

        if (this.props.location.state.showtimeData.showtimeClick?.id) {
            let idShowtime = this.props.location.state.showtimeData.showtimeClick?.id;
            console.log('check idShowtime', idShowtime)
            let res = await getIdSeatByIdShowtimeService(idShowtime);
            if (res && res.errCode === 0) {
                this.setState({
                    banSeat: res.data ? res.data : [],

                })
            }
            console.log('check banSeat', res)
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
        let { seat, movieName, banSeat } = this.state;
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
        console.log('check props seat:', this.props)
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
                                            <SeatButton 
                                                key={index}
                                                isSelected={item.isSelected}
                                                da_chon={banSeat.some(banItem => item.id === banItem.id_ghe)}
                                                ten_ghe={item.ten_ghe}
                                                loai_ghe={item.id_loai_ghe}
                                                onClick={() => !item.da_chon && this.handleClickBtnSeat(item)} 
                                            />
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
                                    </span>
                                  
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

class SeatButton extends Component 
{
    constructor(props) {
        super(props)
    }

    render() {
        const {isSelected, da_chon, onClick, ten_ghe, loai_ghe} = this.props

        const typeOfSeat = loai_ghe === '1' ? 'normal' : 'vip';
        return (
                <button
                    className={`seat-${typeOfSeat}-child ${isSelected && 'active'} ${da_chon && `seat-${typeOfSeat}-child--disabled`}`}
                    onClick={onClick}
                >
                    {da_chon ? 'X' : ten_ghe}
                </button>
        )
        
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
