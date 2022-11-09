import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './TableManageMovie.scss';
import { toast } from 'react-toastify';
// import { getAllStaff, createNewStaffService, deleteStaffService, editStaffService } from '../../services/userServices'
import { getRevenueByDate } from '../../../services/userServices'


class ManageRevenueFood extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }






    render() {

        return (
            <div className='manage-report-container'>
                <div className='title-content'>
                    <div className='title'>QUẢN LÝ DOANH THU BẮP NƯỚC</div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        // listReport: state.admin.reportData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchReportRedux: () => dispatch(actions.fetchReportStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRevenueFood);
