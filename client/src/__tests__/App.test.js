import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';

describe('tests the app page', () => {

    let app;
    let mockData;
    let instance;
    
    beforeEach(() => {
        app = mount(<App />);
    });

    afterEach(() => {
        
    });

    it('should match snapshot', () => {
        expect(app).toMatchSnapshot();
    });

});