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
    this.centerLat = common.findMidPoint(this.props.firstAirport.lat, this.props.secondAirport.lat);
    this.centerLng = common.findMidPoint(this.props.firstAirport.lon, this.props.secondAirport.lon);
  }

  render() {
    if (this.props.firstAirport && this.props.secondAirport && this.props.distance) {
      return (
        <div style={{...styles.forms}}>
          <p>The distance between {this.props.firstAirport.code} and {this.props.secondAirport.code} is {Math.round(this.props.distance)} nautical miles.</p>
          <Map google={window.google} zoom={4} initialCenter={{lat: this.centerLat, lng: this.centerLng}} containerStyle={{...styles.mapContainerStyle}} style={{...styles.map}}>
            <Marker
              name={this.props.firstAirport.name}
              position={{lat: this.props.firstAirport.lat, lng: this.props.firstAirport.lon}}/>
            <Marker
              name={this.props.secondAirport.name}
              position={{lat: this.props.secondAirport.lat, lng: this.props.secondAirport.lon}} />
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
        firstAirport : state.model.firstAirport,
        secondAirport : state.model.secondAirport,
        distance: state.distance
    }),
    { }

)(AirportDistanceResults);