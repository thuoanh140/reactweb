import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, staffMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from "../../utils"
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changLanguageAppRedux(language);
    }

    componentDidMount() {
        let { adminInfo } = this.props;
        let menu = []
        if (adminInfo && !_.isEmpty(adminInfo)) {
            let role = adminInfo.role_id;
            if (role === 1) {
                menu = adminMenu;
            }
            if (role === 2) {
                menu = staffMenu;
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { adminProcessLogout, language, adminInfo, userInfo } = this.props;
        console.log('check user info', adminInfo);
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='languages'>
                    <span className='welcome'><FormattedMessage id="homeheader.welcome" />, {adminInfo && adminInfo.ten_tk ? adminInfo.ten_tk : ''}!</span>
                    <span
                        className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>
                        VN
                    </span>
                    <span
                        className={language === LANGUAGES.EN ? "language-en active" : "language-en"}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>
                        EN
                    </span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={adminProcessLogout} title="Đăng xuất">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>


            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedInAdmin: state.admin.isLoggedInAdmin,
        adminInfo: state.admin.adminInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        adminProcessLogout: () => dispatch(actions.adminProcessLogout()),
        changLanguageAppRedux: (language) => dispatch(actions.changLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
