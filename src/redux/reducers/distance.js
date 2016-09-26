import { INITIAL_STATE } from '../../common/app-const';
import { SET_DISTANCE } from '../actions/types';

const distance = (state = 0, action) => {
    switch(action.type) {
        case SET_DISTANCE: {
            return action.value;
            break;
        }
        default: {
            return state;
        }
    }
};

export default distance;