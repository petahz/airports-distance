import React from 'react';
import { connect } from 'react-redux';
import { LoadingIndicator } from '../../common';
import { resetEntity, deleteEntity } from '../../../redux/actions/action-creators';
import moment from 'moment';

class Entity extends React.Component {

    constructor(props) {
        super(props);
        this._resetEntity = this._resetEntity.bind(this);
        this._deleteEntity = this._deleteEntity.bind(this);
    }

    componentWillMount() {
        if (this.props.runFetchEntityOnMount) {
            this.props.fetchEntity();
        }
    }

    render() {

        const { name, entity } = this.props;

        if (_.isEmpty(entity)) {
            return this._renderEntityDoesNotExist(name);
        }

        const { isFetching, data, error } = entity;

        if (error) {
            return (
                <div>
                    <div>Fetch for <code>{name}</code> failed.</div>
                    { this._renderButtons(isFetching, data, error) }
                </div>
            );
        }

        return (
            <div style={style.container}>
                { this._renderContent(name, entity)}
                { this._renderLoadingIndicator(isFetching) }
                { this._renderButtons(isFetching, data) }
            </div>
        );
    }

    _renderEntityDoesNotExist(entityName) {
        return (
            <div style={style.container}>
                <div>
                    Entity <code>{entityName}</code> doesn't&nbsp;
                    exist on <code>model</code>
                </div>
                { this._renderFetch() }
            </div>
        )
    }

    _renderContent(name, entity) {
        const { isFetching, data, lastUpdated } = entity;
        if (!_.isEmpty(data)) {
            return (
                <div style={isFetching ? style.fetching : {}}>
                    Fetch for <code>{ name }</code>&nbsp;
                    took <code>{ data.delay }</code> sec @&nbsp;
                    <code>{ moment(lastUpdated).format('LTS') }</code>
                </div>
            )
        }
        return (
            <div style={isFetching ? style.fetching : {}}>
                {
                    isFetching
                        ? <span>Fetching fresh data!</span>
                        : <span>Entity <code>{name}</code> is reset.</span>
                }
            </div>
        )
    }

    _renderLoadingIndicator(isFetching) {
        if (isFetching) {
            return <LoadingIndicator />;
        }
    }

    _renderButton(label, onClick) {
        return (
            <button
                className="button-primary"
                onClick={onClick}>
                { label }
            </button>
        );
    }

    _renderFetch() {
        return this._renderButton("Fetch", this.props.fetchEntity);
    }

    _renderReset() {
        return this._renderButton("Reset", this._resetEntity);
    }

    _renderDelete() {
        return this._renderButton("Delete", this._deleteEntity);
    }

    _renderButtons(isFetching, data, error) {
        if (isFetching) {
            return <span />
        }
        if (!_.isEmpty(data) || error) {
            return [
                this._renderFetch(),
                this._renderReset(),
                this._renderDelete()
            ].map((button, index) => (
                <span key={index}>{button}</span>
            ))
        } else {
            return [
                this._renderFetch(),
                this._renderDelete()
            ].map((button, index) => (
                <span key={index}>{button}</span>
            ))
        }
    }

    _deleteEntity() {
        const { name, deleteEntity } = this.props;
        deleteEntity(name);
    }

    _resetEntity() {
        const { name, resetEntity } = this.props;
        resetEntity(name, Date.now());
    }

}

const style = {
    container: {
        marginBottom: 20
    },
    fetching: {
        color: '#BDBDBD',
        fontStyle: 'italic'
    }
};

Entity.propTypes  = {
    name: React.PropTypes.string.isRequired,
    entity: React.PropTypes.shape({
        isFetching: React.PropTypes.bool,
        lastUpdated: React.PropTypes.number,
        data: React.PropTypes.object,
        error: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.string
        ])
    }),
    runFetchEntityOnMount: React.PropTypes.bool,
    fetchEntity: React.PropTypes.func.isRequired,
    resetEntity: React.PropTypes.func.isRequired,
    deleteEntity: React.PropTypes.func.isRequired
};

export default connect (null, {
    resetEntity,
    deleteEntity
})(Entity);