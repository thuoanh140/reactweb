import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllStaff, createNewStaffService, deleteStaffService, editStaffService } from '../../services/userServices'
import ModalStaff from './ModalStaff';
import ModalEditStaff from './ModalEditStaff';
import { emitter } from '../../utils/emitter'

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrStaffs: [],
            isOpenModalStaff: false,
            isOpenModalEditStaff: false,
            staffEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllStaffFromReact();
    }

    getAllStaffFromReact = async () => {
        let response = await getAllStaff('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrStaffs: response.staffs
            })
        }
    }

    handleAddNewStaff = () => {
        this.setState({
            isOpenModalStaff: true,
        })
    }

    toggleStaffModal = () => {
        this.setState({
            isOpenModalStaff: !this.state.isOpenModalStaff,
        })
    }

    toggleStaffEditModal = () => {
        this.setState({
            isOpenModalEditStaff: !this.state.isOpenModalEditStaff,
        })
    }

    createNewStaff = async (data) => {
        try {
            let response = await createNewStaffService(data);
            console.log('response create staff', response)
            if (response && response.errCode !== 0) {
                alert(response.Message);
            } else {
                await this.getAllStaffFromReact();
                this.setState({
                    isOpenModalStaff: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteStaff = async (staff) => {
        try {
            let res = await deleteStaffService(staff.id);
            if (res && res.errCode === 0) {
                await this.getAllStaffFromReact();
            } else {
                alert(res.errMessage);
            }

            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }

    handleEditStaff = (staff) => {
        console.log('check edit staff', staff);
        this.setState({
            isOpenModalEditStaff: true,
            staffEdit: staff
        })
    }

    doEditStaff = async (staff) => {

        console.log('click save staff: ', staff);
        let res = await editStaffService(staff);
        // try {
        //     let res = await editStaffService(staff);
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             isOpenModalEditStaff: false
        //         })
        //         await this.getAllStaffFromReact();
        //     } else {
        //         alert(res.errCode);
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    }

    render() {
        console.log('check render', this.state)
        let arrStaffs = this.state.arrStaffs;
        return (
            <div className="users-containers">
                <ModalStaff
                    isOpen={this.state.isOpenModalStaff}
                    toggleFromParent={this.toggleStaffModal}
                    createNewStaff={this.createNewStaff}
                />
                {
                    this.state.isOpenModalEditStaff &&
                    <ModalEditStaff
                        isOpen={this.state.isOpenModalEditStaff}
                        toggleFromParent={this.toggleStaffEditModal}
                        currentStaff={this.state.staffEdit}
                        editStaff={this.doEditStaff}

                    />
                }
                <div className='title text-center'>QUẢN LÝ NHÂN VIÊN</div>
                <div className='mx-1'>
                    <button className='btn btn-primary btn-lg px-3'
                        onClick={() => this.handleAddNewStaff()}><i className='fas fa-plus'></i>  Thêm nhân viên</button>
                </div>
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

                            {arrStaffs && arrStaffs.map((item, index) => {
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
                            }
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
