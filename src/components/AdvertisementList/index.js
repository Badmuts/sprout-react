import React, { Component } from "react";
import { Card } from "@blueprintjs/core";
import "./style.css";

const renderImage = ad => {
  if (ad.image) {
    return <img src={ad.image.url} alt={ad.title} className="col-xs" />;
  }
  return <span className="fa fa-fw fa-lg fa-leaf" />;
};

export default class AdvertisementList extends Component {
  render() {
    return <div>{this.props.advertisements.map(this.renderAdvertisment)}</div>;
  }

  renderAdvertisment(ad) {
    return (
      <Card key={ad.id} className="row top-xs Advertisement">
        <div className="Advertisement-image middle-xs">{renderImage(ad)}</div>
        <div className="col-xs-6">
          <h5>{ad.title}</h5>
          <p>{ad.amount}</p>
          <p>&euro; {ad.price}</p>
        </div>
        <div className="col-xs-3">
          <p>{ad.company.name}</p>
        </div>
      </Card>
    );
  }
}
