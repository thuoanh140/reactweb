import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './TableManageMovie.scss';
import { getFoodService } from '../../../services/userServices'
import NumberFormat from 'react-number-format';

class TableManageFood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foodRedux: [],

        }
    }

    async componentDidMount() {
        let res = await getFoodService();
        if (res && res.errCode === 0) {
            this.setState({
                foodRedux: res.data ? res.data : [],

            })

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listFood !== this.props.listFood) {
        //     this.setState({
        //         foodRedux: this.props.listFood
        //     })
        // }
    }


    render() {
        let arrMovies = this.state.foodRedux;
        return (

            <table id='TableManageMovie'>
                <tbody>
                    <tr>
                        <th>Tên món</th>
                        <th>Giá</th>
                        <th>Ghi chú</th>
                        <th>Hành động</th>
                    </tr>

                    {arrMovies && arrMovies.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.ten_ta}</td>
                                <td>{<NumberFormat
                                    value={item.gia}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />}</td>
                                <td>{item.ghi_chu}</td>
                                {/* <td>{item.poster}</td> */}
                                <td>
                                    <button className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                    <button className='btn-delete'><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    })
                    }




                </tbody>
            </table>

        );
    }

}

const mapStateToProps = state => {
    return {
        listFood: state.admin.foodData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchFoodRedux: () => dispatch(actions.fetchFood()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageFood);
