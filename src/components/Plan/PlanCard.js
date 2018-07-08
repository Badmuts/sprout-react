import React from "react";
import { Colors, Button } from "@blueprintjs/core";
import className from "classname";

const styles = {
	subtitle: {
		fontSize: '20px',
		color: Colors.GREEN3
	}
}

export const PlanCard = props => (
	<div className={className(props.className)}>
		<div className={className("pt-card", {
			"pt-interactive": !props.plan.active
		})}>
			<h3>{props.plan.name} {props.plan.active && <div className="pt-tag pt-intent-success">Actief</div>}</h3>
			<p style={styles.subtitle}>&euro; {props.plan.price} <small>/per maand</small></p>
			<Button className="pt-button pt-fill" disabled={props.plan.active} onClick={(e) => props.onUpgrade(props.plan)} loading={props.loading}>Upgrade</Button>
		</div>
	</div>
)