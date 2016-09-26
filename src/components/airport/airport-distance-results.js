import React from 'react';
import { connect } from 'react-redux';
import DataAccessService from '../../services/data/data-access-service';

export class AirportDistanceResults extends React.Component {

  constructor(props) {
    console.log('props: ', props);
    super(props);
  }

  render() {
    if (this.props.firstAirport && this.props.secondAirport && this.props.distance) {
      return (
        <div style={{...styles.forms}}>
          <h3>The distance between {this.props.firstAirport.code} and {this.props.secondAirport.code} is {this.props.distance} nautical miles.</h3>
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
    alignItems: 'center'
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