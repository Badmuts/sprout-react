import React, { Component } from "react";
import HeaderBar from "../../components/HeaderBar";
import { ErrorToaster } from "../../components/toaster";
import AdvertisementDetail from "../../components/Advertisements/AdvertisementDetail";
import { NonIdealState, Spinner, Intent } from "@blueprintjs/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import CompanyCard from "../../components/Company/CompanyCard"

import { fetchAdvertisementById } from './../../store/Advertisements/actions';

class AdDetailContainer extends Component {
  static propTypes = {
    ad: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.object
  }

  componentDidMount() {
    if (isEmpty(this.props.ad)) {
      this.props.dispatch(fetchAdvertisementById(this.props.match.params.id))
    }
  }

  render() {
    const { ad, isFetching } = this.props;

    if (this.props.error) {
      ErrorToaster.show({
        message: `Kon advertentie niet ophalen`, 
        intent: Intent.DANGER, 
        iconName: 'warning-sign'
      })
    }

    return (
      <div>
        <HeaderBar onSearch={this.onSearch} />
        <div className="Container">
          {isFetching ? (
            <NonIdealState visual={<Spinner />} />
          ) : (
            <div className="row">
              <div className="col-xs-8">
                <AdvertisementDetail {...this.props} />
              </div>
              <div className="col-xs-4">
                <CompanyCard company={this.props.ad.company} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const Advertisements = state.Advertisements;
  return {
    isFetching: Advertisements.isFetching,
    error: Advertisements.error,
    ad: find(state.Advertisements.advertisements, {id: parseInt(ownProps.match.params.id)}) || {}
  }
};

export default connect(mapStateToProps)(AdDetailContainer);