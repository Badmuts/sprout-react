import React, { Component } from 'react';
import AdvertisementList from '../components/AdvertisementList';
import { findAdvertisements } from '../endpoints/advertisement';

export default class AdvertisementListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { advertisements: [] };
    }

    componentDidMount() {
        findAdvertisements()
            .then(res => this.setState({ advertisements: res.data.results }))
            .catch(err => this.setState({ errorMessage: "Kon op dit moment geen advertenties ophalen. Probeer het later opnieuw."}))
    }

    render() {
        const { advertisements } = this.state;
        return (
            <div>
                <h1>Advertenties</h1>
                <AdvertisementList advertisements={advertisements} />
            </div>
        );
    }
}
