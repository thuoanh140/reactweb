import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageTicket.scss';



class ManageTicket extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

    getAllStaffFromReact = async () => {

    }





    render() {

        return (
            <div className='managhe-ticket-container'>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Họ tên</th>
                                <th>Ngày sinh</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th>Địa chỉ</th>
                                <th>Hành động</th>
                            </tr>

                            {/* {arrStaffs && arrStaffs.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.ten_nv}</td>
                                        <td>{item.ngay_sinh}</td>
                                        <td>{item.email}</td>
                                        <td>{item.sdt}</td>
                                        <td>{item.dia_chi}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditStaff(item)}><i className='fas fa-pencil-alt'></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteStaff(item)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            } */}
                        </tbody>
                    </table>
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
