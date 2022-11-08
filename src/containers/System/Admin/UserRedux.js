import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageMovie from './TableManageMovie';
import { getStateMovieService } from '../../../services/userServices';
import Select from 'react-select';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genreArr: [],
            stateMovieArr: [],
            // nationArr: [],
            // directorArr: [],
            // castArr: [],
            previewImgURL: '',
            isOpen: false,

            ten_phim: '',
            ngay_kc: '',
            thoi_luong: '',
            gh_tuoi: '',
            tom_tat: '',
            poster: '',
            ngon_ngu: '',
            ten_loai: '',
            dao_dien: '',
            dien_vien: '',
            quoc_gia: '',
            the_loai: '',
            id_trang_thai: '',
            listStateMovie: '',
            selectedStateMovie: {}
        }
    }

    async componentDidMount() {

        let response = await getStateMovieService();
        if (response && response.errCode === 0) {
            this.setState({
                stateMovieArr: response.data
            })
        }

        let dataSelect = this.buildDataInputSelectStateMovie(response.data);
        this.setState({
            listStateMovie: dataSelect
        })

        this.props.getGenreStart();
        // this.props.getNationStart();
        // this.props.getDirectorStart();
        // this.props.getCastStart();


        // try {
        //     let res = await getGenreService();
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genreArr: res.data
        //         })
        //     }
        //     console.log('check res', res);
        // } catch (e) {
        //     console.log(e);
        // }

        // try {
        //     let response = await getNationService();
        //     if (response && response.errCode === 0) {
        //         this.setState({
        //             nationArr: response.data
        //         })
        //     }
        //     console.log('check response', response);
        // } catch (e) {
        //     console.log(e);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genreRedux !== this.props.genreRedux) {
            let arrGenres = this.props.genreRedux;
            this.setState({
                genreArr: arrGenres,
                ten_loai: arrGenres && arrGenres.length > 0 ? arrGenres[0].id : '',

            })
        }

        // if (prevProps.nationRedux !== this.props.nationRedux) {
        //     let arrNations = this.props.nationRedux;
        //     this.setState({
        //         nartionArr: arrNations,
        //         ten_quoc_gia: arrNations && arrNations.length > 0 ? arrNations[0].id : ''
        //     })
        // }

        // if (prevProps.directorRedux !== this.props.directorRedux) {
        //     let arrDirectors = this.props.directorRedux;
        //     this.setState({
        //         directorArr: arrDirectors,
        //         ten_dao_dien: arrDirectors && arrDirectors.length > 0 ? arrDirectors[0].id : ''
        //     })
        // }

        // if (prevProps.castRedux !== this.props.castRedux) {
        //     let arrCasts = this.props.castRedux;
        //     this.setState({
        //         castArr: arrCasts,
        //         ten_dien_vien: arrCasts && arrCasts.length > 0 ? arrCasts[0].id : ''
        //     })
        // }


    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (prevProps.nationRedux !== this.props.nationRedux) {
    //         this.setState({
    //             nationArr: this.props.nationRedux
    //         })
    //     }
    // }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                poster: base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveMovie = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        this.props.createNewMovie({
            ten_phim: this.state.ten_phim,
            ngay_kc: this.state.ngay_kc,
            thoi_luong: this.state.thoi_luong,
            gh_tuoi: this.state.gh_tuoi,
            tom_tat: this.state.tom_tat,
            ngon_ngu: this.state.ngon_ngu,
            quoc_gia: this.state.quoc_gia,
            dao_dien: this.state.dao_dien,
            dien_vien: this.state.dien_vien,
            ten_loai: this.state.ten_loai,
            poster: this.state.poster,
            the_loai: this.state.the_loai,
            id_trang_thai: this.state.selectedStateMovie.value
            //     ten_loai: [{
            //         ten_loai: this.state.ten_loai,
            //     }]
            // }, {
            //     include: db.The_Loai_Phim
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['ten_phim', 'ngay_kc', 'thoi_luong',
            'gh_tuoi', 'ngon_ngu', 'tom_tat', 'quoc_gia', 'dao_dien', 'dien_vien', 'the_loai']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Bạn nhập vào thiếu ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    handleChangeSelectStateMovie = async (selectedOption) => {
        this.setState({
            selectedStateMovie: selectedOption
        })
        console.log('selected state:', selectedOption)
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('check onChange', this.state)
        })
    }

    buildDataInputSelectStateMovie = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                // let labelProvince = `${item.ten_tinh}`;
                // object.label = labelProvince;
                object.label = `${item.ten_trang_thai}`;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    render() {

        console.log('check select state render', this.state.selectedStateMovie.value)
        let genres = this.state.genreArr;
        // let nations = this.state.nationArr;
        // let directors = this.state.directorArr;
        // let casts = this.state.castArr;
        let isGetGenres = this.props.isLoadingGenre;

        let { ten_phim, ngay_kc, thoi_luong, gh_tuoi, tom_tat,
            poster, ngon_ngu, ten_loai, dao_dien,
            dien_vien, quoc_gia, the_loai, listStateMovie } = this.state;

        return (
            <div className='user-redux-container'>
                <div className='title'><FormattedMessage id="menu.movie.title" /></div>
                <div>{isGetGenres === true ? 'Loading genres' : ''}</div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='col-12'><FormattedMessage id="menu.movie.add" /></div>
                        <div className='row'>
                            <div className='col-6'>
                                <label><FormattedMessage id="menu.movie.name" /></label>
                                <input className='form-control' type='text'
                                    value={ten_phim}
                                    onChange={(event) => { this.onChangeInput(event, 'ten_phim') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.movie.date" /></label>
                                <input className='form-control' type='date'
                                    value={ngay_kc}
                                    onChange={(event) => { this.onChangeInput(event, 'ngay_kc') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.movie.time" /></label>
                                <input className='form-control' type='text'
                                    value={thoi_luong}
                                    onChange={(event) => { this.onChangeInput(event, 'thoi_luong') }}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <label><FormattedMessage id="menu.movie.age" /></label>
                                <input className='form-control' type='text'
                                    value={gh_tuoi}
                                    onChange={(event) => { this.onChangeInput(event, 'gh_tuoi') }}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="menu.movie.language" /></label>
                                <input className='form-control' type='text'
                                    value={ngon_ngu}
                                    onChange={(event) => { this.onChangeInput(event, 'ngon_ngu') }}
                                />
                            </div>

                            <div className='col-4'>
                                <label><FormattedMessage id="menu.movie.national" /></label>
                                <input className='form-control' type='text'
                                    value={quoc_gia}
                                    onChange={(event) => { this.onChangeInput(event, 'quoc_gia') }}
                                />
                            </div>

                            <div className='col-4'>
                                <label><FormattedMessage id="menu.movie.director" /></label>
                                <input className='form-control' type='text'
                                    value={dao_dien}
                                    onChange={(event) => { this.onChangeInput(event, 'dao_dien') }}
                                />
                            </div>

                            <div className='col-4'>
                                <label><FormattedMessage id="menu.movie.cast" /></label>
                                <input className='form-control' type='text'
                                    value={dien_vien}
                                    onChange={(event) => { this.onChangeInput(event, 'dien_vien') }}
                                />
                            </div>

                            <div class="form-outline">
                                <label><FormattedMessage id="menu.movie.abstract" /></label>
                                <textarea class="form-control" rows="8"
                                    value={tom_tat}
                                    onChange={(event) => { this.onChangeInput(event, 'tom_tat') }}
                                ></textarea>
                                {/* <label class="form-label" for="textAreaExample2">Message</label> */}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.movie.TL" /></label>
                                <input className='form-control' type='text'
                                    value={the_loai}
                                    onChange={(event) => { this.onChangeInput(event, 'the_loai') }}
                                />
                            </div>
                            <div className='col-3 form-group'>
                                <label>Chọn trạng thái phim:</label>
                                <Select
                                    value={this.state.selectedStateMovie}
                                    onChange={this.handleChangeSelectStateMovie}
                                    options={this.state.listStateMovie}
                                />
                            </div>

                            {/* <div className='col-6'>
                                <label><FormattedMessage id="menu.movie.TL" /></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'ten_loai') }}>
                                    {genres && genres.length > 0 &&
                                        genres.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.ten_loai}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div> */}
                            {/* <div className='col-6'>
                                <label><FormattedMessage id="menu.movie.national" /></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'ten_quoc_gia') }}>
                                    {nations && nations.length > 0 &&
                                        nations.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.ten_quoc_gia}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div> */}

                            {/* <div className='col-6'>
                                <label><FormattedMessage id="menu.movie.director" /></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'ten_dao_dien') }}
                                >
                                    {directors && directors.length > 0 &&
                                        directors.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.ten_dao_dien}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="menu.movie.cast" /></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'ten_dien_vien') }}>
                                    {casts && casts.length > 0 &&
                                        casts.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.ten_dien_vien}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div> */}
                            <div className='col-6'>
                                <label><FormattedMessage id="menu.movie.poster" /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnChangeImage(event)}></input>
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh<i className='fas fa-upload'></i></label>
                                    <div className='preview-poster'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >

                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3'><button className='btn btn-primary'
                                    onClick={() => this.handleSaveMovie()}
                                ><FormattedMessage id="menu.movie.btn" /></button></div>
                            </div>
                        </div>

                        <div>
                            <TableManageMovie />
                        </div>



                    </div>



                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />

                    }

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genreRedux: state.admin.genres,
        // nationRedux: state.admin.nations,
        // directorRedux: state.admin.directors,
        // castRedux: state.admin.casts,
        isLoadingGenre: state.admin.isLoadingGenre,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenreStart: () => dispatch(actions.fetchGenreStart()),
        createNewMovie: (data) => dispatch(actions.createNewMovie(data))
        // getNationStart: () => dispatch(actions.fetchNationStart()),
        // getDirectorStart: () => dispatch(actions.fetchDirectorStart()),
        // getCastStart: () => dispatch(actions.fetchCastStart())

        // processLogout: () => dispatch(actions.processLogout()),
        // changLanguageAppRedux: (language) => dispatch(actions.changLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
