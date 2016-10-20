import React from 'react';
import { connect } from 'react-redux';
import AirportDistance from './airport/airport-distance';
import AirportDistanceResults from './airport/airport-distance-results';
import CodeBlock from './common/code-block';
import HeroHeading from './common/hero-heading';
import Panel from './common/panel';

function App ({
    children,
    state,
    location
}) {
    return (
        <section style={style.wrapper}>

            <HeroHeading
                title="Airport Distance"
                subtitle="A calculator of nautical miles between U.S. airports"
            />

            <section style={style.container}>

                <Panel
                    faIcon="plane"
                    style={style.panel}
                    title="How far are two U.S. airports?">
                    <AirportDistance />
                    <AirportDistanceResults />
                </Panel>

                { // Nice for debugging to see entire Redux store
                // Probably a Chrome extension that does the same
                <Panel
                    faIcon="tree"
                    style={style.panel}
                    title="Redux State" >
                    <CodeBlock code={state} />
                </Panel> 
                }

            </section>

        </section>
    )
}

const style = {
    wrapper: {
        width: '100%'
    },
    container: {
        width: '100%',
        minWidth: 450,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    panel: {
        width: 900
    }
};

export default connect(
    (state) => ({ state })
)(App);
