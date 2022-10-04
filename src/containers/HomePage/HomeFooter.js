import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './HomeFooter.scss'
import { FormattedMessage } from 'react-intl';


class HomeFooter extends Component {

    render() {



        return (
            <div className='home-footer'>
                <p>&copy; 2022 OnCinema.com</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
