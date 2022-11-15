import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './MyTickets.scss';
import * as actions from '../../../store/actions';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { withRouter } from 'react-router';
import { getTicketByIdTVService, getDetailTicketByIdTicketService, cancelTicket, getMemberByIdTKService, editMemberService, getTicketUnPaidByIdTVService } from '../../../services/userServices'
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import HomeFooter from '../../HomePage/HomeFooter';
import ModalUpdateMember from './ModalUpdateMember';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage,
}

class MyTickets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allTicket: [],
            allDetailTicket: [],
            futureTicket: [],
            memberInfo: [],
            isOpenModalEditMember: false,
            memberEdit: {},
            allTicketUnpaid: [],
            allDetailTicketUnpaid: []

        }
    }

    componentDidMount() {
        setTimeout(() => this.getTicket(), 0)
        setTimeout(() => this.getTicketUnPaid(), 0)
    }

    async getTicket() {
        let userId = this.props.userInfo?.id_tv;
        let accountId = this.props.userInfo?.id;
        let res = await getTicketByIdTVService(userId);
        if (res && res.errCode === 0) {
            this.setState({
                allTicket: res.data ? res.data : [],
            })
        }
        let ticket = res.data;
        let detailTicket = [];
        for (let i = 0; i < ticket.length; i++) {
            let response = await getDetailTicketByIdTicketService(ticket[i].id);
            detailTicket.push(response)
        }
        this.setState({
            allDetailTicket: detailTicket
        })
        let resp = await getMemberByIdTKService(accountId);
        if (resp && resp.errCode === 0) {
            this.setState({
                memberInfo: resp.data ? resp.data : [],
            })
        }
    }

    async getTicketUnPaid() {
        let userId = this.props.userInfo?.id_tv;
        let res = await getTicketUnPaidByIdTVService(userId);
        if (res && res.errCode === 0) {
            this.setState({
                allTicketUnpaid: res.data ? res.data : [],
            })
        }
        console.log('check unpaid', res)
        let ticketUnpaid = res.data;
        let detailTicketUnpaid = [];
        for (let i = 0; i < ticketUnpaid.length; i++) {
            let response = await getDetailTicketByIdTicketService(ticketUnpaid[i].id);
            detailTicketUnpaid.push(response)
        }
        this.setState({
            allDetailTicketUnpaid: detailTicketUnpaid
        })


    }

    toggleMemberEditModal = () => {
        this.setState({
            isOpenModalEditMember: !this.state.isOpenModalEditMember,
        })
    }

    handleEditMember = (member) => {
        console.log('check edit staff', member);
        this.setState({
            isOpenModalEditMember: true,
            memberEdit: member
        })
    }

    doEditMember = async (member) => {

        console.log('click save staff: ', member);
        let res = await editMemberService(member);
        // try {
        //     let res = await editStaffService(staff);
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             isOpenModalEditStaff: false
        //         })
        //         await this.getAllStaffFromReact();
        //     } else {
        //         alert(res.errCode);
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    }

    btnCancelTicket = async (ticket) => {

        let id = ticket.data[0].id;
        console.log('check id:', id)
        await cancelTicket(id);

        await this.getTicket()
    }


    render() {
        let { allDetailTicket, memberInfo, allDetailTicketUnpaid } = this.state;
        let today = moment().unix();
        let todayCompare = today * 1000;
        let todayEarly10 = todayCompare - (10 * 60 * 60)
        console.log('todayEarly10', todayEarly10)
        let loai_tv = memberInfo.loai_tv;
        console.log('check props:', this.props)
        let total = allDetailTicket.reduce((total, item) => total + (Number(item.data[0].don_gia_ve) * Number(item.data[0].so_luong_ve)), 0);
        console.log('checl total: ', total)

        let historyTicket = allDetailTicket.filter(item => new Date(Number(item.data[0].ticketData.ngay_ban)).setHours(Number((item.data[0].suatChieuId.showTime).slice(0, 2))) <= todayCompare)

        let futureTicket = allDetailTicket.filter(item => new Date(Number(item.data[0].ticketData.ngay_ban)).setHours(Number((item.data[0].suatChieuId.showTime).slice(0, 2))) > todayCompare)
        let futureTicketUnpaid = allDetailTicketUnpaid.filter(item => new Date(Number(item.data[0].ticketData.ngay_ban)).setHours(Number((item.data[0].suatChieuId.showTime).slice(0, 2))) > todayEarly10)
        let nonPayment = allDetailTicketUnpaid.filter(item => new Date(Number(item.data[0].ticketData.ngay_ban)).setHours(Number((item.data[0].suatChieuId.showTime).slice(0, 2))) <= todayEarly10)
        console.log('checl historyTicket: ', historyTicket)
        console.log('checl futureTicket: ', futureTicket)
        console.log('checl allDetailTicket: ', allDetailTicket)
        console.log('checl allDetailTicketUnpaid: ', allDetailTicketUnpaid)
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='myticket-container'>
                    <div className='content-left'>
                        <div className='title'><span>Lịch sử giao dịch</span></div>
                        <div className='history-ticket'>
                            {historyTicket && historyTicket.length > 0 ?
                                <>
                                    <table id='TableManageMovie'>

                                        <tbody>
                                            <tr>
                                                <th>Tên phim </th>
                                                <th>Ngày chiếu</th>
                                                <th>Suất chiếu</th>
                                                <th>Giá vé</th>
                                                <th>Số lượng</th>
                                                <th>Rạp</th>
                                            </tr>

                                            {historyTicket && historyTicket.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.data[0].suatChieuId.movieData.ten_phim}</td>
                                                        <td>{moment(new Date(Number(item.data[0].ticketData.ngay_ban))).format("DD/MM/YYYY")}</td>
                                                        <td>{item.data[0].suatChieuId.showTime}</td>
                                                        <td> <NumberFormat
                                                            value={item.data[0].don_gia_ve}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={'VND'}
                                                        /></td>
                                                        <td>{item.data[0].so_luong_ve}</td>
                                                        <td>{item.data[0].suatChieuId.theaterData.ten_rap}</td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>

                                </>
                                :
                                <div className='not-history'>Bạn chưa có giao dịch (đơn hàng) đã xem nào!</div>

                            }
                        </div>
                        <div className='title'>Các vé đã thanh toán</div>
                        <div className='future-ticket'>
                            {futureTicket && futureTicket.length > 0 ?
                                <>
                                    <table id='TableManageMovie'>

                                        <tbody>
                                            <tr>
                                                <th>Tên phim </th>
                                                <th>Ngày chiếu</th>
                                                <th>Suất chiếu</th>
                                                <th>Giá vé</th>
                                                <th>Số lượng</th>
                                                <th>PTTT</th>
                                                <th>Rạp</th>
                                                <th>Hủy vé</th>
                                            </tr>

                                            {futureTicket && futureTicket.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.data[0].suatChieuId.movieData.ten_phim}</td>
                                                        <td>{moment(new Date(Number(item.data[0].ticketData.ngay_ban))).format("DD/MM/YYYY")}</td>
                                                        <td>{item.data[0].suatChieuId.showTime}</td>
                                                        <td> <NumberFormat
                                                            value={item.data[0].don_gia_ve}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={'VND'}
                                                        /></td>
                                                        <td>{item.data[0].so_luong_ve}</td>
                                                        <td>{item.data[0].ticketData.paymentData.ten_pttt}</td>
                                                        <td>{item.data[0].suatChieuId.theaterData.ten_rap}</td>
                                                        <td>
                                                            <button className='btn-cancel'
                                                                onClick={() => this.btnCancelTicket(item)}
                                                            ><i class="fas fa-window-close"></i></button>

                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>

                                </>
                                :
                                <div className='not-history'>Bạn chưa có giao dịch (đơn hàng) đã thanh toán nào!</div>

                            }
                        </div>

                        <div className='title'>Các vé chưa thanh toán</div>
                        <div className='future-ticket'>
                            {futureTicketUnpaid && futureTicketUnpaid.length > 0 ?
                                <>
                                    <table id='TableManageMovie'>

                                        <tbody>
                                            <tr>
                                                <th>Tên phim </th>
                                                <th>Ngày chiếu</th>
                                                <th>Suất chiếu</th>
                                                <th>Giá vé</th>
                                                <th>Số lượng</th>
                                                <th>PTTT</th>
                                                <th>Rạp</th>
                                                <th>Hủy vé</th>
                                            </tr>

                                            {futureTicketUnpaid && futureTicketUnpaid.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.data[0].suatChieuId.movieData.ten_phim}</td>
                                                        <td>{moment(new Date(Number(item.data[0].ticketData.ngay_ban))).format("DD/MM/YYYY")}</td>
                                                        <td>{item.data[0].suatChieuId.showTime}</td>
                                                        <td> <NumberFormat
                                                            value={item.data[0].don_gia_ve}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={'VND'}
                                                        /></td>
                                                        <td>{item.data[0].so_luong_ve}</td>
                                                        <td>{item.data[0].ticketData.paymentData.ten_pttt}</td>
                                                        <td>{item.data[0].suatChieuId.theaterData.ten_rap}</td>
                                                        <td>
                                                            <button className='btn-cancel'
                                                                onClick={() => this.btnCancelTicket(item)}
                                                            ><i class="fas fa-window-close"></i></button>

                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>

                                </>
                                :
                                <div className='not-history'>Bạn chưa có giao dịch (đơn hàng) chưa thanh toán nào!</div>

                            }
                        </div>

                        <div className='title'><span>Các vé bạn không thanh toán</span></div>
                        <div className='history-ticket'>
                            {nonPayment && nonPayment.length > 0 ?
                                <>
                                    <table id='TableManageMovie'>

                                        <tbody>
                                            <tr>
                                                <th>Tên phim </th>
                                                <th>Ngày chiếu</th>
                                                <th>Suất chiếu</th>
                                                <th>Giá vé</th>
                                                <th>Số lượng</th>
                                                <th>Rạp</th>
                                            </tr>

                                            {nonPayment && nonPayment.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.data[0].suatChieuId.movieData.ten_phim}</td>
                                                        <td>{moment(new Date(Number(item.data[0].ticketData.ngay_ban))).format("DD/MM/YYYY")}</td>
                                                        <td>{item.data[0].suatChieuId.showTime}</td>
                                                        <td> <NumberFormat
                                                            value={item.data[0].don_gia_ve}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={'VND'}
                                                        /></td>
                                                        <td>{item.data[0].so_luong_ve}</td>
                                                        <td>{item.data[0].suatChieuId.theaterData.ten_rap}</td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>

                                </>
                                :
                                <div className='not-history'>Bạn chưa có giao dịch (đơn hàng) không thanh toán nào!</div>

                            }
                        </div>

                    </div>
                    <div className='content-right'>
                        {
                            this.state.isOpenModalEditMember &&
                            <ModalUpdateMember
                                isOpen={this.state.isOpenModalEditMember}
                                toggleFromParent={this.toggleMemberEditModal}
                                currentStaff={this.state.memberEdit}
                                editStaff={this.doEditMember}

                            />
                        }
                        <div className='title'>
                            <span>Thông tin chung</span>
                        </div >
                        <div className='member-action'>
                            <span><b>Xin chào {memberInfo.ten_tv},</b></span><br />
                            <span>Với trang này, bạn sẽ có thể xem và quản lý các thông tin hoặc giao dịch của mình.</span>
                            <div className='action-container'>

                                <div className='action'>
                                    <span>Cấp độ thẻ: </span><br></br>
                                    <span>U22</span>
                                </div>
                                <div className='action'>
                                    <span>Điểm tích lũy: </span><br></br>
                                    <span>{memberInfo.diem_dg} điểm</span>
                                </div>


                                <div className='action'>
                                    <span>Tổng chi tiêu: <NumberFormat
                                        value={total}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    /></span>
                                </div>
                            </div>

                        </div>
                        <div className='member-info'>
                            <span><b>THÔNG TIN TÀI KHOẢN</b></span><br /><hr />
                            <span>Tên thành viên: {memberInfo.ten_tv}</span><br />
                            <span>Ngày sinh: {moment(memberInfo.ngay_sinh).format("DD/MM/YYYY")}</span><br />
                            <span>Giới tính: {memberInfo.ten_tv === true ? 'Nam' : 'Nữ'}</span><br />
                            {/* <span>Loại thành viên: {memberInfo.loai_tv.ten_loai_tv}</span> */}
                            <span>Số điện thoại: {memberInfo.sdt}</span><br />
                            <span>Email: {memberInfo.email}</span><br />
                            <button type="button" class="btn btn-outline-secondary" onClick={() => this.handleEditMember(memberInfo)}>Thay đổi</button>
                        </div>


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyTickets));
