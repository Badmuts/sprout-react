import React, { Component } from 'react';
import { Card } from '@blueprintjs/core';

export default class AdvertisementList extends Component {
  render() {    
    return (
      <div>
        {this.props.advertisements.map(this.renderAdvertisment)}
      </div>
    );
  }

  renderAdvertisment(ad) {
    return (
      <Card key={ad.id} className="row top-xs">
        <div className="col-xs-3"><img src="http://placehold.it/200x200" alt={ad.title} className="col-xs"/></div>
        <div className="col-xs-6">
          <h5>{ad.title}</h5>
          <p>{ad.amount}</p>
          <p>&euro; {ad.price}</p>
        </div>
        <div className="col-xs-3">
          <p>{ad.company.name}</p>
        </div>
      </Card>
    )
  }
}
