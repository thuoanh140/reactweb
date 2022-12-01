import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Select from 'react-select';
import { getNowShowingService, getTheaterService, getProvinceService, getShowtimeByDate } from '../../../services/userServices'
import { toast } from 'react-toastify';
import DatePicker from '../../../components/Input/DatePicker';
import './Sell-Ticket.scss';
import ShowTime from './ShowTime';

class SellTicket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allNowShowing: [],
            currentDate: '',
            selectedMovie: {},
            listMovie: [],
            allTheater: [],
            allProvince: [],
            selectedProvince: {},
            selectedTheater: {},
            listProvince: [],
            listTheater: [],
            sdt: ''
        }
    }

    async componentDidMount() {
        let res = await getNowShowingService();
        if (res && res.errCode === 0) {
            this.setState({
                allNowShowing: res.data ? res.data : []
            })
        }
        let movieData = res.data;
        let dataSelect = this.buildDataInputSelectMovie(movieData);
        this.setState({
            listMovie: dataSelect
        })


        let response = await getProvinceService();
        if (response && response.errCode === 0) {
            this.setState({
                allProvince: response.data ? response.data : []
            })
        }
        let provinceData = response.data;
        let dataSelectProvince = this.buildDataInputSelectProvince(provinceData);
        this.setState({
            listProvince: dataSelectProvince
        })
    }

    handleOnChangeDataPicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    buildDataInputSelectMovie = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                // let labelProvince = `${item.ten_tinh}`;
                // object.label = labelProvince;
                object.label = `${item.ten_phim}`;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    handleChangeSelectMovie = async (selectedOption) => {
        this.setState({
            selectedMovie: selectedOption
        })
    }

    buildDataInputSelectProvince = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                // let labelProvince = `${item.ten_tinh}`;
                // object.label = labelProvince;
                object.label = `${item.ten_tinh}`;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }


    buildDataInputSelectTheater = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                // let labelProvince = `${item.ten_tinh}`;
                // object.label = labelProvince;
                object.label = `${item.ten_rap}`;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    handleChangeSelectProvince = async (selectedOption) => {
        this.setState({
            selectedProvince: selectedOption
        })
        let tinh_tpId = selectedOption.value;
        console.log('check province', tinh_tpId)
        let res = await getTheaterService(tinh_tpId);
        if (res && res.errCode === 0) {
            this.setState({
                allTheater: res.data ? res.data : [],

            })
        }
        console.log('check theater', res.data)
        let theaterData = res.data;
        console.log('check theaterData', theaterData)

        let dataSelect = this.buildDataInputSelectTheater(theaterData);
        this.setState({
            listTheater: dataSelect
        })

    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('check onChange', this.state)
        })
    }



    render() {
        let { allTheater, selectedMovie, selectedProvince, sdt } = this.state
        console.log('theater', allTheater)
        console.log('selectedMovie', selectedMovie.value)
        console.log('selectedProvince', selectedProvince)
        return (
            <div className='sell-ticket-component'>
                <div className='manage-showtimes-title'>
                    <span>HỆ THỐNG BÁN VÉ</span>
                </div>
                <div className='container'>
                    <div className='content-left'>
                        <div className='row'>

                            <div className='movie'>


                                <div className='col-10'>
                                    <label>Chọn Phim:</label>
                                    <Select
                                        value={this.state.selectedMovie}
                                        onChange={this.handleChangeSelectMovie}
                                        options={this.state.listMovie}
                                    />
                                </div>
                            </div>

                        </div>
                        <ShowTime showtimeIdFromParent={selectedMovie && selectedMovie.value ? selectedMovie.value : -1} />
                    </div>
                    <div className='content-right'>
                        <div className='row'>
                            <div className='customer'>
                                <div className='col-9'>
                                    <label>Khách hàng:</label>
                                    <input className='form-control' type='text'
                                        value={sdt}
                                        onChange={(event) => { this.onChangeInput(event, 'sdt') }}
                                    />
                                </div>
                                <div className='btn-add-new-customer'>
                                    <button className='btn btn-primary'>+ KH mới</button>
                                </div>

                            </div>



                        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(SellTicket);
