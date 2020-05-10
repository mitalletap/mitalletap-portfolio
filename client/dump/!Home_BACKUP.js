import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import Home from '../src/components/Home';
import fetchMock from 'fetch-mock';
import Home_Functions from '../src/components/functions/api_data';

describe('tests the home page', () => {

    let app;
    let mockData;
    let instance;
    
    beforeEach(() => {
        app = mount(<Home />);
        instance = app.instance();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    it('state value should not be empty', () => {
        var stateLength = app.state().data.length;
        expect(stateLength).toBeGreaterThan(0);
    });

    describe('should test api calls', () => {

        it('test on promise resolve', async () => {

            const fetchPromise = Promise.resolve({
                json: () => Promise.resolve(true)
            })
            global.fetch = () => fetchPromise;
            instance.componentDidMount();
            expect(app.state('message')).toBe(true); 
            
        });

        it('test on promise reject', async () => {

            const fetchPromise = Promise.reject({
                json: () => Promise.reject(false)
            })

            global.fetch = () => fetchPromise;
            await instance.componentDidMount();
            expect(app.state('message')).toBe(false); 
            
        });

    });

});