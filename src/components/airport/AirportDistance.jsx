import React from 'react';
import { connect } from 'react-redux';
const usAirports = require('../../common/us_airports.json');
import { setModelValue } from '../../redux/actions/action-creators';
import { fetchDistance } from '../../redux/actions/thunk-action-creators';
import AutoComplete from 'material-ui/AutoComplete';

export class AirportDistance extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: usAirports,
    };
  }

  setFirstAirport = (value) => {
    this.props.setModelValue('firstAirport', value);
  }

  setSecondAirport = (value) => {
    this.props.setModelValue('secondAirport', value);
  }

  dataSourceConfig = {
    text: 'name',
    value: 'code',
  }

  getDistance = () => {
    if (this.props.firstAirport && this.props.secondAirport.code ) {
      this.props.setModelValue('firstAirportResult', this.props.firstAirport);
      this.props.setModelValue('secondAirportResult', this.props.secondAirport);
      this.props.fetchDistance(this.props.firstAirport.code, this.props.secondAirport.code);
    }
  }

  render() {
    return (
      <div style={{...styles.forms}}>
        <AutoComplete
          hintText="U.S. Airports"
          dataSource={this.state.dataSource}
          dataSourceConfig={this.dataSourceConfig}
          filter={AutoComplete.caseInsensitiveFilter}
          onNewRequest={this.setFirstAirport}
          floatingLabelText="Select the first airport"
          maxSearchResults={5}
        />
        <AutoComplete
          hintText="U.S. Airports"
          dataSource={this.state.dataSource}
          dataSourceConfig={this.dataSourceConfig}
          filter={AutoComplete.caseInsensitiveFilter}
          onNewRequest={this.setSecondAirport}
          floatingLabelText="Select the second airport"
          maxSearchResults={5}
        />
        <button
            ref="submit"
            className="button-primary"
            onClick={this.getDistance}>
            Calculate
        </button>
      </div>
    );
  }
}

const styles = {
  forms: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '25px'
  }
}

export default connect(
    (state) => ({
        firstAirport : state.model.firstAirport,
        secondAirport : state.model.secondAirport
    }),
    { setModelValue, fetchDistance }

)(AirportDistance);