import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Event.scss'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

class Event extends Component {

    render() {



        return (
            <div className='section-share section-event'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span>EVENT</span>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image1'></div>

                            </div>
                            <div className='section-customize'>
                                <div className='bg-image2'></div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image3'></div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image4'></div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image5'></div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image6'></div>
                            </div>
                        </Slider>
                    </div>

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Event);
