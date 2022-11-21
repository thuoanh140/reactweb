import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ManageRevenueFood.scss';
import { toast } from 'react-toastify';
// import { getAllStaff, createNewStaffService, deleteStaffService, editStaffService } from '../../services/userServices'
import { getRevenueTheaterService, getRevenueTheaterByDate } from '../../../services/userServices';
import DatePicker from '../../../components/Input/DatePicker';
import { Bar } from "react-chartjs-2";
import moment from 'moment';
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import NumberFormat from 'react-number-format';


class ManageRevenueFood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            revenueTheater: [],
            timeStart: moment().subtract(6, 'day').startOf('day'),
            timeEnd: moment().startOf('day'),
            listDay: [],
            revenueDaysTheater: []
        }
    }

    async componentDidMount() {

        this.getRevenueTheater()

    }





    async getRevenueTheater() {
        let response = await getRevenueTheaterService();
        if (response && response.errCode === 0) {
            this.setState({
                revenueTheater: response.data ? response.data : [],

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
            let response = await getRevenueTheaterByDate(dateList[i]);
            arr7Days.push(response)
        }
        this.setState({
            revenueDaysTheater: arr7Days
        })
        console.log("arr7Days", arr7Days)

    }

    handleOnChangeDataPicker = (key, value) => {
        if (!isNaN(value[0])) {
            this.setState({
                [key]: moment(value[0])
            })
        }
        console.log('value', isNaN(
            value[0]))

        this.getArrDays()

    }




    render() {
        let { revenueTheater, revenueDaysTheater } = this.state;
        console.log('check ', revenueTheater)
        console.log('check revenueDaysTheater', revenueDaysTheater)

        let arr = revenueDaysTheater.filter(item => {
            return item.data.length > 0
        })

        console.log('arr', arr)

        let revenueThuDuc = arr.map(item => {
            return item.data.filter(data => {
                return data.ticketData[0].suatChieuId.theaterData.ten_rap === 'On Cinema Thủ Đức'
            })
            // return item.data.ticketData.suatChieuId.theaterData.ten_rap === 'On Cinema Thủ Đức'
        })
        let revenueThuDucClean = revenueThuDuc.filter(item => {
            return item.length > 0
        })

        let revenueGoVap = arr.map(item => {
            return item.data.filter(data => {
                return data.ticketData[0].suatChieuId.theaterData.ten_rap === 'On Cinema Gò Vấp'
            })
            // return item.data.ticketData.suatChieuId.theaterData.ten_rap === 'On Cinema Thủ Đức'
        })
        let revenueGoVapClean = revenueGoVap.filter(item => {
            return item.length > 0
        })

        let revenueNinhKieu = arr.map(item => {
            return item.data.filter(data => {
                return data.ticketData[0].suatChieuId.theaterData.ten_rap === 'On Cinema Ninh Kiều'
            })
            // return item.data.ticketData.suatChieuId.theaterData.ten_rap === 'On Cinema Thủ Đức'
        })
        let revenueNinhKieuClean = revenueNinhKieu.filter(item => {
            return item.length > 0
        })



        let thuduc = revenueThuDucClean && revenueThuDucClean.length > 0 ? revenueThuDucClean.reduce((total, item) => total + Number(item[0].total), 0) : 0
        let govap = revenueGoVapClean && revenueGoVapClean.length > 0 ? revenueGoVapClean.reduce((total, item) => total + Number(item[0].total), 0) : 0
        let ninhkieu = revenueNinhKieuClean && revenueNinhKieuClean.length > 0 ? revenueNinhKieuClean.reduce((total, item) => total + Number(item[0].total), 0) : 0
        console.log('thu duc', thuduc)
        console.log('revenueThuDucClean', revenueThuDucClean)
        let totalTicket = revenueTheater.reduce((total, item) => total + Number(item.totalTicket), 0)
        let totalRevenueTicket = revenueTheater.reduce((total, item) => total + Number(item.total), 0)
        return (
            <div className='manage-revenue-movie-container'>
                <div className='manage-revenue-movie-content'>
                    <div className='content-up'>
                        <div className='chart-name'>
                            <span>DOANH THU TỔNG</span>
                        </div>
                        <div className='content'>
                            <div className='content-left'>


                                <div className='chart'>
                                    <Bar
                                        data={{
                                            labels: revenueTheater.map(item => {
                                                return item.ticketData.map(theater => theater.suatChieuId.theaterData.ten_rap)
                                            })

                                            // last7.map(day => {
                                            //     return day.data.map(item => moment(new Date(Number(item.ngay_ban))).format("DD/MM"))
                                            // })
                                            ,
                                            datasets: [
                                                {
                                                    label: 'Doanh thu',
                                                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                                                    borderColor: 'rgb(0, 255, 0)',
                                                    borderWidth: 1,
                                                    barThickness: 40,
                                                    data: revenueTheater.map(item => item.total)

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
                                        <span>
                                            {/* <NumberFormat
                                            value={totalRevenueFood}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                        /> */}
                                        </span>
                                    </div>

                                    </span>

                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='content-down'>
                        <div className='chart-name'>
                            <span>DOANH THU THEO NGÀY</span>
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
                                            labels: [
                                                'Thủ Đức',
                                                "Gò Vấp",
                                                'Ninh Kiều'
                                            ]

                                            // last7.map(day => {
                                            //     return day.data.map(item => moment(new Date(Number(item.ngay_ban))).format("DD/MM"))
                                            // })
                                            ,
                                            datasets: [
                                                {
                                                    label: 'Doanh thu',
                                                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                                                    borderColor: 'rgb(0, 255, 0)',
                                                    borderWidth: 1,
                                                    barThickness: 40,
                                                    data: [
                                                        thuduc,
                                                        govap,
                                                        ninhkieu
                                                    ]

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
                                        <span>
                                        </span>
                                    </div>

                                    </span>
                                </div>
                                <div className='total-revenue-ticket'>
                                    <span>Tổng doanh thu vé:
                                        <div className='number'>
                                            <span>
                                                {/* <NumberFormat
                                                    value={totalRevenueTicket}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                /> */}
                                            </span>

                                        </div>
                                    </span>
                                </div>
                                <div className='total-revenue-food'>
                                    <span>Tổng doanh thu bắp nước: <div className='number'>
                                        <span>
                                            {/* <NumberFormat
                                            value={totalRevenueFood}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                        /> */}
                                        </span>
                                    </div>

                                    </span>

                                </div>
                            </div>
                        </div>

                    </div>

                    {/* <div className='chart-movie'>
                        <Bar
                            data={{
                                labels: revenueTheater.map(item => {
                                    return item.ticketData.map(theater => theater.suatChieuId.theaterData.ten_rap)
                                })
                                ,
                                datasets: [
                                    {
                                        label: 'Doanh thu',
                                        backgroundColor:
                                            'rgba(54, 162, 235, 0.2)',

                                        borderWidth: 1,
                                        barThickness: 60,
                                        data: revenueTheater.map(item => item.total)

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



                                },

                                // scales: {
                                //     xAxes: [{
                                //         barThickness: 4,  // number (pixels) or 'flex'
                                //     }]
                                // }
                            }}
                        />

                    </div> */}
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
