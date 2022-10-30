import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './SearchData.scss';
import { getAllStaff,getAllTicketService, getNowShowingService, getTheaterService } from '../../../services/userServices'
import moment from 'moment';
import NumberFormat from 'react-number-format';
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';

import * as actions from '../../../store/actions'


class SearchData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNowShowing: [],
            arrStaffs: [],
            arrTheater: [],
            selectedValue: {}
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.nowShowingRedux !== this.props.nowShowingRedux) {
            this.setState({
                arrNowShowing: this.props.nowShowingRedux,
            })
        }
    }

    async componentDidMount() {
        this.props.loadNowShowing();
        this.getAllStaffFromReact();
        this.getTheater();
    }

    getAllStaffFromReact = async () => {
        let response = await getAllStaff('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrStaffs: response.staffs
            })
        }
    }

    getTheater = async () => {
        let response = await getTheaterService();
        if (response && response.errCode === 0) {
            this.setState({
                arrTheater: response.data
            })
        }
    }

    handleOnChangeDataPicker = (date) => {
        const momentTimeTmp =  moment(date[0]).unix()
        this.handleChangeValue('ngay_ban', momentTimeTmp * 1000)
        // this.setState({
        //     // currentDate: date[0]
        // })
    }

    handleChangeValue(key, value) {
        this.setState({
            selectedValue: { ...this.state.selectedValue, [key]: value}
        })
    }

    handleSearchData() {
        // console.log(this.props);
        this.props?.onSearch?.(this.state.selectedValue)
    }

    render() {

        const movieOptions = this.state.arrNowShowing.map(item => ({value: item.id, label: item.ten_phim }))
        // const userOptions = this.state.arrStaffs.map(item => ({value: item.id, label: item.id }))
        const theaterOptions = this.state.arrTheater.map(item => ({value: item.id, label: item.ten_rap }))

        return (
            <div className='search-data-container'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-4'>
                            <span>Mã vé</span>
                            <input className="form-control" onChange={e => this.handleChangeValue('id', e.target.value)}/>
                        </div>
                        <div className='col-4'>
                            <span>Mã thành viên</span>
                            <input className="form-control" onChange={e => this.handleChangeValue('id_tv', e.target.value)}/>
                        </div>
                        <div className='col-4'>
                            <span>Ngày chiếu</span>
                            <DatePicker
                                onChange={this.handleOnChangeDataPicker}
                                className='form-control'
                            // value={this.state.currentDate[0]}
                            // minDate={new Date()}
                            />
                        </div>
                        <div className='col-6'>
                            <span>Rạp</span>
                            <Select options={theaterOptions} onChange={value => this.handleChangeValue('ten_rap', value.label)}/>
                        </div>
                        <div className='col-6'>
                            <span>Phim</span>
                            <Select options={movieOptions} onChange={value => this.handleChangeValue('movieId', value.value)}/>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <button className='col-3 btn btn-primary search' onClick={() => this.handleSearchData()}>Tìm kiếm</button>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        nowShowingRedux: state.admin.nowShowing
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadNowShowing: () => dispatch(actions.fetchNowShowing())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchData);
