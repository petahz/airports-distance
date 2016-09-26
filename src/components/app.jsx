import React from 'react';
import { connect } from 'react-redux';
import AjaxRequest from './ajax/ajax-request';
import AirportDistance from './airport/airport-distance';
import AirportDistanceResults from './airport/airport-distance-results';
import CodeBlock from './common/code-block';
import HeroHeading from './common/hero-heading';
import Tabs from './tabs/tabs';
import Panel from './common/panel';
import Footer from './common/footer';

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

                { /* Render AJAX example */ }
                <Panel
                    faIcon="plane"
                    style={style.panel}
                    title="How far are two U.S. airports?">
                    <AirportDistance />
                    <AirportDistanceResults />
                </Panel>

                <Panel
                    faIcon="tree"
                    style={style.panel}
                    title="Redux State" >
                    <CodeBlock code={state} />
                </Panel>

            </section>

            { /* Render footer */ }

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
