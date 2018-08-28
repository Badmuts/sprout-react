import React from "react";
import { PlanCard } from "./PlanCard.js";

export const PlanList = props => (<div className="row">
	{props.plans.map(plan => <PlanCard key={plan.id} plan={plan} onUpgrade={props.onUpgrade} className="col-xs-5" {...props} />)}
</div>)