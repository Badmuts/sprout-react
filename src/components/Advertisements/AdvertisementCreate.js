import React, { Component } from "react";
import { FileUpload, FormGroup, Button, TextArea, NonIdealState } from '@blueprintjs/core';
import PropTypes from "prop-types";
import map from 'lodash/map';

export class AdvertisementCreate extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        isSaving: PropTypes.bool.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            advertisement_photos_attributes: [],
            ad_type: 'supply'
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onUpload(e) {
        if (e.target.files) {
            map(e.target.files, file => {
                const reader = new FileReader();
                reader.onload = () => {
                    const uploadedPhoto = {
                        photo: reader.result,
                        photo_file_name: file.name
                    }
                    this.setState({
                        advertisement_photos_attributes: [
                            ...this.state.advertisement_photos_attributes,
                            uploadedPhoto
                        ]
                    })
                }
                reader.readAsDataURL(file);
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="pt-card mb-20">
                        <div className="row">
                            <div className="col-lg-4">
                                <h3>Advertentie plaatsen</h3>
                                <p>Dit zijn de bedrijfsgegevens die gebruikt worden voor de website.</p>
                                <p>Deze gegevens zijn zichtbaar in het vraag &amp; aanbod.</p>
                            </div>
                            <div className="col-lg-8">
                                <FormGroup
                                    label="Productnaam"
                                    labelFor="title"
                                    required={true}
                                >
                                    <div className="pt-select pt-fill pt-large">
                                        <select name="ad_type" id="ad_type" onChange={this.handleInputChange} value={this.state.ad_type}>
                                            {/* <option selected>Choose an item...</option> */}
                                            <option value="supply">Aanbod</option>
                                            <option value="demand">Vraag</option>
                                        </select>
                                    </div>
                                </FormGroup>
                                <FormGroup
                                    label="Productnaam"
                                    labelFor="title"
                                    required={true}
                                >
                                    <input onChange={this.handleInputChange} className="pt-input pt-fill pt-large" name="title" id="title" value={this.state.title} type="text" placeholder="Taxus Baccata" required />
                                </FormGroup>
                                <FormGroup
                                    label="Prijs"
                                    labelFor="price"
                                    required={true}
                                >
                                    <input onChange={this.handleInputChange} className="pt-input pt-fill pt-large" name="price" id="price" value={this.state.price} type="text" placeholder="€1,99" required />
                                </FormGroup>
                                <FormGroup
                                    label="Hoeveelheid"
                                    labelFor="amount"
                                    required={true}
                                >
                                    <input onChange={this.handleInputChange} className="pt-input pt-fill pt-large" name="amount" id="amount" value={this.state.amount} type="number" placeholder="5000" required />
                                </FormGroup>
                                <FormGroup
                                    label="Leverbaar vanaf"
                                    labelFor="delivery_date_from"
                                    required={true}
                                >
                                    <input onChange={this.handleInputChange} className="pt-input pt-fill pt-large" name="delivery_date_from" id="delivery_date_from" value={this.state.delivery_date_from} type="date" placeholder="5.000" required />
                                </FormGroup>
                                <FormGroup
                                    label="Beschrijving"
                                    labelFor="body"
                                    required={true}
                                >
                                    <TextArea
                                        id="body"
                                        className="pt-fill"
                                        large={true}
                                        onChange={this.handleInputChange}
                                        name="body"
                                        value={this.state.body}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                    <div className="pt-card mb-20">
                        <div className="row">
                            <div className="col-lg-4">
                                <h3>Advertentie foto's</h3>
                                <p>Je kunt maximaal 4 afbeelding plaatsen bij je advertentie.</p>
                                <p>Door gebruik te maken van afbeeldingen zal je advertentie beter opvallen tussen het vraag &amp; aanbod.</p>
                            </div>
                            <div className="col-lg-8">
                                <label className="pt-button pt-icon-upload mb-20">
                                    Foto's toevoegen
                                    <FileUpload onInputChange={this.onUpload} inputProps={{accept: "image/*", multiple: true}} style={{display:'none'}}/>
                                </label>
                                <div className="row Advertisement-image-bar">
                                    {this.state.advertisement_photos_attributes.map(photo => (
                                        <div key={photo.photo_file_name} className="col-xs"><img className="fa image-placeholder Advertisement-image-small" src={photo.photo} /></div>
                                    ))}
                                </div>
                                {!this.state.advertisement_photos_attributes.length && <div className="row"><NonIdealState
                                    visual="media"
                                    title="Nog geen foto's geplaatst"
                                /></div>}
                                <Button type="submit" className="pt-intent-success pt-large" loading={this.props.isSaving}>Opslaan</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default AdvertisementCreate;