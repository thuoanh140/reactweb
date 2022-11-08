import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './ComingSoon.scss';
import * as actions from '../../../store/actions';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { withRouter } from 'react-router';
import { getComingSoonService } from '../../../services/userServices'
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import HomeFooter from '../../HomePage/HomeFooter';




class ComingSoon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allComingSoon: []
        }
    }

    async componentDidMount() {

        let res = await getComingSoonService();
        if (res && res.errCode === 0) {
            this.setState({
                allComingSoon: res.data ? res.data : [],
            })
        }
        console.log('check coming soon:', res)
    }

    handleViewDetailMovie = (movie) => {
        console.log('view detail movie: ', movie);
        // this.props.history.push(`/coming-soon/${movie.ten_phim}`)
        window.location.href = `/coming-soon/${movie.ten_phim}`;
    }



    render() {
        let { allComingSoon } = this.state;
        console.log('render:', allComingSoon)
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='coming-soon-container'>
                    <div className='coming-soon-header'>
                        <span>COMING SOON</span>
                    </div>
                    <div className='coming-soon-body'>
                        {allComingSoon && allComingSoon.length > 0
                            && allComingSoon.map((item, index) => {
                                let imageBase64 = '';
                                if (item.poster) {
                                    imageBase64 = new Buffer(item.poster, 'base64').toString('binary');
                                }
                                return (

                                    <div key={index}
                                        className='coming-soon-customize' onClick={() => this.handleViewDetailMovie(item)}>
                                        <div className='bg-image1'
                                            style={{ backgroundImage: `url(${imageBase64})` }}

                                        ></div>
                                        <div className='coming-soon-name'>
                                            <span>
                                                {item.ten_phim}
                                            </span>

                                        </div>

                                    </div>

                                )
                            })}


                        {/* {
                            allComingSoon.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <span>{item.ten_phim}</span>
                                    </div>
                                )
                            })
                        } */}
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

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComingSoon));
