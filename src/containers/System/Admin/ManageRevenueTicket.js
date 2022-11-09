import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ManageRevenueTicket.scss';
import { toast } from 'react-toastify';
// import { getAllStaff, createNewStaffService, deleteStaffService, editStaffService } from '../../services/userServices'
import { getRevenueByDate } from '../../../services/userServices';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';


class ManageRevenueTicket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            revenueDate: [],
            selectedValue: '',
            ngay_ban: '',
            last7: []
        }
    }

    async componentDidMount() {
        function last7Days() {
            let today = new Date(moment(new Date()).format("YYYY/MM/DD")).getTime();
            let lastSevenDays = [today];
            let dateOffset;
            for (let i = 1; i < 7; i++) {
                dateOffset = (24 * 60 * 60 * 1000)
                dateOffset *= i;
                today = new Date(moment(new Date()).format("YYYY/MM/DD"));
                today.setTime(today.getTime() - dateOffset);
                lastSevenDays.push(today.getTime());
            }
            return lastSevenDays;
        }

        console.log(last7Days());

        let days = last7Days()
        let arr7Days = []
        for (let i = 0; i < days.length; i++) {
            let response = await getRevenueByDate(days[i]);
            arr7Days.push(response)
        }
        this.setState({
            last7: arr7Days
        })
        console.log("arr7Days", arr7Days)

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeDataPicker = (date) => {
        const momentTimeTmp = moment(date[0]).unix()
        this.handleChangeValue('ngay_ban', momentTimeTmp * 1000)
        // this.setState({
        //     // currentDate: date[0]
        // })
        console.log('momentTimeTmp', momentTimeTmp)
        console.log('onchange', date[0])
    }

    async handleChangeValue(key, value) {
        this.setState({
            selectedValue: { ...this.state.selectedValue, [key]: value }
        })

        let response = await getRevenueByDate(value);
        if (response && response.errCode === 0) {
            this.setState({
                revenueDate: response.data
            })
            console.log('check response', response)
        }
    }



    render() {
        let { revenueDate, last7 } = this.state;

        let revenue = revenueDate.reduce((total, item) => total + Number(item.ticketData[0].so_luong_ve) * Number(item.ticketData[0].don_gia_ve), 0);

        console.log('check last7', last7)

        return (
            <div className='manage-revenue-container'>
                <div className='manage-revenue-content'>
                    <div className='title'>QUẢN LÝ DOANH THU VÉ</div>
                    <div className='search-data'>
                        <div className='col-4'>
                            <span>Ngày chiếu</span>
                            <DatePicker
                                onChange={this.handleOnChangeDataPicker}
                                className='form-control'

                            />
                        </div>

                    </div>
                    <div className='chart'>
                        <Bar
                            data={{
                                labels: last7.map(day => {
                                    return day.data.map(item => moment(new Date(Number(item.ngay_ban))).format("DD/MM"))
                                }),
                                datasets: [
                                    {
                                        label: 'Doanh thu',
                                        backgroundColor: 'rgba(0, 255, 0, 0.2)',
                                        borderColor: 'rgb(0, 255, 0)',
                                        borderWidth: 1,
                                        barThickness: 40,
                                        data: last7.map(revenue => {

                                            return revenue.data.map(ticket => {
                                                return ticket.ticketData.reduce((total, item) => total + Number(item.so_luong_ve) * Number(item.don_gia_ve), 0)
                                            })
                                        }
                                        )

                                    }
                                ]
                            }}

                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Doanh thu 7 ngày gần nhất"
                                    },
                                },

                                scales: {
                                    xAxes: [{
                                        barThickness: 4,  // number (pixels) or 'flex'

                                    }]
                                }
                            }}
                        />

                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageRevenueTicket);
