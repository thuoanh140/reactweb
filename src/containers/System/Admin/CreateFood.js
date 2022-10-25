import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import './CreateFood.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class CreateFood extends Component {

    constructor(props) {
        super(props);
        this.state = {

            previewImgURL: '',
            isOpen: false,
            ten_ta: '',
            gia: '',
            so_luong: '',
            ghi_chu: '',
            anh: ''

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
                anh: base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveFood = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        this.props.createNewFood({
            ten_ta: this.state.ten_ta,
            gia: this.state.gia,
            so_luong: this.state.so_luong,
            ghi_chu: this.state.ghi_chu,
            anh: this.state.anh
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['ten_ta', 'gia', 'so_luong']
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
        let { ten_ta, gia, so_luong, ghi_chu, anh } = this.state;

        return (
            <div className='user-redux-container'>
                <div className='title'>QUẢN LÝ THỨC ĂN</div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='col-12'>Thêm thức ăn</div>
                        <div className='row'>
                            <div className='col-6'>
                                <label>Tên thức ăn:</label>
                                <input className='form-control' type='text'
                                    value={ten_ta}
                                    onChange={(event) => { this.onChangeInput(event, 'ten_ta') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label>Giá:</label>
                                <input className='form-control' type='text'
                                    value={gia}
                                    onChange={(event) => { this.onChangeInput(event, 'gia') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label>Số lượng:</label>
                                <input className='form-control' type='text'
                                    value={so_luong}
                                    onChange={(event) => { this.onChangeInput(event, 'so_luong') }}
                                />
                            </div>

                            <div class="form-outline">
                                <label>Ghi chú:</label>
                                <textarea class="form-control" rows="8"
                                    value={ghi_chu}
                                    onChange={(event) => { this.onChangeInput(event, 'ghi_chu') }}
                                ></textarea>
                                {/* <label class="form-label" for="textAreaExample2">Message</label> */}
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-6'>
                                <label>Ảnh thức ăn</label>
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
                                    onClick={() => this.handleSaveFood()}
                                >Lưu</button></div>
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
        createNewFood: (data) => dispatch(actions.createNewFood(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFood);
