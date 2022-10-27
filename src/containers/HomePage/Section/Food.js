import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Food.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';
import { getFoodService } from '../../../services/userServices'
import NumberFormat from 'react-number-format';
import { QuantityPicker } from 'react-qty-picker';



class Food extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrFood: [],
            food: [],
            quantity: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.foodRedux !== this.props.foodRedux) {
        //     this.setState({
        //         arrFood: this.props.foodRedux
        //     })
        // }


    }

    async componentDidMount() {
        // this.props.loadFood();
        let res = await getFoodService();
        if (res && res.errCode === 0) {
            this.setState({
                arrFood: res.data ? res.data : [],
            })
        }
        console.log('check arrFood: ', res)

        let data = this.state.arrFood;
        console.log('check data food:', data)
        if (data && data.length > 0) {
            data.map(item => {
                item.isSelected = false;
                return item;
            })

            // data = data.map(item => ({ ...item, isSelected: false }))
            this.setState({
                food: data
            })
        }
    }

    handleClickFood = (inputFood) => {
        let { food } = this.state;
        if (food && food.length > 0) {
            food = food.map(item => {
                if (item.id === inputFood.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                food: food
            })
            console.log('check food select: ', food);
        }

    }

    handleClickCheckoutBtn = () => {
        let { food } = this.state;
        let stateData = this.props.location.state;
        let selectedFood = food.filter(item => item.isSelected === true);
        this.props.history.push({
            pathname: "/payment-methods",
            state: { stateData, selectedFood }
        }
        );

        // console.log('check stateData', stateData)
        // console.log('check showtimeClick', showtimeClick)
        // let myDate = Number(showtimeClick)
        // let date = new Date(myDate)
        // console.log('check date: ', date)
        // let datee = moment(date).format("Do MMM YYYY");
        // console.log('check datee: ', datee)
    }

    handleQuantity = (event) => {
        this.setState({
            quantity: event
        })
        console.log('check event:', event)
        let { food } = this.state;
        let selectedFood = food.filter(item => item.isSelected === true);
        selectedFood = selectedFood.map(item => {
            item.quantity = event;
            return item;
        })

    }




    render() {
        let isLoggedIn = this.props.isLoggedIn;
        console.log('check isLogged Food: ', isLoggedIn)
        let arrFood = this.state.arrFood;
        console.log('check food: ', arrFood)
        console.log('check props:', this.props)
        let quantity = this.state.quantity;
        console.log('check quantity: ', quantity)
        let movieNamepick = this.props.location.state.movieName.ten_phim;
        let theaterName = this.props.location.state.stateData.showtimeClick.theaterData.ten_rap;
        let showtimepick = this.props.location.state.stateData.showtimeClick.showTime;
        let movieFormatpick = this.props.location.state.stateData.showtimeClick.movieFormatData.ten_ddc;
        let selectedSeat = this.props.location.state.selectedSeat;
        let { food } = this.state;
        console.log('check food food: ', food)
        let selectedFood = food.filter(item => item.isSelected === true);
        console.log('check selected food: ', selectedFood)
        // console.log('check props: ', state);
        let ve = Number(selectedSeat.reduce((total, item) => total + Number(item.seatTypeData.gia_tien), 0))
        let bap = Number(selectedFood.reduce((total, item) => total + (Number(item.gia) * item.quantity), 0))
        let total = ve + bap;
        console.log('check total: ', total)

        return (
            <>
                <div className='food-share'>
                    <div className='food-container'>
                        <div className='food-header'>
                            <span>FOOD SELECTION</span>
                        </div>
                        <div className='food-body'>
                            {/* <Slider {...this.props.settings}> */}


                            {arrFood && arrFood.length > 0
                                && arrFood.slice(0, 4).map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.anh) {
                                        imageBase64 = new Buffer(item.anh, 'base64').toString('binary');
                                    }
                                    return (

                                        <div key={index}
                                            className='food-customize'>
                                            <div className='bg-image1'
                                                style={{ backgroundImage: `url(${imageBase64})` }}

                                            ></div>
                                            <div className={item.isSelected === true ? 'text-center active' : 'text-center'}
                                                onClick={() => this.handleClickFood(item)}>
                                                <span>{item.ten_ta}</span><br></br>
                                                <span>{item.gia}</span>

                                            </div>
                                            <div>
                                                <QuantityPicker smooth
                                                    onChange={(event) => this.handleQuantity(event)} />
                                            </div>

                                        </div>

                                    )
                                })}
                            {/* </Slider> */}
                        </div>

                        <div className='food-body'>
                            {/* <Slider {...this.props.settings}> */}


                            {arrFood && arrFood.length > 0
                                && arrFood.slice(4, 8).map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.anh) {
                                        imageBase64 = new Buffer(item.anh, 'base64').toString('binary');
                                    }
                                    return (

                                        <div className='food-customize' key={index} >
                                            <div className='bg-image1'
                                                style={{ backgroundImage: `url(${imageBase64})` }}

                                            ></div>
                                            <div className={item.isSelected === true ? 'text-center active' : 'text-center'}
                                                onClick={() => this.handleClickFood(item)}>
                                                <span>{item.ten_ta}</span><br></br>
                                                <span><NumberFormat
                                                    value={item.gia}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                /></span>


                                            </div>
                                            <div>
                                                <QuantityPicker smooth
                                                    onChange={(event) => this.handleQuantity(event)} />
                                            </div>

                                        </div>

                                    )
                                })}
                            {/* </Slider> */}
                        </div>

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
                            <span>Giá vé  :<NumberFormat
                                value={ve}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                            /></span><br />
                            <span>Giá bắp nước  :<NumberFormat
                                value={bap}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                            /></span><br />
                            <span>Tổng cộng: <NumberFormat
                                value={total}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                            /></span>
                            {/* <span>Tổng cộng: {Number(selectedSeat.reduce((total, item) => total + Number(item.seatTypeData.gia_tien), 0))} + {Number(selectedFood.reduce((total, item) => total + Number(item.gia), 0))} </span> */}
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
                        onClick={() => this.handleClickCheckoutBtn()}
                    >Thanh toán</button>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        // foodRedux: state.admin.foodData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // loadFood: () => dispatch(actions.fetchFood())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Food));
