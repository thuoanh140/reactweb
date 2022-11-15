import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './PaymentMethods.scss';
import * as actions from '../../../store/actions';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import axios from '../../../axios'
import { getPayment, getPaymentMethodsService, getEmailService, getPaymentByIdService, createNewTicketService, createNewFoodService, compareVoucherService, minusQuantity } from '../../../services/userServices';
import HomeFooter from '../../HomePage/HomeFooter';
import { toast } from 'react-toastify';




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
            selectedPayment: {},
            ma_giam_gia: '',
            response: {},
            giam_gia: ''

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

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.giam_gia !== this.state.giam_gia) {
            this.setState({
                giam_gia: this.state.giam_gia
            })
        }

    }

    onRadiochange = async (event) => {
        this.setState({
            isSelected: event.target.value
        })
        let response = await getPaymentByIdService(event.target.value);
        this.setState({
            selectedPayment: response.data ? response.data : []
        })

    }

    handleSaveTicket = async () => {
        let { isSelected, response, giam_gia } = this.state;
        let result = [];
        let resultFood = [];
        let resultSeatName = [];
        let resultFoodName = [];
        let userId = this.props.userInfo.id_tv;
        let date = this.props.location.state.stateData.stateData.showtimeClick.date;
        let movieName = this.props.location.state.stateData.movieName.ten_phim;
        let showTime = this.props.location.state.stateData.stateData.showtimeClick.showTime;
        let theater = this.props.location.state.stateData.stateData.showtimeClick.theaterData.ten_rap;
        let myDate = Number(date);
        let datee = new Date(myDate);
        let dateee = moment(datee).format("Do MMM YYYY");
        let selectedSeatCheckout = this.props.location.state.stateData.selectedSeat;
        let selectedFoodCheckout = this.props.location.state.selectFood;
        let paymentName = this.state.selectedPayment.ten_pttt;

        let ve = Number(selectedSeatCheckout.reduce((total, item) => total + Number(item.seatTypeData.gia_tien), 0))
        let bap = Number(selectedFoodCheckout.reduce((total, item) => total + Number(item.gia), 0))
        let total = ve + bap;
        let lastTotal = giam_gia ? (total - giam_gia) : total
        console.log('lastTotal', lastTotal)
        if (selectedSeatCheckout) {
            selectedSeatCheckout.map(item => {
                let seat = item.ten_ghe;
                resultSeatName.push(seat);
            })
        }

        if (selectedFoodCheckout) {
            selectedFoodCheckout.map(item => {
                let food = item.ten_ta;
                resultFoodName.push(food);
            })
        }


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


        if (isSelected === '2') {
            this.props.createNewTicket({
                id_pttt: isSelected,
                id_tv: userId,
                id_km: '',
                ngay_ban: date,
                giam_gia_ve: '',
                // trang_thai_ve: null,

                arrCTHDV: result,
                email: data_tv.email,
                name: data_tv.ten_tv,
                dateBooking: dateee,
                movieNameBooking: movieName,
                showTimeBooking: showTime,
                theaterBooking: theater,
                arrSeat: resultSeatName,
                paymentNameBooking: paymentName,
                arrFoodSelected: resultFoodName,



            })

            this.props.createNewBillFood({
                id_pttt: isSelected,
                id_tv: userId,
                id_km: '',
                ngay_ban: date,
                giam_gia_hd: '',
                // trang_thai_hd: null,


                arrFood: resultFood
            })

            if (response.errCode === 0) {
                await minusQuantity(response.id)
            }

            toast.success('Đặt vé thành công!')
            this.props.history.push(`/home`);
        }

        if (isSelected === '1') {
            let res = await createNewTicketService({
                id_pttt: isSelected,
                id_tv: userId,
                id_km: '',
                ngay_ban: date,
                giam_gia_ve: '',
                trang_thai_ve: false,

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



            await createNewFoodService({
                id_pttt: isSelected,
                id_tv: userId,
                id_km: '',
                ngay_ban: date,
                giam_gia_hd: '',
                trang_thai_hd: '1',


                arrFood: resultFood
            })
            if (res && res.errCode === 0) {
                let response = await getPayment({
                    transactionRef: String(res.id_ve),
                    orderType: lastTotal,
                    amount: lastTotal
                });
                console.log(response);
                window.location.href = response;
            }
        }


    }

    handleOnChangeVoucher = (event) => {
        this.setState({
            ma_giam_gia: event.target.value
        })
    }

    compareVoucher = async () => {
        let voucherInput = this.state.ma_giam_gia;
        let res = await compareVoucherService(voucherInput);
        console.log(res.errMessage)
        this.setState({
            response: res
        })
        console.log('response', res)
        if (res && res.errCode === 0) {
            this.setState({
                giam_gia: res.data
            })
        }

    }


    render() {
        let { allPaymentMethods, isSelected, ma_giam_gia, response, giam_gia } = this.state;
        let userId = this.props.userInfo.id;
        let selectedSeat = this.props.location.state.stateData.selectedSeat;
        let selectedFood = this.props.location.state.selectFood;
        let movieName = this.props.location.state.stateData.movieName.ten_phim;
        let showTime = this.props.location.state.stateData.stateData.showtimeClick.showTime;
        let movieFormat = this.props.location.state.stateData.stateData.showtimeClick.movieFormatData.ten_ddc;
        let theater = this.props.location.state.stateData.stateData.showtimeClick.theaterData.ten_rap;
        let ve = Number(selectedSeat.reduce((total, item) => total + Number(item.seatTypeData.gia_tien), 0))
        // let bap = Number(selectedFood.reduce((total, item) => total + Number(item.gia), 0))
        let bap = Number(selectedFood.reduce((total, item) => total + (Number(item.gia) * item.quantity), 0))
        let selectFood = this.props.location.state.selectFood;
        let total = ve + bap;
        let lastTotal = giam_gia ? (total - giam_gia) : total
        let { selectedPayment } = this.state;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='payment-methods-container'>
                    <div className='payment-methods'>
                        <div className='payment-methods-title'>
                            <span>Thông tin hóa đơn</span>
                        </div>
                        <div className='bill-info'>
                            <div className='bill'>
                                <span><b>Tên phim:</b> {movieName}</span><br />
                                <span><b>Suất chiếu:</b> {showTime}</span><br />
                                <span><b>Định dạng chiếu:</b> {movieFormat}</span><br />
                                <span><b>Ghế: </b></span>                                        {selectedSeat && selectedSeat.length > 0 &&
                                    selectedSeat.map((item, index) => {
                                        return (
                                            <span>{index > 0 && ', '}{item.ten_ghe}</span>
                                        )
                                    })
                                }<br />
                                <span><b>Rạp:</b> {theater}</span><br />
                                <div className='name-food'>
                                    <span><b>Bắp nước: </b></span>
                                    {selectFood && selectFood.length > 0 ?
                                        <> {selectFood && selectFood.length > 0 &&
                                            selectFood.map((item, index) => {
                                                return (
                                                    <span>{index > 0 && ', '}{item.ten_ta} x{item.quantity}</span>
                                                )
                                            })
                                        }
                                        </>
                                        :
                                        <span>Bạn chưa đặt bắp nước.</span>
                                    }
                                    <br />

                                </div>
                            </div>
                        </div>
                        <div className='pick-payment-methods'>
                            <span>Phương thức thanh toán:</span>
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
                        <div className='priceBill'>
                            <div className='ticket'>
                                <span>Tiền vé:&emsp;
                                    <NumberFormat
                                        value={ve}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    />
                                </span>
                            </div>
                            <div className='food'>
                                <span>Bắp nước:&emsp;
                                    <NumberFormat
                                        value={bap}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    />
                                </span>
                            </div>

                            <div className='voucher'>
                                <div class="col-3">
                                    <input class="effect-8" type="text" placeholder='Mã giảm giá' value={ma_giam_gia} onChange={(event) => this.handleOnChangeVoucher(event)} />
                                    <br /><span>{response.errMessage}</span>
                                </div>
                                <div>
                                    <button className='btn btn-primary' onClick={() => this.compareVoucher()}>Sử dụng</button>
                                </div>

                            </div>
                        </div>
                        <div className='temp'>
                            <span>Tổng cộng:
                                <NumberFormat
                                    value={total}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}

                                /></span><br />
                            <span>Mã giảm giá:{giam_gia &&
                                <NumberFormat
                                    value={giam_gia}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}

                                />}</span>
                        </div>

                        <div className='total'>
                            <span>Thành tiền:&emsp;
                                <NumberFormat
                                    value={lastTotal}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />

                            </span>
                        </div>
                        {/* <div className='method'>
                            <span>Phương thức thanh toán: <br />{selectedPayment.ten_pttt}</span></div> */}

                        <div className='button-css'>
                            <button
                                className="glow-on-hover"
                                onClick={this.handleSaveTicket}>Xác nhận thanh toán</button>
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
