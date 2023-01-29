import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './TableManageMovie.scss';
// import { getAllStaff, createNewStaffService, deleteStaffService, editStaffService } from '../../services/userServices'


class TableManageEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventRedux: [],

        }
    }

    componentDidMount() {
        this.props.fetchEventRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listEvent !== this.props.listEvent) {
            this.setState({
                eventRedux: this.props.listEvent
            })
        }
    }


    render() {
        let arrMovies = this.state.eventRedux;
        return (

            <table id='TableManageMovie'>
                <tbody>
                    <tr>
                        <th>Tên KM </th>
                        <th>Thời gian</th>
                        <th>Mã giảm giá</th>
                        <th>Số lượt SD</th>
                        <th>Giảm giá HĐ</th>
                        <th>Hành động</th>
                    </tr>

                    {arrMovies && arrMovies.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.ten_km}</td>
                                <td>{item.thoi_gian_kt}</td>
                                <td>{item.ma_giam_gia}</td>
                                <td>{item.so_luot_sd}</td>
                                <td>{item.giam_gia_hd}</td>
                                {/* <td>{item.poster}</td> */}
                                <td>
                                    <button className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                    <button className='btn-delete'><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    })
                    }




                </tbody>
            </table>

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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageEvent);
