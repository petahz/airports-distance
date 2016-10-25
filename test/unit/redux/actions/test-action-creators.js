import expect from 'expect';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionCreators from '../../../../src/redux/actions/action-creators';
import {
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_FAILURE
} from  '../../../../src/redux/actions/types';

// Set up mock Redux store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Action Creators', () => {
    describe('Generic', () => {
        describe('invoking the makeActionCreator thunk', () => {

            let type, key1, key2, data1, data2;
            beforeEach(() => {
                type = 'FooType';
                key1 = 'key1';
                key2 = 'key2';
                data1 = 'data1';
                data2 = 'data2';
            });

            it('should return a function', () => {
                expect(
                    actionCreators.makeActionCreator(type, key1, key2)
                ).toBeA('function');
            });

            it('should throw an error if a type is not passed', () => {
                expect(() => {
                        actionCreators.makeActionCreator()
                }).toThrow('Type cannot be null/undefined');
            });

            describe('invoking the returned action creator', () => {
                it('should return an action containing the correct type and keys', () => {

                    const expectedAction = {
                        type,
                        key1: data1,
                        key2: data2
                    };

                    expect(
                        actionCreators.makeActionCreator(
                            type, key1, key2
                        )(data1, data2)
                    ).toEqual(expectedAction);
                });
            });

        });
        describe('invoking the makeEntityActionCreator thunk', () => {

            let type, entity, key1, key2, data1, data2;
            beforeEach(() => {
                type = 'FooType';
                entity = 'testModel';
                key1 = 'key1';
                key2 = 'key2';
                data1 = 'data1';
                data2 = 'data2';
            });

            it('should return a function', () => {
                expect(
                    actionCreators.makeEntityActionCreator(
                        type, entity, key1, key2
                    )
                ).toBeA('function');
            });

            it('should throw an error if a type is not passed', () => {
                expect(() => {
                        actionCreators.makeEntityActionCreator()
                }).toThrow('Type cannot be null/undefined');
            });

            it('should throw an error if an entity is not passed', () => {
                expect(() => {
                        actionCreators.makeEntityActionCreator(type)
                }).toThrow('Entity cannot be null/undefined');
            });

            describe('invoking the returned action creator', () => {
                it('should return an action containing the correct type and keys', () => {

                    const expectedAction = {
                        type,
                        entity,
                        key1: data1,
                        key2: data2
                    };

                    const actionCreator = actionCreators.makeEntityActionCreator(
                        type, entity, key1, key2
                    );

                    expect(
                        actionCreator(data1, data2)
                    ).toEqual(expectedAction);
                });
            });
        });
    });
    describe('setModelValue', () => {
        let store, getState;
        beforeEach(() => {
            getState = {};
            store = mockStore(getState);
        });

        it('should make an action creator for setting any model\'s value', () => {
            var airportValue = {code: 'JFK', name: 'John F. Kennedy Airport'};

            let action = actionCreators.setModelValue('firstAirport', airportValue);
            const expectedAction = {
                type: 'SET_MODEL_VALUE',
                entity: 'firstAirport',
                value: airportValue
            };

            expect(
                action
            ).toEqual(
                expectedAction
            );
        });
    });
    describe('API', () => {

        let store, getState, mockEntity;
        beforeEach(() => {
            mockEntity = 'mockEntity';
            getState = {};
            store = mockStore(getState);
        });

        describe('invoking the apiRequest action creator', () => {
            it('should create a FETCH_REQUEST action', () => {

                const fetchRequestAction = {
                    type: FETCH_REQUEST,
                    entity: mockEntity
                };

                // Under test
                store.dispatch(
                    actionCreators.apiRequest(mockEntity)()
                );

                expect(
                    store.getActions()
                ).toEqual(
                    [fetchRequestAction]
                );
            });
        });

        describe('invoking the apiSuccess action creator', () => {

            const mockData = { foo: 'bar' };
            const now = Date.now();

            it('should create a FETCH_SUCCESS action', () => {

                const fetchSuccessAction = {
                    type: FETCH_SUCCESS,
                    entity: mockEntity,
                    data: mockData,
                    lastUpdated: now
                };

                // Under test
                store.dispatch(
                    actionCreators.apiSuccess(mockEntity)(mockData, now)
                );

                expect(
                    store.getActions()
                ).toEqual(
                    [fetchSuccessAction]
                );
            });
        });

        describe('invoking the apiFailure action creator', () => {

            const mockError = { foo: 'bar' };
            const now = Date.now();

            it('should create a FETCH_FAILURE action', () => {

                const fetchFailureAction = {
                    entity: mockEntity,
                    type: FETCH_FAILURE,
                    error: mockError,
                    lastUpdated: now
                };

                // Under test
                store.dispatch(
                    actionCreators.apiFailure(mockEntity)(mockError, now)
                );

                expect(
                    store.getActions()
                ).toEqual(
                    [fetchFailureAction]
                );
            });
        });
    });
});
