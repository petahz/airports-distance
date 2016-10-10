import React from 'react';
import { connect } from 'react-redux';
import DataAccessService from '../../services/data/data-access-service';
import { Map, Marker } from 'google-maps-react';
import common from '../../common/common';

export class AirportDistanceResults extends React.Component {

  constructor(props) {
    super(props);
    this.props.google = window.google;
  }

  componentWillUpdate() {
    this.centerLat = common.findMidPoint(this.props.firstAirportResult.lat, this.props.secondAirportResult.lat);
    this.centerLng = common.findMidPoint(this.props.firstAirportResult.lon, this.props.secondAirportResult.lon);
  }

  render() {
    if (this.props.firstAirportResult && this.props.secondAirportResult && this.props.distance) {
      return (
        <div style={{...styles.forms}}>
          <p>The distance between {this.props.firstAirportResult.code} and {this.props.secondAirportResult.code} is {Math.round(this.props.distance)} nautical miles.</p>
          <Map google={window.google} zoom={4} initialCenter={{lat: this.centerLat, lng: this.centerLng}} containerStyle={{...styles.mapContainerStyle}} style={{...styles.map}}>
            <Marker
              name={this.props.firstAirportResult.name}
              position={{lat: this.props.firstAirportResult.lat, lng: this.props.firstAirportResult.lon}}/>
            <Marker
              name={this.props.secondAirportResult.name}
              position={{lat: this.props.secondAirportResult.lat, lng: this.props.secondAirportResult.lon}} />
          </Map>
        </div>
      );
    } else {
      return null;
    }
  }
}

const styles = {
  forms: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '25px'
  },
  map: {
    position: 'relative',
    width: '100vh',
    height: '100vh'
  },
  mapContainerStyle: {
    position: 'relative',
    width: '100vh',
    height: '100vh'
  }
}

export default connect(
    (state) => ({
        firstAirportResult : state.model.firstAirportResult,
        secondAirportResult : state.model.secondAirportResult,
        distance: state.distance
    }),
    { }

)(AirportDistanceResults);