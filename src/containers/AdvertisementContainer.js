import React, { Component } from 'react';
import AdvertisementList from '../components/AdvertisementList';
import { findAdvertisements } from '../endpoints/advertisement';

export default class AdvertisementContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { advertisements: [] };
    }

    componentDidMount() {
        findAdvertisements()
            .then((res) => this.setState({ advertisements: res.data.results }))
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
