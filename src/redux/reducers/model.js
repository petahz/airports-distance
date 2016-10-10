import { INITIAL_STATE } from '../../common/app-const';
import {
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    SET_FIRST_AIRPORT,
    SET_SECOND_AIRPORT,
    SET_FIRST_AIRPORT_RESULT,
    SET_SECOND_AIRPORT_RESULT,
    SET_MODEL_VALUE,
    RESET_ENTITY,
    DELETE_ENTITY
} from '../actions/types';

const model = (state = INITIAL_STATE.model, action) => {
    switch(action.type) {
        case DELETE_ENTITY: {
            delete state[action.entity];
            return {
                ...state
            }
        }
        case RESET_ENTITY:  // fall through
        case FETCH_SUCCESS: // fall through
        case FETCH_FAILURE: // fall through
        case FETCH_REQUEST: {
            return {
                ...state,
                [action.entity]: entity(
                    state[action.entity],
                    action
                )
            }
        }
        case SET_MODEL_VALUE: {
            return {
                ...state,
                [action.entity]: action.value
            }
        }
        default: {
            return state;
        }
    }
};

const INITIAL_ENTITY_STATE = {
    isFetching: false,
    lastUpdated: undefined,
    data: {}
};

const entity = (
    state = INITIAL_ENTITY_STATE,
    action
) => {
    switch(action.type) {
        case FETCH_REQUEST: {
            return {
                ...state,
                isFetching: true
            }
        }
        case FETCH_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                data: action.data,
                lastUpdated: action.lastUpdated
            }
        }
        case FETCH_FAILURE: {
            return {
                ...state,
                isFetching: false,
                error: action.error,
                lastUpdated: action.lastUpdated
            }
        }
        case RESET_ENTITY: {
            return {
                ...INITIAL_ENTITY_STATE,
                lastUpdated: action.lastUpdated
            }
        }                
        default: {
            return state;
        }
    }
};


export default model;
