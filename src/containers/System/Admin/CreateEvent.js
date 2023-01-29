import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import './CreateEvent.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageEvent from './TableManageEvent';

class CreateEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewImgURL: '',
            isOpen: false,
            ten_km: '',
            thoi_gian_kt: '',
            giam_gia_hd: '',
            anh_event: ''
        }
    }

    async componentDidMount() {


    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }


    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                anh_event: base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveMovie = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        this.props.createNewEvent({
            ten_km: this.state.ten_km,
            thoi_gian_kt: this.state.thoi_gian_kt,
            giam_gia_hd: this.state.giam_gia_hd,
            anh_event: this.state.anh_event
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['ten_km', 'thoi_gian_kt', 'giam_gia_hd']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Bạn nhập vào thiếu ' + arrCheck[i])
                break;
            }
        }
        return isValid;
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


        let { ten_km, thoi_gian_kt, giam_gia_hd, anh_event } = this.state;

        return (
            <div className='user-redux-container'>
                <div className='title'>QUẢN LÝ SỰ KIỆN</div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='col-12'>Thêm sự kiện mới</div>
                        <div className='row'>
                            <div className='col-6'>
                                <label>Tên sự kiện:</label>
                                <input className='form-control' type='text'
                                    value={ten_km}
                                    onChange={(event) => { this.onChangeInput(event, 'ten_km') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label>Ngày kết thúc:</label>
                                <input className='form-control' type='date'
                                    value={thoi_gian_kt}
                                    onChange={(event) => { this.onChangeInput(event, 'thoi_gian_kt') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label>Giảm giá hóa đơn:</label>
                                <input className='form-control' type='text'
                                    value={giam_gia_hd}
                                    onChange={(event) => { this.onChangeInput(event, 'giam_gia_hd') }}
                                />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-6'>
                                <label>Ảnh sự kiện</label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnChangeImage(event)}></input>
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh<i className='fas fa-upload'></i></label>
                                    <div className='preview-poster'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >

                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3'><button className='btn btn-primary'
                                    onClick={() => this.handleSaveMovie()}
                                ><FormattedMessage id="menu.movie.btn" /></button></div>
                            </div>
                        </div>





                    </div>



                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />

                    }

                </div>
                <div>
                    <TableManageEvent />
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewEvent: (data) => dispatch(actions.createNewEvent(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
