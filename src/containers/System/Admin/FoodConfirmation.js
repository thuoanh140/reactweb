import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './TableManageMovie.scss';
import { confirmBillFood, getBillFoodUnpaidService, getDetailBillFoodByIdBillFoodService } from '../../../services/userServices'
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import SearchFoodUnpaid from './SearchTicketUnpaid';


class FoodConfirmation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allBillFoodUnPaid: [],
            allDetailBillFoodUnpaid: [],
            foodFilterList: []

        }
    }

    async componentDidMount() {
        setTimeout(() => this.getBillFood(), 0)
    }

    async getBillFood() {
        let res = await getBillFoodUnpaidService();
        if (res && res.errCode === 0) {
            this.setState({
                allBillFoodUnPaid: res.data ? res.data : [],

            })

        }
        let billFoodUnpaid = res.data;
        let detailBillFoodUnpaid = [];
        for (let i = 0; i < billFoodUnpaid.length; i++) {
            let response = await getDetailBillFoodByIdBillFoodService(billFoodUnpaid[i].id);
            detailBillFoodUnpaid.push(response)
        }

        console.log('detailBillFoodUnpaid', detailBillFoodUnpaid)


        let abc = detailBillFoodUnpaid.map(item => {
            return item.data
        })
        console.log('abc', abc)
        this.setState({
            allDetailBillFoodUnpaid: detailBillFoodUnpaid,
            foodFilterList: abc
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    btnCofirmBillFood = async (ticket) => {

        let id = ticket.data[0].id;
        console.log('check id:', id)
        let res = await confirmBillFood(id);
        if (res && res.errCode === 0) {
            toast.success('Xác nhận hóa đơn món thành công!')
        }
        else (
            toast.error('Xác nhận hóa đơn món thất bại!')
        )
        await this.getBillFood()
    }

    handleFilterTicket(filtersQuery) {
        let { allDetailBillFoodUnpaid } = this.state;

        // duyệt mảng nè 
        const newTicketList = allDetailBillFoodUnpaid.map(i => {
            return i.data.filter(item => {
                const ticketInfo = {
                    sdt: item.hoadonId?.sdtFood?.sdt,
                    ngay_ban: item.hoadonId?.ngay_ban,
                }

                return Object.keys(filtersQuery) // lấy mảng key nè
                    .filter(item => !!filtersQuery[item]) // bỏ các giá trị null với undefined nè nha
                    .every(key => filtersQuery[key] == ticketInfo[key]) // every trả về true nếu tất cả thành phần trong mảng đều true
            })


        })
        console.log('newTicketList', newTicketList)

        let listFilter = newTicketList.filter(item => {
            return item.length > 0
        })
        console.log(listFilter);
        // set state để rerender nè
        this.setState({
            foodFilterList: listFilter
        })
    }


    render() {
        let { allBillFoodUnPaid, allDetailBillFoodUnpaid, foodFilterList } = this.state;
        console.log('allDetailTicketUnpaid', allDetailBillFoodUnpaid);
        console.log('foodFilterList ', foodFilterList);

        return (
            <>
                <div className='title'> XÁC NHẬN MÓN

                </div>
                <SearchFoodUnpaid onSearch={(data) => this.handleFilterTicket(data)} />
                {foodFilterList && foodFilterList.length > 0 ?
                    <>
                        <table id='TableManageMovie'>

                            <tbody>
                                <tr>
                                    <th>Tên món </th>
                                    <th>Ngày lấy</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>SĐT</th>
                                    <th>Xác nhận</th>
                                </tr>
                                {foodFilterList && foodFilterList.map(item => {
                                    return item.map((i, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{i.foodData.ten_ta}</td>
                                                <td>{moment(new Date(Number(i.hoadonId.ngay_ban))).format("DD/MM/YYYY")}</td>
                                                <td> <NumberFormat
                                                    value={i.don_gia}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                /></td>
                                                <td>{i.so_luong}</td>
                                                <td>{i.hoadonId.sdtFood.sdt}</td>
                                                <td>
                                                    <button className='btn-cancel'
                                                        onClick={() => this.btnCofirmBillFood(item)}
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
                    <div className='not-history'>Hiện không có hóa đơn món chờ xác nhận!</div>

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

export default connect(mapStateToProps, mapDispatchToProps)(FoodConfirmation);
