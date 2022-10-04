import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageShowtimes.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions'

class ManageShowtimes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listProvince: [],
            listTheater: [],
            listCinemaRoom: []
        }
    }

    componentDidMount() {
        this.props.fetchAllProvince();
        this.props.fetchAllTheater();
        this.props.fetchAllCinemaRoom();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allProvince !== this.props.allProvince) {
            let dataSelect = this.buildDataInputSelectProvince(this.props.allProvince);
            this.setState({
                listProvince: dataSelect
            })
        }

        if (prevProps.allTheater !== this.props.allTheater) {
            let dataSelect = this.buildDataInputSelectTheater(this.props.allTheater);
            this.setState({
                listTheater: dataSelect
            })
        }

        if (prevProps.allCinemaRoom !== this.props.allCinemaRoom) {
            let dataSelect = this.buildDataInputSelectCinemaRoom(this.props.allCinemaRoom);
            this.setState({
                listCinemaRoom: dataSelect
            })
        }
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

    buildDataInputSelectCinemaRoom = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                // let labelProvince = `${item.ten_tinh}`;
                // object.label = labelProvince;
                object.label = `${item.so_phong}`;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }



    render() {
        console.log('danh sach tinh/tp', this.props.allProvince);
        console.log('danh sach rap', this.props.allTheater);
        console.log('danh sach phong chieu', this.props.allCinemaRoom);
        return (
            <div className='manage-showtimes-container'>
                <div className='manage-showtimes-title'>
                    <span>Quản lý suất chiếu</span>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Chọn Tỉnh/TP:</label>
                            <Select
                                // value={this.state.selectedOption}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listProvince}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn Rạp:</label>
                            <Select
                                // value={this.state.selectedOption}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listTheater}
                            />
                        </div>
                        <div className='col-6'>
                            <label>Chọn Phòng:</label>
                            <Select
                                // value={this.state.selectedOption}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listCinemaRoom}
                            />
                        </div>
                        <div className='col-6'>
                            <label>Chọn ngày:</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-12 pick-showtimes-container'>

                        </div>
                        <button className='col-4 btn btn-primary'>Lưu suất chiếu</button>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.admin.language,
        allProvince: state.admin.province,
        allTheater: state.admin.theater,
        allCinemaRoom: state.admin.cinemaRoom
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProvince: () => dispatch(actions.fetchProvinceStart()),
        fetchAllTheater: () => dispatch(actions.fetchTheaterStart()),
        fetchAllCinemaRoom: () => dispatch(actions.fetchCinemaRoomStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageShowtimes);