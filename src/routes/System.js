import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageShowtimes from '../containers/System/Admin/ManageShowtimes';
import CreateEvent from '../containers/System/Admin/CreateEvent';
import Login from '../containers/Auth/Login';
import LoginCustomer from '../containers/Auth/LoginCustomer';
import CreateFood from '../containers/System/Admin/CreateFood';

class System extends Component {
    render() {

        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/manage-movie" component={UserRedux} />
                            <Route path="/system/manage-showtime" component={ManageShowtimes} />
                            <Route path="/system/manage-event" component={CreateEvent} />
                            <Route path="/system/manage-food" component={CreateFood} />


                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
