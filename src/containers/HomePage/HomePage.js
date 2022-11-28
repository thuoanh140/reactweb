import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Movie from './Section/Movie';
import Event from './Section/Event';
import HomeFooter from './HomeFooter';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router';
import { paymentVnpaySuccess, minusQuantity } from '../../services/userServices'
import { toast } from 'react-toastify';
import Widget from 'rasa-webchat';



class HomePage extends Component {

    async componentDidMount() {
        const params = new URLSearchParams(window.location.href);
        const vnp_ResponseCode = params.get('vnp_ResponseCode');
        const vnp_TxnRef = params.get('vnp_TxnRef');
        if (vnp_ResponseCode && vnp_ResponseCode === '00') {

            let res = await paymentVnpaySuccess(vnp_TxnRef)
            if (res && res.errCode === 0) {
                await minusQuantity(res.id_km)
                toast.success('Thanh toán thành công!')
            }
            else (
                toast.error('Thanh toán thất bại!')
            )
        }

        this.CustomWidget()
    }

    CustomWidget = () => {
        return (
            <Widget
                initPayload={"/get_started"}
                socketUrl={"http://localhost:5500"}
                socketPath={"/socket.io/"}
                customData={{ "language": "en" }} // arbitrary custom data. Stay minimal as this will be added to the socket
                title={"Title"}
            />
        )
    }

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        }
        let isLoggedIn = this.props.isLoggedIn;
        console.log('check isLogged homepage: ', isLoggedIn)
        return (
            <div style={{ 'scrollBehavior': 'smooth' }}>
                <HomeHeader isShowBanner={true} />
                <Movie settings={settings}
                // isLoggedIn={isLoggedIn}
                />
                <Event settings={settings} />
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
