import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './TableManageMovie.scss';
// import { getAllStaff, createNewStaffService, deleteStaffService, editStaffService } from '../../services/userServices'


class TableManageMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieRedux: [],

        }
    }

    componentDidMount() {
        this.props.fetchMovieRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listMovies !== this.props.listMovies) {
            this.setState({
                movieRedux: this.props.listMovies
            })
        }
    }


    render() {
        console.log('check get all movie', this.props.listMovies);
        console.log('check state', this.state.movieRedux);
        let arrMovies = this.state.movieRedux;
        return (

            <table id='TableManageMovie'>
                <tbody>
                    <tr>
                        <th>Tên phim </th>
                        <th>Ngày KC</th>
                        <th>Thời lượng</th>
                        <th>Giới hạn tuổi</th>
                        <th>Ngôn ngữ</th>
                        <th>Quốc gia</th>
                        <th>Đạo diễn</th>
                        <th>Diễn viên</th>
                        <th>Tóm tắt</th>
                        <th>Thể loại</th>
                        {/* <th>Poster</th> */}
                        <th>Hành động</th>
                    </tr>

                    {arrMovies && arrMovies.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.ten_phim}</td>
                                <td>{item.ngay_kc}</td>
                                <td>{item.thoi_luong}</td>
                                <td>{item.gh_tuoi}</td>
                                <td>{item.ngon_ngu}</td>
                                <td>{item.quoc_gia}</td>
                                <td>{item.dao_dien}</td>
                                <td>{item.dien_vien}</td>
                                <td>{item.tom_tat}</td>
                                <td>{item.the_loai}</td>
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
        listMovies: state.admin.movies
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMovieRedux: () => dispatch(actions.fetchAllMovieStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageMovie);
