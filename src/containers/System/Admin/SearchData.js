import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './SearchData.scss';
import { getAllTicketService, deleteTicketService, cancelTicket, searchTicketService } from '../../../services/userServices'
import moment from 'moment';
import NumberFormat from 'react-number-format';
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';


class SearchData extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {


    }



    handleOnChangeDataPicker = (date) => {
        this.setState({
            // currentDate: date[0]
        })
    }



    render() {

        return (
            <div className='search-data-container'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-4'>
                            <span>Mã vé</span>
                            <input className="form-control" />
                        </div>
                        <div className='col-4'>
                            <span>Mã thành viên</span>
                            <input className="form-control" />
                        </div>
                        <div className='col-4'>
                            <span>Ngày chiếu</span>
                            <DatePicker
                                onChange={this.handleOnChangeDataPicker}
                                className='form-control'
                            // value={this.state.currentDate[0]}
                            // minDate={new Date()}
                            />
                        </div>
                        <div className='col-6'>
                            <span>Rạp</span>
                            <Select />
                        </div>
                        <div className='col-6'>
                            <span>Phim</span>
                            <Select />
                        </div>


                    </div>
                    <button className='col-3 btn btn-primary search'>Tìm kiếm</button>
                </div>


            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchData);
