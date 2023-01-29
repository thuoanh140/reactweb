import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './TicketConfirmation.scss';
import { getTicketUnpaidService, getDetailTicketByIdTicketService, confirmTicket } from '../../../services/userServices'
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import DatePicker from '../../../components/Input/DatePicker';


class SearchFoodUnpaid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allTicketUnPaid: [],
            allDetailTicketUnpaid: []

        }
    }

    async componentDidMount() {

    }



    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    handleOnChangeDataPicker = (date) => {
        const momentTimeTmp = moment(date[0]).unix()
        this.handleChangeValue('ngay_ban', momentTimeTmp * 1000)
        // this.setState({
        //     // currentDate: date[0]
        // })
    }

    handleChangeValue(key, value) {
        this.setState({
            selectedValue: { ...this.state.selectedValue, [key]: value }
        })
    }

    handleSearchData(data) {
        // console.log(this.props);
        this.props?.onSearch?.(data || this.state.selectedValue)
    }



    render() {


        return (
            <>


                <div className='search-data'>
                    <div className='col-2'>
                        <span>Ngày chiếu</span>
                        <DatePicker
                            onChange={this.handleOnChangeDataPicker}
                            className='form-control'
                        // value={this.state.currentDate[0]}
                        // minDate={new Date()}
                        />
                    </div>
                    <div className='col-2'>
                        <span>SĐT</span>
                        <input className="form-control" onChange={e => this.handleChangeValue('sdt', e.target.value)} />
                    </div>
                    <div className='row justify-content-center'>
                        <button className='col-11 btn btn-primary search' onClick={() => this.handleSearchData()}
                        >Tìm kiếm</button>
                    </div>
                </div>



            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listEvent: state.admin.eventData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchEventRedux: () => dispatch(actions.fetchEvent()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFoodUnpaid);
