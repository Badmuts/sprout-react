import React from "react";
import { Link } from 'react-router-dom';
import { Card } from "@blueprintjs/core";
import PropTypes from "prop-types";
import _ from 'lodash';
import "./style.css";

const AdvertisementDetail = props => (
  <Card className={props.className}>
    <div className="row">
      <div className="col-xs-7">
      <div className="row">
        <div className="col-xs">
          {props.ad.advertisement_photos && props.ad.advertisement_photos.length
            ? <img className="image-placeholder Advertisement-image-big" src={_.head(props.ad.advertisement_photos).photo} />
            : <img className="fa image-placeholder Advertisement-image-big" src="#" />}
        </div>
      </div>
       <div className="row Advertisement-image-bar">
         {_.tail(props.ad.advertisement_photos).map(photo => <div className="col-xs"><img className="fa image-placeholder Advertisement-image-small" src={photo.photo} /></div>)}
       </div>
      </div>
      <div className="col-xs-5">
        <h1>{props.ad.title}</h1>
        <div className="row">
          <div className="col-xs">
            <span>Prijs</span>
            <h4>&euro; {props.ad.price}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-xs">
            <span>Voorraad</span>
            <h5>{props.ad.amount}</h5>
          </div>
          <div className="col-xs">
            <span>Kwaliteit</span>
            <h5>{props.ad.quality || '-'}</h5>
          </div>
          <div className="col-xs">
            <span>Leverbaar vanaf</span>
            <h5>{props.ad.delivery_date_from || '-'}</h5>
          </div>
        </div>
        
      </div>
    </div>
    <div className="row">
      <div className="col-xs">
        <h1>{props.ad.title}</h1>
        <p>{props.ad.body}</p>
      </div>
    </div>
  </Card>
)

AdvertisementDetail.propTypes = {
  ad: PropTypes.object.isRequired
}

export default AdvertisementDetail;
