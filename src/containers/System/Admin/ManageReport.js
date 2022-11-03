import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './TableManageMovie.scss';
// import { getAllStaff, createNewStaffService, deleteStaffService, editStaffService } from '../../services/userServices'
import { deleteRatingService, getAllReportService, deleteReportService } from '../../../services/userServices'


class ManageReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // reportRedux: [],
            allReport: []

        }
    }

    componentDidMount() {
        // this.props.fetchReportRedux();
        setTimeout(() => this.getAllReport(), 0)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listReport !== this.props.listReport) {
        //     this.setState({
        //         reportRedux: this.props.listReport
        //     })
        // }
    }

    async getAllReport() {
        let res = await getAllReportService();
        if (res && res.errCode === 0) {
            this.setState({
                allReport: res.data ? res.data : [],
            })
        }
    }

    handleDeleteRating = async (rating) => {
        console.log('check onclick rating', rating)
        await deleteReportService(rating.id_dg);
        await deleteRatingService(rating.id_dg);

        alert('Xóa bình luận thành công!');
        await this.getAllReport()
    }


    render() {
        // console.log('check get all movie', this.props.listReport);
        // console.log('check state', this.state.reportRedux);
        let arrReport = this.state.allReport;
        return (
            <div className='manage-report-container'>
                <div className='title-content'>
                    <div className='title'>QUẢN LÝ BÁO XẤU</div>
                </div>
                <div className='report-content'>
                    <table id='TableManageMovie'>
                        <tbody>
                            <tr>
                                <th>Tên người báo xấu </th>
                                <th>Nội dung báo xấu</th>
                                <th>Tên người bị báo xấu</th>
                                <th>Nội dung bị báo xấu</th>

                                {/* <th>Poster</th> */}
                                <th>Xóa bình luận</th>
                            </tr>

                            {arrReport && arrReport.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.reportData.ten_tv}</td>
                                        <td>{item.noi_dung}</td>
                                        <td>{item.ratingData.memberData.ten_tv}</td>
                                        <td>{item.ratingData.noi_dung}</td>

                                        {/* <td>{item.poster}</td> */}
                                        <td>
                                            <button className='btn-delete' onClick={() => this.handleDeleteRating(item)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }




                        </tbody>
                    </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageReport);
