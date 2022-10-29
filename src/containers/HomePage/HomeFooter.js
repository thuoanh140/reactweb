import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

import './HomeFooter.scss'

class HomeFooter extends Component {

    render() {



        return (
            <>
                <div className='footer-container'>
                    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
                        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                            <div className='me-5 d-none d-lg-block'>
                                <span>Kết nối với chúng tôi:</span>
                            </div>

                            <div>
                                <a href='' className='me-4 text-reset'>
                                    <MDBIcon fab icon="facebook-f" />
                                </a>
                                <a href='' className='me-4 text-reset'>
                                    <MDBIcon fab icon="twitter" />
                                </a>
                                <a href='' className='me-4 text-reset'>
                                    <MDBIcon fab icon="google" />
                                </a>
                                <a href='' className='me-4 text-reset'>
                                    <MDBIcon fab icon="instagram" />
                                </a>
                                <a href='' className='me-4 text-reset'>
                                    <MDBIcon fab icon="linkedin" />
                                </a>
                                <a href='' className='me-4 text-reset'>
                                    <MDBIcon fab icon="github" />
                                </a>
                            </div>
                        </section>

                        <section className=''>
                            <MDBContainer className='text-center text-md-start mt-5'>
                                <MDBRow className='mt-3'>
                                    <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                                        <h6 className='text-uppercase fw-bold mb-4'>
                                            <MDBIcon icon="gem" className="me-3" />
                                            on cinema
                                        </h6>
                                        <p>
                                            Lịch chiếu phim & Mua vé On Cinema- rạp chiếu phim toàn quốc đầy đủ & tiện lợi nhất.
                                        </p>
                                    </MDBCol>

                                    <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                                        <h6 className='text-uppercase fw-bold mb-4'>On Cinema Việt Nam</h6>
                                        <p>
                                            <a href='#!' className='text-reset'>
                                                Giới thiệu
                                            </a>
                                        </p>
                                        <p>
                                            <a href='#!' className='text-reset'>
                                                Tiện ích online
                                            </a>
                                        </p>
                                        <p>
                                            <a href='#!' className='text-reset'>
                                                Thẻ quà tặng
                                            </a>
                                        </p>
                                        <p>
                                            <a href='#!' className='text-reset'>
                                                Tuyển dụng
                                            </a>
                                        </p>
                                        <p>
                                            <a href='#!' className='text-reset'>
                                                Liên hệ quảng cáo
                                            </a>
                                        </p>
                                    </MDBCol>

                                    <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                                        <h6 className='text-uppercase fw-bold mb-4'>Điều khoản sử dụng</h6>
                                        <p>
                                            <a href='#!' className='text-reset'>
                                                Điều khoảng chung
                                            </a>
                                        </p>
                                        <p>
                                            <a href='#!' className='text-reset'>
                                                Điều khoản giao dịch
                                            </a>
                                        </p>
                                        <p>
                                            <a href='#!' className='text-reset'>
                                                Chính sách thanh toán
                                            </a>
                                        </p>
                                        <p>
                                            <a href='#!' className='text-reset'>
                                                Chính sách bảo mật
                                            </a>
                                        </p>
                                        <p>
                                            <a href='#!' className='text-reset'>
                                                Câu hỏi thường gặp
                                            </a>
                                        </p>
                                    </MDBCol>

                                    <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                                        <h6 className='text-uppercase fw-bold mb-4'>Chăm sóc khách hàng</h6>
                                        <p>
                                            <MDBIcon icon="home" className="me-2" />
                                            Trụ sở chính: đường 3/2, Xuân Khánh, Ninh Kiều, TP. Cần Thơ
                                        </p>
                                        <p>
                                            <MDBIcon icon="envelope" className="me-3" />
                                            oncinemasp@gmail.com
                                        </p>
                                        <p>
                                            <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
                                        </p>
                                        <p>
                                            <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
                                        </p>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </section>

                        <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                            © 2022 Copyright:
                            <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
                                oncinema.com
                            </a>
                        </div>
                    </MDBFooter>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
