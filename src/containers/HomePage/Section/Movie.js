import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Movie.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';



class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNowShowing: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.nowShowingRedux !== this.props.nowShowingRedux) {
            this.setState({
                arrNowShowing: this.props.nowShowingRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadNowShowing();
    }

    handleViewDetailMovie = (movie) => {
        console.log('view detail movie: ', movie);
        this.props.history.push(`/now-showing/${movie.ten_phim}`)
    }


    render() {
        let isLoggedIn = this.props.isLoggedIn;
        console.log('check isLogged movie: ', isLoggedIn)
        let arrNowShowing = this.state.arrNowShowing;
        return (
            <div className='section-share section-movie' id='now-showing'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span>MOVIE SELECTION</span>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>


                            {arrNowShowing && arrNowShowing.length > 0
                                && arrNowShowing.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.poster) {
                                        imageBase64 = new Buffer(item.poster, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailMovie(item)}>
                                            <div className='bg-image--wrapper'>
                                                <div className='bg-image1'
                                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                                ></div>
                                            </div>
                                            <div className='text-center'><b>{item.ten_phim}</b></div>
                                            <div className='text-center trailer'>

                                            </div>

                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        nowShowingRedux: state.admin.nowShowing
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadNowShowing: () => dispatch(actions.fetchNowShowing())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Movie));
