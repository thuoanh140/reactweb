import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';



import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';

import Login from './Auth/Login';

import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import HomePage from './HomePage/HomePage.js'
import CustomScrollbars from '../components/CustomScrollbars';
import DetailMovie from './Membership/NowShowing/DetailMovie';
import Seat from './Membership/NowShowing/Seat';
import PaymentMethods from './Membership/NowShowing/PaymentMethods';
import LoginCustomer from './Auth/LoginCustomer';
import Food from './HomePage/Section/Food';
import MyTickets from './Membership/NowShowing/MyTickets';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">



                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_MOVIE} component={DetailMovie} />
                                    <Route path={path.SEAT} component={Seat} />
                                    <Route path={path.FOOD} component={Food} />
                                    <Route path={path.PAYMENT_METHODS} component={PaymentMethods} />
                                    <Route path={path.LOGIN_MEMBERSHIP} component={LoginCustomer} />
                                    <Route path={path.MY_TICKET} component={MyTickets} />


                                </Switch>
                            </CustomScrollbars>
                        </div>

                        <ToastContainer
                            // className="toast-container" 
                            // toastClassName="toast-item" 
                            // bodyClassName="toast-item-body"
                            // autoClose={true} hideProgressBar={true} pauseOnHover={false}
                            // pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            // closeButton={<CustomToastCloseButton />}
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);