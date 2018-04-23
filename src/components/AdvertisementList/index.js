import React, { Component } from "react";
import { Card, Slider, Checkbox } from "@blueprintjs/core";
import "./style.css";

const renderImage = ad => {
  if (ad.image) {
    return <img src={ad.image.url} alt={ad.title} className="col-xs" />;
  }
  return <span className="fa fa-fw fa-lg fa-leaf" />;
};

export default class AdvertisementList extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-3">
          <h4 style={{ marginBottom: '23px'}}>Filter</h4>
          <div className="" style={{ marginBottom: '17px'}}>
            <div>
              <div className="pt-tag pt-tag-removable pt-intent-success">
                > 10.000
                <button className="pt-tag-remove"></button>
              </div>
              <div className="pt-tag pt-tag-removable pt-intent-success">
                Nieuw
                <button className="pt-tag-remove"></button>
              </div>
            </div>
          </div>

          <p><strong>Minimum aantal</strong></p>
          <div className="col-xs-10" style={{ marginBottom: '17px'}}>
            <Slider
                  min={0}
                  max={100000}
                  stepSize={10000}
                  labelStepSize={25000}
                  showTrackFill={true}
                  value={15000}
                  renderLabel={val => new Intl.NumberFormat().format(val)}
              />
          </div>

          <p><strong>Status</strong></p>
          <div className="col-xs-10" style={{ marginBottom: '17px'}}>
            <Checkbox readOnly checked={true} label="Nieuw" />
            <Checkbox readOnly checked={false} label="2-jarig" />
            <Checkbox readOnly checked={false} label="Jong" />
          </div>

          <p><strong>Locatie</strong></p>
          <div className="col-xs-10" style={{ marginBottom: '17px'}}>
            <Slider
                  min={0}
                  max={100}
                  stepSize={10}
                  labelStepSize={25}
                  showTrackFill={true}
                  value={100}
                  renderLabel={val => new Intl.NumberFormat().format(val) + ' km'}
              />
          </div>
        </div>
        <div className="col-xs-9">
          <h4 style={{marginBottom: '23px'}}>Resultaten ({this.props.advertisements.length})</h4>
          {this.props.advertisements.map(this.renderAdvertisment)}
        </div>
      </div>
    );
  }

  renderAdvertisment(ad) {
    return (
      <Card key={ad.id} className="row top-xs Advertisement">
        <div className="Advertisement-image middle-xs">{renderImage(ad)}</div>
        <div className="col-xs-6">
          <h4>{ad.title}</h4>
          <p>{ad.amount}</p>
          <h6>&euro; {ad.price} <small>p/stk.</small></h6>
        </div>
        <div className="col-xs-3">
          <p>{ad.company.name}</p>
        </div>
      </Card>
    );
  }
}
