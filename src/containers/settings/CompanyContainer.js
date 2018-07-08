import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormGroup, Button, Callout, Intent, NonIdealState, Spinner, FileUpload } from "@blueprintjs/core";
import { updateCompany, logoUpload, fetchCompanyByID, photoUpload } from '../../store/Companies/actions';
import merge from 'lodash/merge'
import find from 'lodash/find'

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
            name: this.props.company.name,
            address: this.props.company.address,
            zipcode: this.props.company.zipcode,
            city: this.props.company.city,
            country: this.props.company.country || 'Nederland'
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onLogoUpload = this.onLogoUpload.bind(this);
        this.onPhotoUpload = this.onPhotoUpload.bind(this);
    }

    componentDidMount() {
        this.props.fetchCompanyByID(this.props.company.id)
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(merge({}, this.props.company, this.state))
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onLogoUpload(e) {
        e.preventDefault();
        this.props.onLogoUpload(this.props.company, e.target.files[0])
    }

    onPhotoUpload(e) {
        e.preventDefault();
        this.props.onPhotoUpload(this.props.company, e.target.files[0]);
    }

    renderUserTable(users) {
        if (!users) return null;
        return (
            <table class="pt-table pt-interactive">
                <thead>
                    <tr>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    render() {
        if (this.props.isFetching) return (<NonIdealState visual={<Spinner />} />)
        return (
            <div>
                <div className="pt-card mb-20">
                    <div className="row">
                        <div className="col-lg-4">
                            <h3>Bedrijf</h3>
                            <p>Dit zijn de bedrijfsgegevens die gebruikt worden voor de website.</p>
                            <p>Deze gegevens zijn zichtbaar in het vraag &amp; aanbod.</p>
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
                <div className="pt-card mb-20">
                    <div className="row">
                        <div className="col-lg-4">
                            <h3>Logo</h3>
                            <p>Dit logo is zichtbaar op je bedrijfspagina, e-mails en bij advertenties.</p>
                        </div>
                        <div className="col-lg-8">
                            {this.props.isUploading 
                                ? <NonIdealState visual={<Spinner />} />
                                : null }
                            {this.props.company.logo && !this.props.isUploading
                                ? (<p><img src={`${this.props.company.logo}`} /></p>) 
                                : (<p>Geen logo geüpload</p>)
                            }
                            <FileUpload text="Kies een afbeelding..." onInputChange={this.onLogoUpload} inputProps={{accept: "image/*"}}/>
                        </div>
                    </div>
                </div>
                <div className="pt-card mb-20">
                    <div className="row">
                        <div className="col-lg-4">
                            <h3>Bedrijfsfoto's</h3>
                            <p>Wil je je bedrijfspagina een extratje geven? Dan kan dat hier door foto's te uploaden. Deze worden weergegeven op je bedrijfspagina.</p>
                        </div>
                        <div className="col-lg-8">
                            <div className="row mb-20">
                                <label className="pt-button pt-icon-upload">
                                    Foto toevoegen
                                    <FileUpload onInputChange={this.onPhotoUpload} inputProps={{accept: "image/*"}} style={{display:'none'}}/>
                                </label>
                            </div>
                            {this.props.isPhotoUploading 
                                ? <NonIdealState visual={<Spinner />} />
                                : null }
                            <div className="row">
                                {this.props.company.photos && this.props.company.photos.map(photo => <img key={photo.id} src={photo.photo} className="col-lg" />)}
                                {!this.props.company.photos && <NonIdealState
                                    visual="media"
                                    title="Nog geen foto's geplaatst"
                                />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-card mb-20">
                    <div className="row">
                        <div className="col-lg-4">
                            <h3>Gebruikers</h3>
                            <p>Dit zijn de alle gebruikers die toegang hebben tot dit bedrijf.</p>
                            <p>Je kunt hier bestaande gebruikers verwijderen of nieuwe uitnodigen.</p>
                        </div>
                        <div className="col-lg-8">
                            <div className="row mb-20">
                                <Button iconName="add" disabled={true}>Gebruiker toevoegen</Button>
                            </div>
                            {this.props.company.users && this.renderUserTable(this.props.company.users)}
                            {!this.props.company.users && (
                                <NonIdealState
                                    visual="people"
                                    title="Nog geen extra gebruikers"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    company: find(state.Companies.companies, { id: state.AuthenticatedUser.user.company.id }) || { id: state.AuthenticatedUser.user.company.id },
    isSaving: state.Companies.isSaving,
    isFetching: state.Companies.isFetching,
    isUploading: state.Companies.isUploading,
    isPhotoUploading: state.Companies.isPhotoUploading,
    error: state.Companies.error,
}), {
    onSubmit: updateCompany,
    onLogoUpload: logoUpload,
    onPhotoUpload: photoUpload,
    fetchCompanyByID: fetchCompanyByID
})(CompanyContainer)