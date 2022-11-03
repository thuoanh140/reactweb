import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter } from '../../../utils/emitter';
import _ from 'lodash';


class ModalReportRating extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            noi_dung_comment: '',
            noi_dung: '',
            id_tv: '',
            userId: this.props.userId,
            ten_tv: this.props.ten_tv

        }
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            //reset state
            this.setState({
                id: '',
                noi_dung_comment: '',
                noi_dung: '',
                id_tv: '',
                userId: this.props.userId
            })
        })
    }

    componentDidMount() {
        let reportInfo = this.props.report;
        if (reportInfo && !_.isEmpty(reportInfo)) {
            this.setState({
                id: reportInfo.id,
                noi_dung_comment: reportInfo.noi_dung

            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }



    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('check onChange', this.state)
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['noi_dung'];
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

    handleAddReport = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewReport({
                noi_dung: this.state.noi_dung,
                id_dg: this.state.id,
                id_tv: this.state.userId
            });
        }
        console.log('check add', this.state.userId)

    }


    render() {
        console.log('check add', this.state.userId)
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-staff-container'}
                size="md">
                <ModalHeader toggle={() => { this.toggle() }}>Báo xấu bình luận</ModalHeader>
                <ModalBody>
                    <div className='modal-staff-body'>
                        <div className='input-container'>
                            <label>Tên người bình luận:</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'ten_tv') }}
                                value={this.state.ten_tv}
                                disabled />
                        </div>


                        <div className='input-container'>
                            <label>Nội dung bình luận</label>
                            <textarea type='text' onChange={(event) => { this.handleOnChangeInput(event, 'noi_dung_comment') }}
                                value={this.state.noi_dung_comment}
                                disabled />
                        </div>
                        <div className='input-container'>
                            <label>Lý do báo xấu:</label>
                            <textarea type='text' onChange={(event) => { this.handleOnChangeInput(event, 'noi_dung') }}

                                value={this.state.noi_dung}
                            />
                        </div>


                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleAddReport() }}>Thêm</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalReportRating);
