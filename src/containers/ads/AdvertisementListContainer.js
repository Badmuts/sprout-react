import React, { Component } from "react";
import AdvertisementList from "../../components/Advertisements/AdvertisementList";
import { AdvertisementListFilter } from "../../components/Advertisements/AdvertisementListFilter";
import HeaderBar from "../../components/HeaderBar";
import { NonIdealState, Spinner } from "@blueprintjs/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {fetchAdvertisements} from "../../store/Advertisements/actions"

class AdvertisementListContainer extends Component {
  static propTypes = {
    advertisements: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.object
    // dispatch: PropTypes.func.isRequired,
    // searchQuery: PropTypes.object.isRequired,
    // searchResults: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.fetchAdvertisements()
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
            <div className="row">
              <div className="col-xs-3">
                <AdvertisementListFilter {...this.props} />
              </div>
              <div className="col-xs-9">
                <AdvertisementList {...this.props} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.Advertisements;
};

export default connect(mapStateToProps, {
  fetchAdvertisements: fetchAdvertisements
})(AdvertisementListContainer);
