import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userServices';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ten_tk: '',
            mat_khau: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            ten_tk: event.target.value
        })
        console.log(event.target.value)
    }

    handleOnChangePassword = (event) => {
        this.setState({
            mat_khau: event.target.value
        })
        console.log(event.target.value)
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.ten_tk, this.state.mat_khau);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.adminLoginSuccess(data.user)
                console.log('Đăng nhập thành công!')
                // let { isLoggedIn } = this.state;
                this.props.history.push({
                    pathname: "/system/ticket-confirmation",
                    // state: { isLoggedIn }
                });
            }

        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin();
        }
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Đăng nhập</div>
                        <div className='col-12 form-group login-input' >
                            <label>Tên tài khoản:</label>
                            <input type='text'
                                className='form-control'
                                placeholder='Nhập vào tên tài khoản'
                                value={this.state.ten_tk}
                                onChange={(event) => this.handleOnChangeUsername(event)} />
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label>Mật khẩu:</label>
                            <div className='custom-input-password'>
                                <input
                                    className='form-control'
                                    type={this.state.isShowPassword ? 'text' : 'password'}

                                    placeholder='Nhập vào mật khẩu'
                                    onChange={(event) => { this.handleOnChangePassword(event) }}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <span
                                    onClick={() => { this.handleShowHidePassword() }}
                                ><i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Đăng nhập</button>
                        </div>

                        {/* <div className='col-12'>
                            <span className='forgot-password'>Quên mật khẩu?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Hoặc đăng nhập với:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i class="fab fa-google-plus-g google"></i>
                            <i class="fab fa-facebook facebook"></i>
                        </div>

                        <div class="text-center">
                            <p>Bạn không phải thành viên? <a href="#!">Đăng ký ngay</a></p>
                        </div> */}
                    </div>
                </div>

            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
