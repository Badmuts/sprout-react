import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Card, Slider, Checkbox } from "@blueprintjs/core";
import { AdvertisementListFilter } from './AdvertisementListFilter';
import "./style.css";

const renderImage = ad => {
  if (ad.advertisement_photos && ad.advertisement_photos.length) {
    return <img src={ad.advertisement_photos[0].photo} alt={ad.title} className="col-xs" />;
  }
  return <span className="fa fa-fw fa-lg fa-leaf" />;
};

export default class AdvertisementList extends Component {
  constructor(props) {
    super(props)
    this.renderAdvertisment = this.renderAdvertisment.bind(this)
  }

  render() {
    return (
      <div>
        <h4 style={{marginBottom: '23px'}}>Resultaten ({this.props.advertisements.length})</h4>
        {this.props.advertisements.map(this.renderAdvertisment)}
      </div>
    );
  }

  renderAdvertisment(ad) {
    if (!ad) return null
    return (
      <Card key={ad.id} className="row top-xs Advertisement">
        <div className="Advertisement-image middle-xs">{renderImage(ad)}</div>
        <div className="col-xs-9">
          <div className="row">
            <div className="col-xs-8">
              <h4><Link to={`/a/${ad.id}`}>{ad.title}</Link></h4>
              <p>{ad.body}</p>
            </div>
            <div className="col-xs-4">
              <address>
                <Link to={`/c/${ad.company.id}`}>{ad.company.name}</Link> <br />
                {ad.company.city}
              </address>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-2"><p>Prijs <br /> &euro; {ad.price} <small>p/stk.</small></p></div>
                <div className="col-xs-2"><p>Aantal <br />{ad.amount}</p></div>
                <div className="col-xs-3"><p>Leverbaar vanaf <br />{ad.delivery_date_from || '-'}</p></div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}
