import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailMovie.scss';
import { getMovieNowShowingById } from '../../../services/userServices'
import Showtime from './Showtime';
import Rating from './Rating';


class DetailMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailMovie: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.ten_phim) {
            let id = this.props.match.params.ten_phim;
            let res = await getMovieNowShowingById(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailMovie: res.data
                })
            }
            console.log('check res: res', res)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {

        console.log('check state', this.state);
        let { detailMovie } = this.state;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='detail-movie-container'>
                    <div className='intro-movie'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailMovie.poster})` }}>

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {detailMovie.ten_phim &&
                                    <span>{detailMovie.ten_phim}</span>
                                }
                            </div>
                            <hr />
                            <div className='down'>
                                {detailMovie.dao_dien &&
                                    <span><b>Đạo diễn: </b>{detailMovie.dao_dien}</span>
                                }
                                <br />
                                {detailMovie.dien_vien &&
                                    <span><b>Diễn viên: </b>{detailMovie.dien_vien}</span>
                                }
                                <br />
                                {detailMovie.ngay_kc &&
                                    <span><b>Ngày khởi chiếu: </b>{detailMovie.ngay_kc}</span>
                                }
                                <br />
                                {detailMovie.thoi_luong &&
                                    <span><b>Thời lượng: </b>{detailMovie.thoi_luong}</span>
                                }
                                <br />
                                {detailMovie.ngon_ngu &&
                                    <span><b>Ngôn ngữ: </b>{detailMovie.ngon_ngu}</span>
                                }
                                <br />
                                {detailMovie.gh_tuoi &&
                                    <span><b>Giới hạn tuổi: {detailMovie.gh_tuoi}</b></span>
                                }
                                <br />
                                {detailMovie.tom_tat &&
                                    <span><b>Tóm tắt phim: </b>{detailMovie.tom_tat}.</span>
                                }

                            </div>
                        </div>
                    </div>
                    <div className='showtimes'>
                        <Showtime
                            showtimeIdFromParent={detailMovie && detailMovie.id ? detailMovie.id : -1}
                        />
                    </div>
                    <div className='comment-movie'>
                        <Rating
                            showtimeIdFromParent={detailMovie && detailMovie.id ? detailMovie.id : -1}
                        />
                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie);
