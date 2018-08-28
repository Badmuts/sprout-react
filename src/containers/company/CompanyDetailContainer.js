import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NonIdealState, Spinner } from "@blueprintjs/core";
import CompanyCard from "../../components/Company/CompanyCard"
import AdvertisementList from "../../components/Advertisements/AdvertisementList"

import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import { getAdvertisementsByCompany } from "./../../store/Advertisements/reducers"
import { fetchCompanyByID } from "./../../store/Companies/actions"

class CompanyDetailContainer extends Component {
	static propTypes = {
		company: PropTypes.object.isRequired
	}

	componentDidMount() {
		if (isEmpty(this.props.company)) {
			this.props.fetchCompanyByID(this.props.match.params.id);
		}
	}

	render() {
		if (this.props.isFetching) return <NonIdealState visual={<Spinner />} />;

		return (<div className="Container mt-20">
		<div className="row">
			<div className="col-xs-4">
				<CompanyCard {...this.props} />
			</div>
			<div className="col-xs-8">
				<h3>Bedrijf</h3>
				<p>{this.props.company.name}</p>
				<p>{this.props.company.address}</p>
				<p>{this.props.company.zipcode}</p>
				<p>{this.props.company.city}</p>
				<p>{this.props.company.country}</p>
				<div className="row">
					{this.props.company.photos && this.props.company.photos.map(photo => <img className="col-xs-4" height="200" key={photo.id} src={photo.photo} />)}
				</div>
				<h3>Advertenties</h3>
				<AdvertisementList {...this.props} />
			</div>
		</div>
	</div>)		
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		isFetching: state.Companies.isFetching,
		company: find(state.Companies.companies, {id: parseInt(ownProps.match.params.id)}) || {},
		advertisements: getAdvertisementsByCompany(state, parseInt(ownProps.match.params.id))
	}
}

export default connect(mapStateToProps, {
	fetchCompanyByID: fetchCompanyByID
})(CompanyDetailContainer);