import React, { Component } from "react";
import HeaderBar from "../../components/HeaderBar";
import { connect } from "react-redux";
import { AdvertisementCreate } from "../../components/Advertisements/AdvertisementCreate";
import { createAdvertisement } from "../../store/Advertisements/actions";

class AdCreateContainer extends Component {
    render() {
        return (
            <div>
                <HeaderBar />
                <div className="Container">
                    <AdvertisementCreate {...this.props} />
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    isSaving: state.Advertisements.isSaving
}), {
    onSubmit: createAdvertisement
})(AdCreateContainer);