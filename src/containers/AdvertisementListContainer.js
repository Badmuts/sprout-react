import React, { Component } from 'react';
import AdvertisementList from '../components/AdvertisementList';
import { findAdvertisements } from '../endpoints/advertisement';
import {NonIdealState, Spinner} from '@blueprintjs/core';

export default class AdvertisementListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { advertisements: [], loading: true };
    }

    componentDidMount() {
        findAdvertisements()
            .then(res => this.setState({ advertisements: res.data.results, loading: false }))
            .catch(err => this.setState({ errorMessage: "Kon op dit moment geen advertenties ophalen. Probeer het later opnieuw.", loading: false}))
    }

    render() {
        const { advertisements, loading } = this.state;
        return (
            <div className="Container">
                {loading 
                    ? (<NonIdealState visual={<Spinner />} />)
                    : (<AdvertisementList advertisements={advertisements} />)}
            </div>
        );
    }
}
