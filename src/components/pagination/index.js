import { Component } from "react";

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total_page: 0,
      current_page: this.props.page || 1,
      minPageLimit: 1,
      maxPageLimit: 1
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.limit !== this.props.limit || prevProps.page !== this.props.page || prevProps.total !== this.props.total) {
      this.countTotalPage(this.props.limit, this.props.total, this.props.page)
      setTimeout(() => this.calcLimitPage(this.props.page), 0)
    }

    // if (prevState.total_page !== this.state.total_page) {
    //   this.calcLimitPage(this.current_page)
    // }
  }

  componentDidMount() {
    this.countTotalPage(this.props.limit, this.props.total, this.props.page)
    setTimeout(() => this.calcLimitPage(1), 0)
  }

  countTotalPage(limit, total, page) {
    this.setState({
      total_page: parseInt(total / limit) + (total % limit > 0)
    })
  }

  handleClickItem(page) {
    this.props.onChangePage?.(page)
    setTimeout(() => this.calcLimitPage(page), 0)

  }

  calcLimitPage = (page) => {
    console.log(this.state.total_page, page);
    let maxPageLimit = page + 1 > this.state.total_page ? this.state.total_page : page + 1;
    let minPageLimit = page - 1 < 1 ? 1 : page - 1;
    if (page === 1) maxPageLimit += 1;
    if (page === this.state.total_page) minPageLimit -= 1;
    this.setState({
      current_page: page,
      maxPageLimit,
      minPageLimit,
    })
  }

  handleRenderItem() {
    const { current_page, total_page, minPageLimit, maxPageLimit } = this.state
    console.log({ current_page, total_page, minPageLimit, maxPageLimit });
    let arrItems = [...Array(total_page).keys()];

    return arrItems.map(item => {

      if (item + 1 <= maxPageLimit && item + 1 >= minPageLimit) {
        return (
          <li class={"page-item" + (item + 1 === current_page ? ' active' : '')} onClick={() => this.handleClickItem(item + 1)}>
            <a class="page-link" href="#">{item + 1}</a>
          </li>
        )
      }
      else return null
    })
  }


  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
          <li class="page-item" onClick={() => this.handleClickItem(1)}>
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          {/* {
            this.state.current_page > 2 && <li class="page-item">
              <a class="page-link" href="#">&hellip;</a>
            </li>
          } */}
          {this.handleRenderItem()}
          {/* {
            this.state.total_page - this.state.current_page >= 2 && <li class="page-item">
              <a class="page-link" href="#">&hellip;</a>
            </li>
          } */}
          <li class="page-item" onClick={() => this.handleClickItem(this.state.total_page)}>
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Pagination