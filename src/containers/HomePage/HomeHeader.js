import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changLanguageApp } from '../../store/actions'

class HomeHeader extends Component {
    changLanguage = (language) => {
        this.props.changLanguageAppRedux(language);
        //fire redux event: actions
    }

    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className='fas fa-bars'></i>
                            <div className='header-logo'></div>
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

                        </div>
                        <div className='right-content'>
                            <div className='support'><i className='fas fa-question-circle'></i>
                                <FormattedMessage id="homeheader.support" /></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>

                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='option'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-warehouse"></i></div>
                                    <div className='text-child'><FormattedMessage id="option.theaters" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-film"></i></div>
                                    <div className='text-child'><FormattedMessage id="option.now-showing" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-phone"></i></div>
                                    <div className='text-child'><FormattedMessage id="option.contact" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-newspaper"></i></div>
                                    <div className='text-child'><FormattedMessage id="option.news-offers" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-users"></i></div>
                                    <div className='text-child'><FormattedMessage id="option.register" /></div>
                                </div>
                            </div>
                        </div>
                        <div className='content-down'></div>
                    </div>
                }
                <div className='slideshow'>


                </div>
            </React.Fragment>
        );
    }

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
        changLanguageAppRedux: (language) => dispatch(changLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
