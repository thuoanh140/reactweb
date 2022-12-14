import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageTicket.scss';
import { getAllTicketService, getLimitTicketService, deleteTicketService, cancelTicket, searchTicketService } from '../../../services/userServices'
import moment from 'moment';
import NumberFormat from 'react-number-format';
import SearchData from './SearchData';
import Pagination from '../../../components/pagination';


class ManageTicket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allTicket: [],
            result: [],
            ticketFilterList: [],
            page: 1,
            limit: 5,
            total: 0
        }
    }

    async componentDidMount() {
        await this.getAllTicket();
        var condition = {
            id: "85",
        };
        let response = await searchTicketService(condition);
        if (response && response.errCode === 0) {
            this.setState({
                result: response.data ? response.data : [],

            })
        }
        console.log('check result:', response)

    }

    getAllTicket = async (page) => {
        let response = await getAllTicketService();
        if (response && response.errCode === 0) {
            this.setState({
                allTicket: response.data || [],
                ticketFilterList: response.data || [],
                total: response.data?.count || 0
            })
        }
    }

    handleDeleteTicket = async (ticket) => {
        console.log('check onlick: ', ticket.id)
        try {
            let res = await deleteTicketService(ticket.id);
            if (res && res.errCode === 0) {
                await cancelTicket(ticket.id);
                await this.getAllTicket();
            } else {
                alert(res.errMessage);
            }

            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }

    async handleChangePage(page) {
        console.log(this.getAllTicket);
        await this.getAllTicket(page);
        this.setState({
            page
        })
    }

    handleFilterTicket(filtersQuery) {
        // duy???t m???ng n?? 
        const newTicketList = this.state.allTicket.filter(item => {
            // t???o 1 obj info cho d??? t??m so s??nh n??
            const ticketInfo = {
                id: item.id,
                sdt: item.ticketData?.sdtData?.sdt,
                ngay_ban: item.ticketData?.ngay_ban,
                ten_rap: item.seatId?.cinemaRoomData?.rapData?.ten_rap,
                movieId: item.suatChieuId?.movieId
            }

            return Object.keys(filtersQuery) // l???y m???ng key n??
                .filter(item => !!filtersQuery[item]) // b??? c??c gi?? tr??? null v???i undefined n?? nha
                .every(key => filtersQuery[key] == ticketInfo[key]) // every tr??? v??? true n???u t???t c??? th??nh ph???n trong m???ng ?????u true
        })

        console.log(newTicketList);
        // set state ????? rerender n??
        this.setState({
            page: 1,
            ticketFilterList: newTicketList
        })
    }

    render() {
        let { ticketFilterList, allTicket } = this.state;
        console.log('check ticketFilterList', ticketFilterList)
        return (
            <div className='managhe-ticket-container'>
                <div className='title text-center'>QU???N L?? V?? B??N</div>
                <SearchData onSearch={(data) => this.handleFilterTicket(data)} />
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>M?? v??</th>
                                <th>S??T</th>
                                <th>T??n gh???</th>
                                <th>Su???t chi???u</th>
                                <th>R???p</th>
                                <th>Ph??ng chi???u</th>
                                <th>Phim</th>
                                <th>Ng??y chi???u</th>
                                {/* <th>Tr???ng th??i v??</th> */}
                                <th>Gi???m gi?? v??</th>
                                <th>????n gi?? v??</th>
                                <th>PTTT</th>
                                <th>H??nh ?????ng</th>
                            </tr>

                            {ticketFilterList && ticketFilterList.slice((this.state.page - 1) * this.state.limit, this.state.page * this.state.limit).map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.ticketData.sdtData.sdt}</td>
                                        <td>{item.seatId.ten_ghe}</td>
                                        <td>{item.suatChieuId.showTime}</td>
                                        <td>{item.seatId.cinemaRoomData.rapData.ten_rap}</td>
                                        <td>Cinema {item.seatId.cinemaRoomData.so_phong}</td>
                                        <td>{item.suatChieuId.movieData.ten_phim}</td>
                                        <td>{moment(new Date(Number(item.ticketData.ngay_ban))).format("DD/MM/YYYY")}</td>
                                        {/* <td>{item.ticketData.trang_thai_ve}</td> */}
                                        <td>{item.ticketData.giam_gia_ve}</td>
                                        <td><NumberFormat
                                            value={item.don_gia_ve}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                        /></td>
                                        <td>{item.ticketData.paymentData.ten_pttt}</td>
                                        <td>
                                            {/* <button className='btn-edit' onClick={() => this.handleEditStaff(item)}><i className='fas fa-pencil-alt'></i></button> */}
                                            <button className='btn-delete' onClick={() => this.handleDeleteTicket(item)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                    <div className='row p-2'>
                        <Pagination onChangePage={(page) => this.setState({ page })} limit={this.state.limit} total={this.state.ticketFilterList.length} page={this.state.page} />
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTicket);
