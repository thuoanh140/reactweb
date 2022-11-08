import React, { Component } from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailMovie.scss';
import { getMovieNowShowingById, getRatingByMovieIdService } from '../../../services/userServices'
import Showtime from './Showtime';
import Rating from './Rating';
import ReactStars from "react-rating-stars-component";
import StarRatingComponent from "react-rating-stars-component";
import ReactDOM from 'react-dom';
import HomeFooter from '../../HomePage/HomeFooter';

import ReactStarsRating from 'react-awesome-stars-rating';


class DetailComingSoon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailMovie: {},
            totalRating: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.ten_phim) {
            let id = this.props.match.params.ten_phim;
            console.log('check ten phim:', id)
            let res = await getMovieNowShowingById(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailMovie: res.data
                })
            }
            console.log('check res: res detailmovie', res)
            let ressponse = await getRatingByMovieIdService(res.data.id);
            if (ressponse && ressponse.errCode === 0) {
                this.setState({
                    totalRating: ressponse.data
                })
            }
            console.log('checktotal rating', ressponse)
        }
        let phim = this.props.match.params.ten_phim;
        console.log('check this.props.match.params.ten_phim', phim)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {

        console.log('check state', this.state);
        let { detailMovie, totalRating } = this.state;
        console.log('check detailMovie', detailMovie);
        let movieId = detailMovie.id;
        console.log('check totalRatingd', totalRating);
        let totalPoint = totalRating.reduce((total, item) => total + Number(item.diem_dg), 0);
        console.log('check totalPoint', totalPoint);
        let averagePoint = totalPoint / totalRating.length;
        console.log('check averagePoint', averagePoint);
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
                                <div className='rating-total'>
                                    <div className='star'>

                                        <ReactStarsRating value={averagePoint}
                                            isEdit={false}


                                        />

                                    </div>
                                    <div className='number-rating'>
                                        <span>({totalRating.length} đánh giá)</span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className='down'>
                                {detailMovie.the_loai &&
                                    <span><b>Thể loại: </b>{detailMovie.the_loai}</span>
                                }
                                <br />
                                {detailMovie.dao_dien &&
                                    <span><b>Đạo diễn: </b>{detailMovie.dao_dien}</span>
                                }
                                <br />
                                {detailMovie.dien_vien &&
                                    <span><b>Diễn viên: </b>{detailMovie.dien_vien}</span>
                                }
                                <br />
                                {detailMovie.ngay_kc &&
                                    <span><b>Ngày khởi chiếu: </b>{moment(detailMovie.ngay_kc).format("DD-MM-YYYY")}</span>
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


                </div>
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailComingSoon);
