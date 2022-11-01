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
            limit: 20,
            total: 10
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
        let response = await getLimitTicketService({
            limit: this.state.limit,
            page
        });
        if (response && response.errCode === 0) {
            this.setState({
                allTicket: response.data?.rows || [],
                ticketFilterList: response.data?.rows || [],
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
        // duyệt mảng nè 
        const newTicketList = this.state.allTicket.filter(item => {
            // tạo 1 obj info cho dễ tìm so sánh nè
            const ticketInfo = {
                id: item.id,
                id_tv: item.ticketData?.id_tv,
                ngay_ban: item.ticketData?.ngay_ban,
                ten_rap: item.seatId?.cinemaRoomData?.rapData?.ten_rap,
                movieId: item.suatChieuId?.movieId
            }

            return Object.keys(filtersQuery) // lấy mảng key nè
                    .filter(item => !!filtersQuery[item]) // bỏ các giá trị null với undefined nè nha
                    .every(key => filtersQuery[key] == ticketInfo[key]) // every trả về true nếu tất cả thành phần trong mảng đều true
        })

        // set state để rerender nè
        this.setState({
            ticketFilterList: newTicketList
        })
    }

    render() {
        let { ticketFilterList } = this.state;
        return (
            <div className='managhe-ticket-container'>
                <div className='title text-center'>QUẢN LÝ VÉ BÁN</div>
                <SearchData onSearch={(data) => this.handleFilterTicket(data)}/>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Mã vé</th>
                                <th>Mã TV</th>
                                <th>Tên ghế</th>
                                <th>Suất chiếu</th>
                                <th>Rạp</th>
                                <th>Phòng chiếu</th>
                                <th>Phim</th>
                                <th>Ngày chiếu</th>
                                {/* <th>Trạng thái vé</th> */}
                                <th>Giảm giá vé</th>
                                <th>Đơn giá vé</th>
                                <th>PTTT</th>
                                <th>Hành động</th>
                            </tr>

                            {ticketFilterList && ticketFilterList.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.ticketData.id_tv}</td>
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
                        <Pagination onChangePage={(page) => this.handleChangePage(page)} limit={this.state.limit} total={this.state.total} page={this.state.page} />
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
