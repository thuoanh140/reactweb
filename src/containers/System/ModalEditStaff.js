import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash';


class ModalEditStaff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            ten_nv: '',
            ngay_sinh: '',
            gioi_tinh: '',
            email: '',
            sdt: '',
            dia_chi: '',
            anh_dai_dien: ''
        }

    }



    componentDidMount() {
        let staff = this.props.currentStaff;
        if (staff && !_.isEmpty(staff)) {
            this.setState({
                id: staff.id,
                ten_nv: staff.ten_nv,
                ngay_sinh: staff.ngay_sinh,
                gioi_tinh: staff.gioi_tinh,
                email: staff.email,
                sdt: staff.sdt,
                dia_chi: staff.dia_chi,
                anh_dai_dien: staff.anh_dai_dien
            })
        }
        console.log('didmount edit modal', this.props.currentStaff)
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['ten_nv', 'ngay_sinh', 'email', 'sdt', 'gioi_tinh', 'dia_chi'];
        for (let i = 0; i < arrInput.length; i++) {
            console.log('check inside loop', this.state[arrInput[i]], arrInput[i])
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Bạn nhập còn thiếu ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveStaff = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editStaff(this.state);
        }

    }


    render() {
        console.log('check props from parent: ', this.props)
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-staff-container'}
                size="md">
                <ModalHeader toggle={() => { this.toggle() }}>Cập nhật thông tin nhân viên</ModalHeader>
                <ModalBody>
                    <div className='modal-staff-body'>
                        <div className='input-container'>
                            <label>Họ tên</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'ten_nv') }}
                                value={this.state.ten_nv} />
                        </div>
                        <div className='input-container'>
                            <label>Ngày sinh</label>
                            <input type='date' onChange={(event) => { this.handleOnChangeInput(event, 'ngay_sinh') }}
                                value={this.state.ngay_sinh} />
                        </div>


                        <div className='input-container'>
                            <label>Giới tính</label>
                            <select onChange={(event) => { this.handleOnChangeInput(event, 'gioi_tinh') }}
                                value={this.state.gioi_tinh}>
                                <option value={1}>Nam</option>
                                <option value={0}>Nữ</option>
                            </select>
                        </div>

                        <div className='input-container'>
                            <label>Số điện thoại</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'sdt') }}
                                value={this.state.sdt} disabled />
                        </div>

                        <div className='input-container max-width-input'>
                            <label>Email</label>
                            <input type='email' onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                value={this.state.email}
                                disabled />
                        </div>



                        {/* <div className='input-container'>
                            <label>Ảnh đại diện</label>
                            <input type='file' />
                        </div> */}

                        <div className='input-container max-width-input'>
                            <label>Địa chỉ</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'dia_chi') }}
                                value={this.state.dia_chi} />
                        </div>


                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleSaveStaff() }}>Lưu thay đổi</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Đóng</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditStaff);
