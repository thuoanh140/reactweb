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
import { createRatingService, getRatingByMovieIdService, createReportService } from '../../../services/userServices';
import { emitter } from '../../../utils/emitter'
import ModalReportRating from './ModalReportRating';
import { toast } from 'react-toastify';



class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noi_dung: '',
            diem_dg: 0,
            allRating: [],
            numberPerPage: 3,
            currentPage: 1,

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
                allRating: []
            })

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
                            allRating.slice(0, this.state.numberPerPage * this.state.currentPage).map((item, index) => {
                                return (
                                    <CommentItem
                                        key={index}
                                        id={item.id}
                                        ten_tv={item.memberData.ten_tv}
                                        ngay_dg={item.ngay_dg}
                                        diem_dg={item.diem_dg}
                                        noi_dung={item.noi_dung}
                                        rating={item}
                                        userId={this.props.userInfo?.id_tv}
                                    />
                                )
                            })
                        }

                        <div className='container flex py-2 flex-center'>
                            <div className='row'>
                                <div className='col-6 d-flex justify-content-center'>
                                    {
                                        allRating.length > this.state.numberPerPage * this.state.currentPage && (
                                            <button
                                                className='btn btn-success btn-sm font-weight-bold'
                                                onClick={() => this.setState({
                                                    currentPage: this.state.currentPage + 1
                                                })}
                                            >
                                                Xem thêm <i class="fas fa-angle-double-down"></i>
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
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

class CommentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalReportRating: false,
            reportContent: {}
        }
    }



    toggleReportRatingModal = () => {
        this.setState({
            isOpenModalReportRating: !this.state.isOpenModalReportRating,
        })
    }

    createNewReport = async (data) => {
        try {
            let response = await createReportService(data);
            console.log('response report', response)
            if (response && response.errCode !== 0) {
                alert(response.Message);
            } else {
                // await this.getAllStaffFromReact();
                this.setState({
                    isOpenModalReportRating: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
                toast.success('Báo xấu bình luận thành công!')
            }
        } catch (e) {
            console.log(e);
        }
    }



    handleClickReport = (report) => {
        console.log('check report', report);
        this.setState({
            isOpenModalReportRating: true,
            reportContent: report
        })
    }
    render() {
        const { id, ten_tv, ngay_dg, diem_dg, noi_dung, rating, userId } = this.props;

        console.log('check rating info:', rating)
        return (
            <div className='other-rating-info'>
                {this.state.isOpenModalReportRating &&
                    <ModalReportRating
                        isOpen={this.state.isOpenModalReportRating}
                        toggleFromParent={this.toggleReportRatingModal}
                        createNewReport={this.createNewReport}
                        report={this.state.reportContent}
                        userId={userId}
                        ten_tv={ten_tv}
                    />}
                <div className='name-report'>
                    <div className='member-name'>
                        <span>{ten_tv}</span>
                    </div>
                    <button className='btn btn-primary' onClick={() => this.handleClickReport(rating)}>Report <i className="fas fa-flag"></i></button>
                </div>
                <div className='date mt-2'>
                    <span>{moment(ngay_dg).format("DD-MM-YYYY")}</span>
                </div>
                <div className='rating mt-2'>
                    <ReactStars
                        count={5}
                        value={diem_dg}
                        size={17}
                        activeColor="#ffd700"
                        edit={false}
                    />
                </div>
                <div className='comment mt-2'>
                    <span>{noi_dung}</span>
                </div>
            </div>
        )
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
