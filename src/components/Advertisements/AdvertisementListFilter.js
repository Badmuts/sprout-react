import React from "react";
import { Card, Slider, Checkbox } from "@blueprintjs/core";

export const AdvertisementListFilter = props => (
<div>
  <h4 style={{ marginBottom: '23px'}}>Filter</h4>
  {(props.filters && props.filters.length) 
    ? (<div style={{ marginBottom: '17px'}}>
        <div className="pt-tag pt-tag-removable pt-intent-success">
          > 10.000
          <button className="pt-tag-remove"></button>
        </div>
        <div className="pt-tag pt-tag-removable pt-intent-success">
          Nieuw
          <button className="pt-tag-remove"></button>
        </div>
      </div>)
    : (<p className="pt-text-color-muted">Geen actieve filters</p>)
  }

  <p><strong>Minimum aantal</strong></p>
  <div className="col-xs-10" style={{ marginBottom: '17px'}}>
    <Slider
          min={0}
          max={100000}
          stepSize={10000}
          labelStepSize={25000}
          showTrackFill={true}
          value={0}
          renderLabel={val => new Intl.NumberFormat().format(val)}
      />
  </div>

  <p style={{display: 'none'}}><strong>Status</strong></p>
  <div className="col-xs-10" style={{ marginBottom: '17px', display: 'none'}}>
    <Checkbox readOnly checked={true} label="Nieuw" />
    <Checkbox readOnly checked={false} label="2-jarig" />
    <Checkbox readOnly checked={false} label="Jong" />
  </div>

  <p style={{display: 'none'}}><strong>Locatie</strong></p>
  <div className="col-xs-10" style={{ marginBottom: '17px', display: 'none'}}>
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
)