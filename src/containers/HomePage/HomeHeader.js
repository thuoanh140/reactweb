import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changLanguageApp, processLogout } from '../../store/actions'
import PaymentMethods from '../Membership/NowShowing/PaymentMethods';
import { withRouter } from 'react-router';

class HomeHeader extends Component {
    changLanguage = (language) => {
        this.props.changLanguageAppRedux(language);
        //fire redux event: actions
    }

    handleOnClickMyTicket = () => {
        this.props.history.push(`/my-ticket`);
    }

    render() {
        let language = this.props.language;
        let userInfo = this.props.userInfo;;
        // let userId = this.props.userInfo.id;
        console.log('check userinfor: ', userInfo)
        // console.log('check userId: ', userId)
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className='fas fa-bars'></i>
                            <div className='header-logo' onClick={() => this.props.history?.push('/home')}></div>
                        </div>
                        <div className='center-content'>
                            <div className="dropdown">
                                <button className="dropbtn"><b><FormattedMessage id="homeheader.movie" /></b></button>
                                <div className="dropdown-content">
                                    <a href="#"><b><FormattedMessage id="homeheader.NOW-SHOWING" /></b></a>
                                    <a href="#"><b><FormattedMessage id="homeheader.COMING-SOON" /></b></a>
                                </div>
                            </div>
                            <div className="dropdown">
                                <button className="dropbtn"><b><FormattedMessage id="homeheader.THEATERS" /></b></button>
                                <div className="dropdown-content">
                                    <a href="#"><b><FormattedMessage id="homeheader.ALL-CINEMAS" /></b></a>
                                    <a href="#"><b><FormattedMessage id="homeheader.SPECIAL-CINEMAS" /></b></a>
                                    <a href="#"><b><FormattedMessage id="homeheader.3D-CINEMAS" /></b></a>
                                </div>
                            </div>
                            <div className="dropdown">
                                <button className="dropbtn"><b><FormattedMessage id="homeheader.MEMBERSHIP" /></b></button>
                                <div className="dropdown-content">
                                    <a href="#"><b><FormattedMessage id="homeheader.ACCOUNT" /></b></a>
                                    <a href="#"><b><FormattedMessage id="homeheader.MEMBER-BENEFITS" /></b></a>
                                </div>
                            </div>
                            <div className="dropdown">
                                <button className="dropbtn"><b><FormattedMessage id="homeheader.CINEMA-CHANNEL" /></b></button>
                                <div className="dropdown-content">
                                    <a href="#"><b><FormattedMessage id="homeheader.NEWS" /></b></a>
                                    <a href="#"><b><FormattedMessage id="homeheader.PROMOTION" /></b></a>
                                </div>
                            </div>

                            <div className="dropdown">
                                <button className="dropbtn"
                                    onClick={() => this.handleOnClickMyTicket()}><b><FormattedMessage id="homeheader.myticket" /></b></button>
                                {/* <div className="dropdown-content">
                                    <a href="#"><b><FormattedMessage id="homeheader.NEWS" /></b></a>
                                    <a href="#"><b><FormattedMessage id="homeheader.PROMOTION" /></b></a>
                                </div> */}
                            </div>

                        </div>
                        <div className='right-content'>
                            <div className='support'><i className='fas fa-question-circle'></i>
                                <FormattedMessage id="homeheader.support" /></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changLanguage(LANGUAGES.EN)}>EN</span></div>
                        <div>
                            <span className='welcome'>
                                {
                                    userInfo ?
                                        <>
                                            <FormattedMessage id="homeheader.welcome" />, {userInfo && userInfo ? userInfo.ten_tk : ''}! 
                                            <i class="fas fa-sign-out-alt sign-out-icon" onClick={this.props.processLogout}></i>
                                        </> : 
                                        <a href="/login-membership">Đăng Nhập</a>}</span>
                        </div>
                        </div>


                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='option'>
                                <OptionChild icon={'warehouse'} id="theaters" />
                                <OptionChild icon={'film'} id="now-showing" />
                                <OptionChild icon={'phone'} id='contact' />
                                <OptionChild icon={'newspaper'} id='news-offers' />
                                <OptionChild icon={'users'} id='register' />
                            </div>
                        </div>
                        <div className='content-down'></div>
                    </div>
                }
                <div className='slideshow'>


                </div>
                {/* <div hidden>
                    <PaymentMethods userId={userId} />
                </div> */}
            </React.Fragment>
        );
    }
}

const OptionChild = ({icon, id}) => {
    return (
        <div className='option-child'>
            <div className='icon-child'><i className={`fas fa-${icon}`}></i></div>
            <div className='text-child'><FormattedMessage id={`option.${id}`} /></div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changLanguageAppRedux: (language) => dispatch(changLanguageApp(language)),
        processLogout: () => dispatch(processLogout())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
