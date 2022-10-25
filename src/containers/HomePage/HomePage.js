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

class HomePage extends Component {

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
            <div>
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
