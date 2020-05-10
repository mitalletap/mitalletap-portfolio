import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import Admin from '../components/Admin';
import fetchMock from 'fetch-mock';

describe('tests the admin page', () => {

    let app;
    let instance;
    
    beforeEach(() => {
        app = mount(<Admin />);
        instance = app.instance();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    it('should match page snapshot', () => {
        expect(app).toMatchSnapshot();
    });

    describe('should test api calls', () => {

        it('tests button click',() => {
            app.find('.submit-button').simulate('click');
            expect(app.state('clicked')).toBe(true);
        });

        it('should run function with all input data', () => {
            
        })


        it('test on promise resolve', async () => {
            
        });

        it('test on promise reject', async () => {
            
        });

    });

});