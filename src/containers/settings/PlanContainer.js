import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormGroup, Button, Callout, Intent, NonIdealState, Spinner, FileUpload } from "@blueprintjs/core";
import { PlanList } from "./../../components/Plan/PlanList.js";
import http from "./../../store/http.js";
import _ from "lodash";

class PlanContainer extends Component {
    static propTypes = {};

    constructor(props) {
        super(props)
        this.state = { plans: [], subscriptions: [], loading: false, upgrading: false }
    }

    componentDidMount() {
        this.setState({ loading: true })
        http.get('/plans')
            .then(res => res.data)
            .then(plans => this.setState({ plans }))
        http.get('/subscriptions')
            .then(res => res.data)
            .then(subscriptions => {
                const plans = this.state.plans.map(plan => {
                    plan.active = _.find(subscriptions, sub => sub.plan.id === plan.id) ? true : false;
                    return plan;
                })
                this.setState({ subscriptions, plans, loading: false })
            })
    }

    onUpgrade(plan) {
        this.setState({ upgrading: true })
        http.post('/subscriptions', {
            plan_id: plan.id,
            redirect_url: window.location.href
        })
            .then(res => res.data)
            .then(sub => window.location.replace(sub.checkout_url))
    }

    render() {
        const { plans, subscriptions, loading, upgrading } = this.state;

        return (
            <div className="pt-card mb-20">
                <div className="row">
                    <div className="col-lg-4">
                        <h3>Abonnement</h3>
                        <p>Je maakt standaard gebruik van een gratis abonnement.</p>
                        <p>Je kunt hier upgraden naar een betaald pakket.</p>
                    </div>
                    <div className="col-lg-8">
                        {loading && <NonIdealState visual={<Spinner />} />}
                        {!loading && <PlanList plans={plans} onUpgrade={(plan) => this.onUpgrade(plan)} loading={upgrading}/>}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(PlanContainer)