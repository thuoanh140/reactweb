import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './MyTickets.scss';
import * as actions from '../../../store/actions';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { withRouter } from 'react-router';
import { getTicketByIdTVService, getDetailTicketByIdTicketService, cancelTicket } from '../../../services/userServices'



class MyTickets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allTicket: [],
            allDetailTicket: [],


        }
    }

    async componentDidMount() {
        let userId = this.props.userInfo.id_tv;
        console.log('check u:', userId)
        let res = await getTicketByIdTVService(userId);
        if (res && res.errCode === 0) {
            this.setState({
                allTicket: res.data ? res.data : [],
            })
        }
        let ticket = res.data;
        // let response = await getDetailTicketByIdTicketService(ticket[0].id);
        // console.log('check response: ', response)
        console.log('check ticket:', res);
        console.log('check ticket abv:', ticket);
        let detailTicket = [];
        for (let i = 0; i < ticket.length; i++) {
            // ticket_id.push(res.data[i].id);
            // return ticket_id;
            let response = await getDetailTicketByIdTicketService(ticket[i].id);
            detailTicket.push(response)
            // if (response && response.errCode === 0) {
            //     this.setState({
            //         allDetailTicket: response.data ? response.data : [],
            //     })
            // }
            console.log('check response: ', response)
            console.log('check i', ticket[i].id)

        }
        console.log('check detailTicket:', detailTicket)
        this.setState({
            allDetailTicket: detailTicket
        })



    }

    btnCancelTicket = async (ticket) => {
        // this.setState({
        //     id: ticket.data[0].id
        // })
        let id = ticket.data[0].id;
        console.log('check id:', id)
        await cancelTicket(id);
    }


    render() {
        let { allDetailTicket } = this.state;
        // let movieDate = new Date(allDetailTicket[0].data[0].ticketData.ngay_ban);
        let today = moment().format("DD/MM/YYYY");
        // console.log('check movieDate:', movieDate);
        console.log('check today:', today);


        let historyTicket = allDetailTicket.filter(item => (moment(new Date(Number(item.data[0].ticketData.ngay_ban))).format("DD/MM/YYYY")) < today)
        let futureTicket = allDetailTicket.filter(item => (moment(new Date(Number(item.data[0].ticketData.ngay_ban))).format("DD/MM/YYYY")) >= today)
        console.log('checl historyTicket: ', historyTicket)
        console.log('checl futureTicket: ', futureTicket)
        console.log('checl allDetailTicket: ', allDetailTicket)
        return (
            <>
                <div className='title'><span>Các vé đã xem</span></div>

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
                <div className='title'>Các vé đang đợi xem</div>
                <table id='TableManageMovie'>
                    <tbody>
                        <tr>
                            <th>Tên phim </th>
                            <th>Ngày chiếu</th>
                            <th>Suất chiếu</th>
                            <th>Giá vé</th>
                            <th>Số lượng</th>
                            <th>Rạp</th>
                            <th>Hành động</th>
                        </tr>

                        {futureTicket && futureTicket.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.data[0].suatChieuId.movieData.ten_phim}</td>
                                    <td>{moment(new Date(Number(item.data[0].ticketData.ngay_ban))).format("DD/MM/YYYY")}</td>
                                    <td>{item.data[0].suatChieuId.showTime}</td>
                                    <td>{item.data[0].don_gia_ve}</td>
                                    <td>{item.data[0].so_luong_ve}</td>
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
