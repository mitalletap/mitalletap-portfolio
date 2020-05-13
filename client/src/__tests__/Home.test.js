import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import Home from '../components/Home';
import Card from '../components/Card';
import fetchMock from 'fetch-mock';
import Grid from '@material-ui/core/Grid';

describe('tests the home page', () => {

    let app;
    let instance;
    
    beforeEach(() => {
        app = shallow(<Home />);
        instance = app.instance();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    describe('should test api calls', () => {

        it('test on promise resolve', async () => {
            const fetchPromise = Promise.resolve({
                json: () => Promise.resolve(true)
            })
            global.fetch = () => fetchPromise;
            await instance.componentDidMount();
            expect(app.state('data')).toBe(true); 
            
        });

        it('test on promise reject', async () => {
            const fetchPromise = Promise.reject({
                json: () => Promise.reject(false)
            })
            global.fetch = () => fetchPromise;
            await instance.componentDidMount();
            expect(app.state('data')).toEqual([]); 

        });

    });

    describe('should test mapping', () => {

        it('should match data', async () => {
            const data = [{
                "_id": "5eba51c167457b14a56da77b",
                "project_name": "Portfolio",
                "file_name": "sheev",
                "github_url": "https://github.com/mitalletap/mitalletap-portfolio",
                "demo_url": "mitalletap.io",
                "description": "My personal portfolio!",
                "image_url": "https://s3.us-east-2.amazonaws.com/mitalletap.io/sheev.gif",
                "__v": 0
              }]
        
            const fetchPromise = Promise.resolve({
                json: () => Promise.resolve(data)
            })
            global.fetch = () => fetchPromise;
            await instance.componentDidMount();
            expect(app.state('data')).toHaveLength(1);
        })

    });

});