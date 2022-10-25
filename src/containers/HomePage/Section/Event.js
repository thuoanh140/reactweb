import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Movie.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';



class Event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrEvent: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.eventRedux !== this.props.eventRedux) {
            this.setState({
                arrEvent: this.props.eventRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadEvent();
    }

    // handleViewDetailMovie = (movie) => {
    //     console.log('view detail movie: ', movie);
    //     this.props.history.push(`/now-showing/${movie.ten_phim}`)
    // }


    render() {
        let arrEvent = this.state.arrEvent;
        return (
            <div className='section-share section-movie'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span>EVENT</span>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>


                            {arrEvent && arrEvent.length > 0
                                && arrEvent.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.anh_event) {
                                        imageBase64 = new Buffer(item.anh_event, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className='section-customize' key={index}
                                        // onClick={() => this.handleViewDetailMovie(item)} 
                                        >
                                            <div className='bg-image1'
                                                style={{ backgroundImage: `url(${imageBase64})` }}

                                            ></div>
                                            <div className='text-center'><b>{item.ten_km}</b></div>
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
        eventRedux: state.admin.eventData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadEvent: () => dispatch(actions.fetchEvent())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Event));
