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
import ManageTicket from '../containers/System/Admin/ManageTicket';
import ManageReport from '../containers/System/Admin/ManageReport';
import ManageRevenueTicket from '../containers/System/Admin/ManageRevenueTicket';
import ManageRevenueFood from '../containers/System/Admin/ManageRevenueFood';
import MembershipManage from '../containers/System/MembershipManage';
import SellTicket from '../containers/System/Admin/Sell-Ticket';
import SellFood from '../containers/System/Admin/Sell-Food';

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
                            <Route path="/system/manage-ticket" component={ManageTicket} />
                            <Route path="/system/manage-report" component={ManageReport} />
                            <Route path="/system/manage-revenue-ticket" component={ManageRevenueTicket} />
                            <Route path="/system/manage-revenue-food" component={ManageRevenueFood} />
                            <Route path="/system/user-membership" component={MembershipManage} />
                            <Route path="/system/sell-ticket" component={SellTicket} />
                            <Route path="/system/sell-food" component={SellFood} />

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
