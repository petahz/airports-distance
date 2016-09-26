import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import configureStore from './redux/store/configure-store';
import { INITIAL_STATE } from './common/app-const';
import babel from 'babel-polyfill';
import styles from './scss/style.scss';

ReactDOM.render(
    <MuiThemeProvider>
        <Root store={configureStore(INITIAL_STATE)} />
    </MuiThemeProvider>,
    document.getElementById('example-app')
);