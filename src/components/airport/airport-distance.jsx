import React from 'react';
import { connect } from 'react-redux';
const usAirports = require('../../common/us_airports.json');
import { setModelValue, setDistance } from '../../redux/actions/action-creators';
import { fetchDistance } from '../../redux/actions/thunk-action-creators';
import DataAccessService from '../../services/data/data-access-service';
import onTouchTap from 'react-tap-event-plugin';
import AutoComplete from 'material-ui/AutoComplete';

export class AirportDistance extends React.Component {

  constructor(props) {
    console.log('props: ', props);
    super(props);

    this.setDistance = props.setDistance;

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

  fetchDistance = () => {
    if (this.props.firstAirport && this.props.secondAirport.code ) {
      this.props.setModelValue('firstAirportResult', this.props.firstAirport);
      this.props.setModelValue('secondAirportResult', this.props.secondAirport);
      var url = "/get-distance?fromAirportCode=" + this.props.firstAirport.code + "&toAirportCode=" + this.props.secondAirport.code;
      console.log('url: ', url);
      DataAccessService.get(url).then(response => {
        console.log('response: ', response);
        this.setDistance(response.distance);
      });
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
            className="button-primary"
            onClick={this.fetchDistance}>
            Submit
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
    alignItems: 'center'
  }
}

export default connect(
    (state) => ({
        firstAirport : state.model.firstAirport,
        secondAirport : state.model.secondAirport
    }),
    { setModelValue, setDistance, fetchDistance }

)(AirportDistance);