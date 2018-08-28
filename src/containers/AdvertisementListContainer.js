import React, { Component } from "react";
import AdvertisementList from "../components/AdvertisementList";
import HeaderBar from "../components/HeaderBar";
import { findAdvertisements } from "../endpoints/advertisement";
import { NonIdealState, Spinner } from "@blueprintjs/core";
import debounce from "lodash/debounce";
import lower from "lodash/toLower";

export default class AdvertisementListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { advertisements: [], loading: true, search: "" };
    this.onSearch = this.onSearch.bind(this);
    this.search = debounce(this.search, 250);
  }

  componentDidMount() {
    const { search } = this.state;
    findAdvertisements(search)
      .then(res =>
        this.setState({ advertisements: res.data.results, loading: false })
      )
      .catch(err =>
        this.setState({
          errorMessage:
            "Kon op dit moment geen advertenties ophalen. Probeer het later opnieuw.",
          loading: false
        })
      );
  }

  onSearch(e) {
    this.setState({ search: lower(e.target.value) }, () => {
      this.search();
    });
  }

  search() {
    const { search } = this.state;
    this.setState({ loading: true });
    findAdvertisements({ title: search })
      .then(res =>
        this.setState({ advertisements: res.data.results, loading: false })
      )
      .catch(err =>
        this.setState({
          errorMessage:
            "Kon op dit moment geen advertenties ophalen. Probeer het later opnieuw.",
          loading: false
        })
      );
  }

  render() {
    const { advertisements, loading } = this.state;
    return (
      <div>
        <HeaderBar onSearch={this.onSearch} />
        <div className="Container">
          {loading ? (
            <NonIdealState visual={<Spinner />} />
          ) : (
            <AdvertisementList advertisements={advertisements} />
          )}
        </div>
      </div>
    );
  }
}
