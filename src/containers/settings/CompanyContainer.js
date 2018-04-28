import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormGroup, Button, Callout, Intent } from "@blueprintjs/core";
import { updateCompany } from '../../store/Companies/actions';
import merge from 'lodash/merge'

class CompanyContainer extends Component {
    static propTypes = {
        company: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired,
        isSaving: PropTypes.bool.isRequired,
        error: PropTypes.object
    };

    constructor(props) {
        super(props)
        this.state = {
            name: this.props.company.name || '',
            address: this.props.company.address || '',
            zipcode: this.props.company.zipcode || '',
            city: this.props.company.city || '',
            country: this.props.company.country || 'Nederland'
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(merge({}, this.props.company, this.state))
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="pt-card">
                <div className="row">
                    <div className="col-lg-4">
                        <h3>Bedrijf</h3>
                        <p>Dit zijn de bedrijfsgegevens die gebruikt worden voor de website.</p>
                        <p>Deze gegevens zijn zichtbaar in het vraag & aanbod.</p>
                    </div>
                    <div className="col-lg-8">
                        {this.props.error && (
                            <Callout iconName="error" intent={Intent.DANGER}>
                                <h5>Oeps!</h5>
                                {this.props.error.message}
                            </Callout>
                        )}
                        <form onSubmit={this.onSubmit}>
                            <FormGroup
                                label="Bedrijfsnaam"
                                labelFor="name"
                                required={true}
                            >
                                <input className="pt-input pt-fill pt-large" name="name" id="name" value={this.state.name} onChange={this.onChange}  type="name" placeholder="Sprout" required />
                            </FormGroup>
                            <FormGroup
                                label="Adres"
                                labelFor="address"
                                required={true}
                            >
                                <input className="pt-input pt-fill pt-large" name="address" id="address" value={this.state.address} onChange={this.onChange}  type="text" placeholder="Straatnaam 12" required />
                            </FormGroup>
                            <FormGroup
                                label="Postcode"
                                labelFor="zipcode"
                                required={true}
                            >
                                <input className="pt-input pt-fill pt-large" name="zipcode" id="zipcode" value={this.state.zipcode} onChange={this.onChange}  type="text" placeholder="1234 AA" required />
                            </FormGroup>
                            <FormGroup
                                label="Plaatsnaam"
                                labelFor="city"
                                required={true}
                            >
                                <input className="pt-input pt-fill pt-large" name="city" id="city" value={this.state.city} onChange={this.onChange}  type="text" placeholder="Amsterdam" required />
                            </FormGroup>
                            <FormGroup
                                label="Land"
                                labelFor="country"
                                required={true}
                            >
                                <input className="pt-input pt-fill pt-large" name="country" id="country" value={this.state.country} onChange={this.onChange}  type="text" placeholder="Nederland" required />
                            </FormGroup>
                            <Button type="submit" className="pt-intent-success pt-large" loading={this.props.isSaving}>Opslaan</Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    company: state.AuthenticatedUser.user.company,
    isSaving: state.Companies.isSaving,
    error: state.Companies.error
}), {
    onSubmit: updateCompany
})(CompanyContainer)