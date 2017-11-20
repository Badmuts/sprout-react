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
      <Card key={ad.id} className="row middle-xs">
        <div className="col-xs"><p>{ad.amount}</p></div>
        <div className="col-xs"><p>&euro; {ad.price}</p></div>
        <div className="col-xs"><p>{ad.title}</p></div>
        <div className="col-xs"><p>{ad.company.name}</p></div>
      </Card>
    )
  }
}
