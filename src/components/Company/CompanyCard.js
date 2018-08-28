import React from "react";
import { Card, Button, AnchorButton, Intent } from "@blueprintjs/core";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import './CompanyCard.css'

const CompanyCard = ({ company }) => (
	<Card className="company-card" interactive={true}>
		<header>
			<p>
				<Link to={`/c/${company.id}`}>{company.name}</Link> <br/>
				<span className="sub">{company.city}</span>
			</p>
			{company.logo
				? <img src={`${company.logo}`} alt="" className="avatar"/>
				: <img src="https://pbs.twimg.com/profile_images/826909743570677762/AyYK4DFf_400x400.jpg" alt="" className="avatar"/>}
			
		</header>
		<address style={{display: 'none'}}>
			Plaats: {company.city} <br />
			Mobiel: {company.phone}
		</address>
		<div className="row">
			<div className="col-xs">
				<div className="pt-button-group pt-minimal company-action-bar pt-fill">
					<Button intent={Intent.SUCCESS}><span className="fa fa-fw fa-envelope"></span> Email</Button>
					<AnchorButton href={`https://api.whatsapp.com/send?phone=${company.phone}`} target="_blank"><span className="fa fa-fw fa-whatsapp"></span> Whatsapp</AnchorButton>
					<AnchorButton href={`tel:${company.phone || '0031611230747'}`}><span className="fa fa-fw fa-phone"></span> Mobiel</AnchorButton>
				</div>
			</div>
		</div>
	</Card>
)

CompanyCard.defaultProps = {
	company: {
		name: '',
		city: '',
		phone: '0031611230747'
	}
}

CompanyCard.propTypes = {
	company: PropTypes.object.isRequired
}

export default CompanyCard;