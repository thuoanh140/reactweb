import React, { Component } from 'react';
import { connect } from "react-redux";
import './Rating.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { withRouter } from "react-router";
import ReactStars from "react-rating-stars-component";
import StarRating from "react-star-ratings";
import { createRatingService, getRatingByMovieIdService } from '../../../services/userServices';



class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noi_dung: '',
            diem_dg: 0,
            allRating: []

        }
    }

    async componentDidMount() {

        // let movieId = this.props?.showtimeIdFromParent;
        // console.log('check movieID didmount:', movieId)
        // let respon = await getRatingByMovieIdService(movieId);
        // if (respon && respon.errCode === 0) {
        //     this.setState({
        //         allRating: respon.data ? respon.data : [],

        //     })
        // }
        // console.log('check allrating: ', respon)
        // setTimeout(() => this.getRating(), 0)

    }

    async getRating() {
        let movieId = this.props?.showtimeIdFromParent;
        console.log('check movie Id getRating', movieId)
        let respon = await getRatingByMovieIdService(movieId);
        if (respon && respon.errCode === 0) {
            this.setState({
                allRating: respon.data ? respon.data : [],

            })
        }
        console.log('check allrating: ', respon)
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.showtimeIdFromParent !== this.props.showtimeIdFromParent) {
            this.getRating()
        }

    }
    ratingChanged = (newRating) => {
        console.log(newRating);
        this.setState({
            diem_dg: newRating
        })
    };

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('check onChange', this.state)
        })
    }

    handleSaveRating = async () => {
        if (this.props.showtimeIdFromParent && this.props.showtimeIdFromParent !== -1) {
            let ngay_dg = moment().format("YYYY-MM-DD");
            let id_phim = this.props.showtimeIdFromParent;
            let id_tv = this.props.userInfo?.id_tv;
            let res = await createRatingService({
                id_tv: id_tv,
                id_phim: id_phim,
                ngay_dg: ngay_dg,
                diem_dg: this.state.diem_dg,
                noi_dung: this.state.noi_dung
            })
            this.setState({
                diem_dg: 0,
                noi_dung: ''
            })
        }
        await this.getRating()
    }


    render() {
        let movieId = this.props.showtimeIdFromParent;
        let { noi_dung, allRating, diem_dg } = this.state;
        console.log('check props rating', this.props);
        let userId = this.props.userInfo?.id_tv;
        console.log('check idTv:', userId)
        console.log('check allRating', allRating)
        console.log('check diem_dg:', diem_dg)
        console.log('check movieId', movieId)
        let totalRating = this.props.totalRating;
        return (
            <>
                <div className='rating-container'>
                    <div className='add-rating-container container'>
                        <div className='add-rating'>
                            <span>Thêm đánh giá:</span>
                        </div>
                        <StarRating

                            rating={this.state.diem_dg}
                            count={5}
                            // onChange={this.ratingChanged}
                            changeRating={this.ratingChanged}
                            size={17}
                            starHoverColor={'#effa16'}
                            starRatedColor={'#effa16'}
                        />
                        {/* <ReactStars
                            rating={diem_dg}
                            count={5}
                            onChange={this.ratingChanged}
                            size={24}
                            activeColor="#ffd700"

                        /> */}
                        {/* <ReactStars
                            count={5}
                            onChange={this.ratingChanged}
                            size={24}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            // halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                        /> */}
                        <div>
                            <div className='row'>
                                <span>Thêm bình luận của bạn:</span>
                                <div className='col-6'>
                                    <textarea class="form-control" rows="5"
                                        value={noi_dung}
                                        onChange={(event) => { this.onChangeInput(event, 'noi_dung') }}
                                    ></textarea>
                                </div>

                            </div>
                            <button type="button" class="btn btn-primary my-2"
                                onClick={() => this.handleSaveRating()}>Thêm bình luận</button>
                        </div>
                    </div>
                    <div className='other-rating container'>
                        {allRating && allRating.length > 0 &&
                            allRating.map((item, index) => {
                                return (
                                    <div key={index} className='other-rating-info'>
                                        <div className='name-report'>
                                            <div className='member-name'><span>{item.memberData.ten_tv}</span></div>
                                            <button className='btn btn-primary'>Report <i className="fas fa-flag"></i></button>
                                        </div><br />
                                        <div className='date'> <span>{moment(item.ngay_dg).format("DD-MM-YYYY")}</span></div><br />
                                        <div className='rating'><ReactStars
                                            count={5}
                                            value={item.diem_dg}
                                            size={17}
                                            activeColor="#ffd700"
                                            edit={false}
                                        /></div><br />
                                        <div className='comment'><span>{item.noi_dung}</span></div>
                                    </div>
                                )
                            })
                        }
                        {/* {totalRating && totalRating.length > 0 &&
                            totalRating.map((item, index) => {
                                return (
                                    <div key={index} className='other-rating-info'>
                                        <div className='name-report'>
                                            <div className='member-name'><span>{item.memberData.ten_tv}</span></div>
                                            <button className='btn btn-primary'>Report <i className="fas fa-flag"></i></button>
                                        </div><br />
                                        <div className='date'> <span>{moment(item.ngay_dg).format("DD-MM-YYYY")}</span></div><br />
                                        <div className='rating'><ReactStars
                                            count={5}
                                            value={item.diem_dg}
                                            size={17}
                                            activeColor="#ffd700"
                                            edit={false}

                                        /></div><br />
                                        <div className='comment'><span>{item.noi_dung}</span></div>
                                    </div>
                                )
                            })
                        } */}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Rating));
