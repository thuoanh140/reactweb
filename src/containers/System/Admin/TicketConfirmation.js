import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './TicketConfirmation.scss';
import { getTicketUnpaidService, getDetailTicketByIdTicketService, confirmTicket } from '../../../services/userServices'
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import DatePicker from '../../../components/Input/DatePicker';
import SearchTicketUnpaid from './SearchTicketUnpaid';


class TicketConfirmation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allTicketUnPaid: [],
            allDetailTicketUnpaid: [],
            ticketFilterList: []

        }
    }

    async componentDidMount() {
        setTimeout(() => this.getTicket(), 0)
    }

    async getTicket() {
        let res = await getTicketUnpaidService();
        if (res && res.errCode === 0) {
            this.setState({
                allTicketUnPaid: res.data ? res.data : [],

            })

        }
        let ticketUnpaid = res.data;
        let detailTicketUnpaid = [];
        for (let i = 0; i < ticketUnpaid.length; i++) {
            let response = await getDetailTicketByIdTicketService(ticketUnpaid[i].id);
            detailTicketUnpaid.push(response)
        }
        let today = moment().unix();
        let todayCompare = today * 1000;
        let ticket = detailTicketUnpaid.filter(item => new Date(Number(item.data[0].ticketData.ngay_ban)).setHours(Number((item.data[0].suatChieuId.showTime).slice(0, 2))) >= todayCompare)
        let abc = ticket.map(item => {
            return item.data
        })
        this.setState({
            allDetailTicketUnpaid: detailTicketUnpaid,
            ticketFilterList: abc
        })






    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    btnCofirmTicket = async (ticket) => {

        let id = ticket.id;
        console.log('check id:', id)
        let res = await confirmTicket(id);
        if (res && res.errCode === 0) {
            toast.success('Xác nhận vé thành công!')
        }
        else (
            toast.error('Xác nhận vé thất bại!')
        )
        await this.getTicket()
    }

    handleOnChangeDataPicker = (date) => {
        const momentTimeTmp = moment(date[0]).unix()
        this.handleChangeValue('ngay_ban', momentTimeTmp * 1000)
        // this.setState({
        //     // currentDate: date[0]
        // })
    }

    handleChangeValue(key, value) {
        this.setState({
            selectedValue: { ...this.state.selectedValue, [key]: value }
        })
    }

    handleSearchData(data) {
        // console.log(this.props);
        this.props?.onSearch?.(data || this.state.selectedValue)
    }

    handleFilterTicket(filtersQuery) {
        let { allDetailTicketUnpaid } = this.state;
        let today = moment().unix();
        let todayCompare = today * 1000;
        let ticket = allDetailTicketUnpaid.filter(item => new Date(Number(item.data[0].ticketData.ngay_ban)).setHours(Number((item.data[0].suatChieuId.showTime).slice(0, 2))) >= todayCompare)
        // duyệt mảng nè 
        const newTicketList = ticket.map(i => {
            return i.data.filter(item => {
                const ticketInfo = {
                    sdt: item.ticketData?.sdtData?.sdt,
                    ngay_ban: item.ticketData?.ngay_ban,
                }

                return Object.keys(filtersQuery) // lấy mảng key nè
                    .filter(item => !!filtersQuery[item]) // bỏ các giá trị null với undefined nè nha
                    .every(key => filtersQuery[key] == ticketInfo[key]) // every trả về true nếu tất cả thành phần trong mảng đều true
            })


        })


        let listFilter = newTicketList.filter(item => {
            return item.length > 0
        })
        console.log(listFilter);
        // set state để rerender nè
        this.setState({
            ticketFilterList: listFilter
        })
    }

    render() {
        let { allTicketUnPaid, allDetailTicketUnpaid, ticketFilterList } = this.state;
        console.log('allTicketUnPaid', allTicketUnPaid);
        console.log('ticketFilterList', ticketFilterList);


        let today = moment().unix();
        let todayCompare = today * 1000;
        // let ticket = object.map(i => {
        //     return i.filter(item => new Date(Number(item.date)).setHours(Number((item.showTime).slice(0, 2))) >= todayCompare)
        // })






        return (
            <>
                <div className='title'> XÁC NHẬN VÉ

                </div>
                <SearchTicketUnpaid onSearch={(data) => this.handleFilterTicket(data)} />
                {ticketFilterList && ticketFilterList.length > 0 ?
                    <>
                        <table id='TableManageMovie'>

                            <tbody>
                                <tr>
                                    <th>Tên phim </th>
                                    <th>Ngày chiếu</th>
                                    <th>Suất chiếu</th>
                                    <th>Giá vé</th>
                                    <th>Số lượng</th>
                                    <th>Ghế</th>
                                    <th>Phòng chiếu</th>
                                    <th>SĐT</th>
                                    <th>Rạp</th>
                                    <th>Xác nhận</th>
                                </tr>



                                {ticketFilterList && ticketFilterList.length > 0 && ticketFilterList.map(item => {
                                    return item.map((i, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{i.suatChieuId.movieData.ten_phim}</td>
                                                <td>{moment(new Date(Number(i.ticketData.ngay_ban))).format("DD/MM/YYYY")}</td>
                                                <td>{i.suatChieuId.showTime}</td>
                                                <td> <NumberFormat
                                                    value={i.don_gia_ve}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                /></td>
                                                <td>{i.so_luong_ve}</td>
                                                <td>{i.seatId.ten_ghe}</td>
                                                <td>{i.seatId.cinemaRoomData.so_phong}</td>
                                                <td>{i.ticketData.sdtData.sdt}</td>
                                                <td>{i.suatChieuId.theaterData.ten_rap}</td>
                                                <td>
                                                    <button className='btn-cancel'
                                                        onClick={() => this.btnCofirmTicket(i)}
                                                    ><i class="fas fa-check-circle"></i></button>

                                                </td>
                                            </tr>
                                        )

                                    })
                                })
                                }
                            </tbody>
                        </table>

                    </>
                    :
                    <div className='not-history'>Hiện không có vé chờ xác nhận!</div>

                }


            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listEvent: state.admin.eventData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchEventRedux: () => dispatch(actions.fetchEvent()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketConfirmation);
