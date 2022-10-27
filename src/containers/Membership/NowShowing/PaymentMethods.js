import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './PaymentMethods.scss';
import * as actions from '../../../store/actions';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import axios from '../../../axios'
import { getPayment, getPaymentMethodsService, getEmailService, getPaymentByIdService, createPaymentCheckoutService } from '../../../services/userServices'




class PaymentMethods extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allPaymentMethods: [],
            isSelected: {},
            selectedSeatCheckout: [],
            id_pttt: '',
            id_tv: '',
            id_km: '',
            ngay_ban: '',
            giam_gia_ve: '',
            trang_thai_ve: '',
            id_ghe: '',
            id_suat_chieu: '',
            so_luong_ve: '',
            don_gia_ve: '',
            data_tv: [],
            giam_gia_hd: '',
            trang_thai_hd: '',
            so_luong: '',
            don_gia: '',
            selectedPayment: {}

        }
    }

    async componentDidMount() {
        let res = await getPaymentMethodsService();
        if (res && res.errCode === 0) {
            this.setState({
                allPaymentMethods: res.data ? res.data : []
            })
        }
    }

    onRadiochange = async (event) => {
        this.setState({
            isSelected: event.target.value
        })
        console.log('check value', event.target.value)
        let response = await getPaymentByIdService(event.target.value);
        this.setState({
            selectedPayment: response.data ? response.data : []
        })
        console.log('check response:', response)
    }

    handleSaveTicket = async () => {
        let { isSelected } = this.state;
        let result = [];
        let resultFood = [];
        let resultSeatName = [];
        let resultFoodName = [];
        let userId = this.props.userInfo.id_tv;
        console.log('check userId', userId)
        let date = this.props.location.state.stateData.stateData.showtimeClick.date;
        let movieName = this.props.location.state.stateData.movieName.ten_phim;
        let showTime = this.props.location.state.stateData.stateData.showtimeClick.showTime;
        let theater = this.props.location.state.stateData.stateData.showtimeClick.theaterData.ten_rap;
        console.log('check is', isSelected);
        console.log('check date', date)
        let myDate = Number(date);
        let datee = new Date(myDate);
        let dateee = moment(datee).format("Do MMM YYYY");
        let selectedSeatCheckout = this.props.location.state.stateData.selectedSeat;
        let selectedFoodCheckout = this.props.location.state.selectedFood;


        console.log('check selectedSeat payment methods: ', selectedSeatCheckout);
        let paymentName = this.state.selectedPayment.ten_pttt;
        console.log('check ten pttt', paymentName)

        let ve = Number(selectedSeatCheckout.reduce((total, item) => total + Number(item.seatTypeData.gia_tien), 0))
        let bap = Number(selectedFoodCheckout.reduce((total, item) => total + Number(item.gia), 0))
        let total = ve + bap;

        if (selectedSeatCheckout) {
            selectedSeatCheckout.map(item => {
                let seat = item.ten_ghe;
                resultSeatName.push(seat);
            })
        }
        console.log('check resultSeatName:', resultSeatName)

        if (selectedFoodCheckout) {
            selectedFoodCheckout.map(item => {
                let food = item.ten_ta;
                resultFoodName.push(food);
            })
        }
        console.log('check resultSeatName:', resultSeatName)

        if (selectedSeatCheckout) {
            selectedSeatCheckout.map(item => {
                let object = {};
                object.id_ghe = item.id;
                object.id_suat_chieu = this.props.location.state.stateData.stateData.showtimeClick.id;
                object.don_gia_ve = this.props.location.state.stateData.selectedSeat[0].seatTypeData.gia_tien;
                result.push(object);
            })
        }

        if (selectedFoodCheckout) {
            selectedFoodCheckout.map(item => {
                let object = {};
                object.id_ta = item.id;
                object.so_luong = '1';
                object.don_gia = item.gia;
                resultFood.push(object);


            })
        }
        let res = await getEmailService(userId);



        this.setState({
            data_tv: res.data ? res.data : [],
        })
        let { data_tv } = this.state;
        console.log('check data email: ', data_tv.email)

        if (isSelected === '2') {
            this.props.createNewTicket({
                id_pttt: isSelected,
                id_tv: userId,
                id_km: '',
                ngay_ban: date,
                giam_gia_ve: '',
                trang_thai_ve: '1',

                arrCTHDV: result,
                email: data_tv.email,
                name: data_tv.ten_tv,
                dateBooking: dateee,
                movieNameBooking: movieName,
                showTimeBooking: showTime,
                theaterBooking: theater,
                arrSeat: resultSeatName,
                paymentNameBooking: paymentName,
                arrFoodSelected: resultFoodName

            })

            this.props.createNewBillFood({
                id_pttt: isSelected,
                id_tv: userId,
                id_km: '',
                ngay_ban: date,
                giam_gia_hd: '',
                trang_thai_hd: '1',


                arrFood: resultFood
            })

            alert('Đặt vé thành công!');
            this.props.history.push(`/home`);
        }

        if (isSelected === '1') {
            this.props.createNewTicket({
                id_pttt: isSelected,
                id_tv: userId,
                id_km: '',
                ngay_ban: date,
                giam_gia_ve: '',
                trang_thai_ve: '0',

                arrCTHDV: result,
                email: data_tv.email,
                name: data_tv.ten_tv,
                dateBooking: dateee,
                movieNameBooking: movieName,
                showTimeBooking: showTime,
                theaterBooking: theater,
                arrSeat: resultSeatName,
                paymentNameBooking: paymentName,
                arrFoodSelected: resultFoodName

            })


            this.props.createNewBillFood({
                id_pttt: isSelected,
                id_tv: userId,
                id_km: '',
                ngay_ban: date,
                giam_gia_hd: '',
                trang_thai_hd: '0',


                arrFood: resultFood
            })
            // let response = await getPayment();
            let response = await getPayment({
                transactionRef: '55',
                orderType: total,
                amount: total
            });
            console.log(response);
            // this.props.history.push(response);
            window.location.href = response;

        }


    }


    render() {
        console.log('check props:', this.props)
        let { allPaymentMethods, isSelected } = this.state;
        console.log('check allpayment:', allPaymentMethods);
        console.log('check selected:', isSelected)
        let userId = this.props.userInfo.id;
        console.log('check userIdMethod: ', userId)
        let selectedSeat = this.props.location.state.stateData.selectedSeat;
        let selectedFood = this.props.location.state.selectedFood;
        let ve = Number(selectedSeat.reduce((total, item) => total + Number(item.seatTypeData.gia_tien), 0))
        // let bap = Number(selectedFood.reduce((total, item) => total + Number(item.gia), 0))
        let bap = Number(selectedFood.reduce((total, item) => total + (Number(item.gia) * item.quantity), 0))
        let total = ve + bap;
        let { selectedPayment } = this.state;
        console.log('check selectedPayment  render:', selectedPayment)
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='payment-methods-container'>
                    <div className='payment-methods'>
                        <div className='payment-methods-title'>
                            <span>Chọn phương thức thanh toán:</span>
                        </div>
                        <div className='pick-payment-methods'>
                            {allPaymentMethods && allPaymentMethods.length > 0 &&
                                allPaymentMethods.map((item, index) => {
                                    return (

                                        <div key={index} className="column">
                                            <input type="radio" id={item.id} value={item.id} name="radio-group"
                                                onChange={this.onRadiochange} />
                                            <label for={item.id}>{item.ten_pttt}</label>
                                        </div>


                                    )
                                })
                            }
                        </div>

                    </div>
                    <div className='payment-detail'>
                        <div className='title-total'><span>TỔNG CỘNG:</span></div>
                        <div className='ticket'>
                            <span>Tiền vé:
                                <NumberFormat
                                    value={ve}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            </span>
                        </div>
                        <div className='food'>
                            <span>Bắp nước:
                                <NumberFormat
                                    value={bap}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            </span>
                        </div>
                        <hr />
                        <div className='total'>
                            <span>Tổng tiền:
                                <NumberFormat
                                    value={total}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}

                                />
                            </span>
                        </div>
                        <div className='method'>
                            <span>Phương thức thanh toán: {selectedPayment.ten_pttt}</span></div>

                        <div className='button-css'>
                            <button
                                className="glow-on-hover"
                                onClick={this.handleSaveTicket}>Xác nhận thanh toán</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewTicket: (data) => dispatch(actions.createNewTicket(data)),
        createNewDetailTicket: (data) => dispatch(actions.createNewDetailTicket(data)),
        createNewTicketVNPay: (data) => dispatch(actions.createNewTicket(data)),
        createNewBillFood: (data) => dispatch(actions.createNewBillFood(data)),
        createNewBillFoodVNPay: (data) => dispatch(actions.createNewBillFood(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethods);
