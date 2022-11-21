import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ManageRevenueTicket.scss';
import { toast } from 'react-toastify';
// import { getAllStaff, createNewStaffService, deleteStaffService, editStaffService } from '../../services/userServices'
import { getRevenueByDate, getRevenueFoodByDate, getRevenueMovieService } from '../../../services/userServices';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import _ from 'lodash';
import NumberFormat from 'react-number-format';


class ManageRevenueTicket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            revenueDate: [],
            selectedValue: '',
            ngay_ban: '',
            last7: [],
            timeStart: moment().subtract(6, 'day').startOf('day'),
            timeEnd: moment().startOf('day'),
            listDay: [],
            revenueFood: [],
            revenueMovie: []
        }
    }

    async componentDidMount() {

        this.getArrDays()
        let response = await getRevenueMovieService();
        if (response && response.errCode === 0) {
            this.setState({
                revenueMovie: response.data ? response.data : [],

            })
        }

    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.timeStart !== this.state.timeStart || prevState.timeEnd !== this.state.timeEnd && this.state.timeEnd && this.state.timeStart) {
            await this.getArrDays()
        }

    }

    async getArrDays() {
        let timeStart = this.state.timeStart;
        let timeEnd = this.state.timeEnd;
        let totalDay = timeEnd.diff(timeStart, 'day')
        let dateList = []
        for (let i = 0; i <= totalDay; i++) {
            let dateClone = timeStart.clone()
            dateList.push(dateClone.add(i, 'day').unix() * 1000)
        }

        this.setState({
            listDay: dateList
        })


        console.log('dateClone', dateList);


        let arr7Days = []
        for (let i = 0; i < dateList.length; i++) {
            let response = await getRevenueByDate(dateList[i]);
            arr7Days.push(response)
        }
        this.setState({
            last7: arr7Days
        })
        console.log("arr7Days", arr7Days)

        let arrFood = []

        for (let i = 0; i < dateList.length; i++) {
            let response = await getRevenueFoodByDate(dateList[i]);
            arrFood.push(response)
        }
        this.setState({
            revenueFood: arrFood
        })
        console.log('arrFood', arrFood)
    }

    handleOnChangeDataPicker = (key, value) => {
        if (!isNaN(value[0])) {
            this.setState({
                [key]: moment(value[0])
            })
        }
        console.log('value', isNaN(
            value[0]))

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
        let { revenueDate, last7, timeStart, timeEnd, listDay, revenueFood, revenueMovie } = this.state;

        let revenue = revenueDate.reduce((total, item) => total + Number(item.ticketData[0].so_luong_ve) * Number(item.ticketData[0].don_gia_ve), 0);

        let arr = last7.filter(item => {
            return item.data.length > 0
        })

        let arrF = revenueFood.filter(item => {
            return item.data.length > 0
        })

        let totalTicket = arr.reduce((total, item) => total + Number(item.data[0].totalTicket), 0)
        let totalRevenueTicket = arr.reduce((total, item) => total + Number(item.data[0].total), 0)
        let totalRevenueFood = arrF.reduce((total, item) => total + Number(item.data[0].total), 0)
        let totalRevenueMovie = revenueMovie.reduce((total, item) => total + Number(item.total), 0)

        console.log('check revenueMovie', revenueMovie)

        return (
            <div className='manage-revenue-container'>
                {/* <div className='title'>QUẢN LÝ DOANH THU</div> */}
                <div className='manage-revenue-content'>

                    <div className='content-up'>
                        <div className='chart-name'>
                            <span>DOANH THU VÉ & BẮP NƯỚC</span>
                        </div>
                        <div className='content'>
                            <div className='content-left'>

                                <div className='search-data'>
                                    <div className='col-2'>
                                        <span>Ngày bắt đầu</span>
                                        <DatePicker
                                            onChange={(value) => this.handleOnChangeDataPicker('timeStart', value)}
                                            className='form-control'

                                        />
                                    </div>

                                    <div className='col-2'>
                                        <span>Ngày kết thúc</span>
                                        <DatePicker
                                            onChange={(value) => this.handleOnChangeDataPicker('timeEnd', value)}
                                            className='form-control'

                                        />
                                    </div>

                                </div>

                                <div className='chart'>
                                    <Bar
                                        data={{
                                            labels: listDay.map(item => moment(new Date(Number(item))).format("DD/MM"))

                                            // last7.map(day => {
                                            //     return day.data.map(item => moment(new Date(Number(item.ngay_ban))).format("DD/MM"))
                                            // })
                                            ,
                                            datasets: [
                                                {
                                                    label: 'Vé',
                                                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                                                    borderColor: 'rgb(0, 255, 0)',
                                                    borderWidth: 1,
                                                    barThickness: 40,
                                                    data: last7.map(revenue => {
                                                        return revenue.data.map(total => total.total)

                                                        // return revenue.data.map(ticket => {
                                                        //     return ticket.ticketData.reduce((total, item) => total + Number(item.so_luong_ve) * Number(item.don_gia_ve), 0)
                                                        // })
                                                    }
                                                    )

                                                },
                                                {
                                                    label: 'Bắp nước',
                                                    backgroundColor: 'rgb(239, 197, 120)',
                                                    borderColor: 'orange',
                                                    borderWidth: 1,
                                                    barThickness: 40,
                                                    data: revenueFood.map(revenue => {
                                                        return revenue.data.map(total => total.total)

                                                        // return revenue.data.map(ticket => {
                                                        //     return ticket.ticketData.reduce((total, item) => total + Number(item.so_luong_ve) * Number(item.don_gia_ve), 0)
                                                        // })
                                                    }
                                                    )

                                                }
                                            ]
                                        }}

                                        options={{
                                            plugins: {
                                                title: {
                                                    display: false,
                                                    text: "DOANH THU VÉ & BẮP NƯỚC",
                                                    color: 'red',
                                                    font: {

                                                        size: 30
                                                    }
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
                            <div className='content-right'>
                                <div className='total-ticket'>
                                    <span>Tổng số vé: <div className='number'>
                                        <span>{totalTicket}
                                        </span>
                                    </div>

                                    </span>
                                </div>
                                <div className='total-revenue-ticket'>
                                    <span>Tổng doanh thu vé:
                                        <div className='number'>
                                            <span>
                                                <NumberFormat
                                                    value={totalRevenueTicket}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                />
                                            </span>

                                        </div>
                                    </span>
                                </div>
                                <div className='total-revenue-food'>
                                    <span>Tổng doanh thu bắp nước: <div className='number'>
                                        <span> <NumberFormat
                                            value={totalRevenueFood}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                        />
                                        </span>
                                    </div>

                                    </span>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='content-mid'>
                        <div className='chart-name'>
                            <span>DOANH THU PHIM ĐANG CHIẾU</span>
                        </div>
                        <div className='content'>
                            <div className='content-left'>
                                <div className='chart-movie'>
                                    <Pie
                                        data={{
                                            labels: revenueMovie.map(item => {
                                                return item.ticketData.map(movie => movie.suatChieuId.movieData.ten_phim)
                                            })

                                            // last7.map(day => {
                                            //     return day.data.map(item => moment(new Date(Number(item.ngay_ban))).format("DD/MM"))
                                            // })
                                            ,
                                            datasets: [
                                                {
                                                    label: 'Doanh thu',
                                                    // backgroundColor: 'rgba(0, 255, 0, 0.2)',
                                                    // borderColor: 'rgb(0, 255, 0)',
                                                    backgroundColor: [
                                                        'rgba(255, 99, 132, 0.2)',
                                                        'rgba(54, 162, 235, 0.2)',
                                                        'rgba(255, 206, 86, 0.2)',
                                                        'rgba(75, 192, 192, 0.2)',
                                                        'rgba(153, 102, 255, 0.2)',
                                                        'rgba(255, 0, 0, 0.4)',
                                                    ],
                                                    borderWidth: 1,
                                                    barThickness: 60,
                                                    data: revenueMovie.map(item => item.total)

                                                }
                                            ]
                                        }}

                                        options={{
                                            plugins: {
                                                title: {
                                                    display: false,
                                                    text: "Doanh thu phim đang chiếu",

                                                    color: 'red',
                                                    font: {

                                                        size: 30
                                                    }


                                                },

                                                legend: {
                                                    align: 'start'
                                                }



                                            },
                                            // responsive: false

                                            // scales: {
                                            //     xAxes: [{
                                            //         barThickness: 4,  // number (pixels) or 'flex'
                                            //     }]
                                            // }
                                        }}
                                    />

                                </div>
                            </div>
                            <div className='content-right'>
                                {/* <div className='total-ticket'>
                                    <div className='number'>
                                        <span>
                                        </span>
                                    </div>

                                </div> */}
                                <div className='total-revenue-movie'>
                                    <span>Tổng doanh thu phim: <div className='number'>
                                        <span> <NumberFormat
                                            value={totalRevenueMovie}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                        />
                                        </span>
                                    </div>

                                    </span>

                                </div>
                                {/* <div className='total-revenue-food'>
                                    <div className='number'>
                                        <span>60
                                        </span>
                                    </div>

                                </div> */}
                            </div>
                        </div>


                    </div>
                </div>
            </div >
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
