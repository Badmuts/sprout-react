import React, { Component } from "react";
import AdvertisementList from "../components/AdvertisementList";
import HeaderBar from "../components/HeaderBar";
import { findAdvertisements } from "../endpoints/advertisement";
import { NonIdealState, Spinner } from "@blueprintjs/core";
import debounce from "lodash/debounce";
import lower from "lodash/toLower";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAdvertisementsIfNeeded } from "../actions/advertisement";

class AdvertisementListContainer extends Component {
  static propTypes = {
    advertisements: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { advertisements: [], isFetching: true, search: "" };
    this.onSearch = this.onSearch.bind(this);
    this.search = debounce(this.search, 250);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAdvertisementsIfNeeded());
    // const { search } = this.state;
    // findAdvertisements(search)
    //     .then(res => this.setState({ advertisements: res.data.results, isFetching: false }))
    //     .catch(err => this.setState({ errorMessage: "Kon op dit moment geen advertenties ophalen. Probeer het later opnieuw.", isFetching: false}))
  }

  onSearch(e) {
    this.setState({ search: lower(e.target.value) }, () => {
      this.search();
    });
  }

  search() {
    const { search } = this.state;
    this.setState({ isFetching: true });
    findAdvertisements({ starts_with: search })
      .then(res =>
        this.setState({ advertisements: res.data.results, isFetching: false })
      )
      .catch(err =>
        this.setState({
          errorMessage:
            "Kon op dit moment geen advertenties ophalen. Probeer het later opnieuw.",
          isFetching: false
        })
      );
  }

  render() {
    const { advertisements, isFetching } = this.props;
    return (
      <div>
        <HeaderBar onSearch={this.onSearch} />
        <div className="Container">
          {isFetching ? (
            <NonIdealState visual={<Spinner />} />
          ) : (
            <AdvertisementList advertisements={advertisements} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { advertisements: store } = state;
  const { isFetching, advertisements } = store || {
    isFetching: true,
    advertisements: []
  };

  return {
    advertisements,
    isFetching
  };
};

export default connect(mapStateToProps)(AdvertisementListContainer);
