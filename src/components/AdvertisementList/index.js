import React, { Component } from 'react';

export default class AdvertisementList extends Component {
  render() {    
    return (
      <div>
        <ul>{this.props.advertisements.map(this.renderAdvertisment)}</ul>
      </div>
    );
  }

  renderAdvertisment(ad) {
    return (<li key={ad.id}>Aantal: {ad.amount}, Prijs: &euro; {ad.price}, Bedrijf: {ad.company.name}</li>)
  }
}
