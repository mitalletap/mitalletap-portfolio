import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import Card from '../components/Card';

describe('tests the card component', () => {

    let app, instance;
    
    beforeEach(() => {
        app = shallow(<Card image={"images"}/>);
        instance = app.instance();
    });

    it('should check image permissions', async () => {
        // const successPromise = Promise.resolve({
        //     json: () => Promise.resolve({ status: 200 })
        // })
        // global.fetch = () => successPromise;
        // await instance.componentDidMount();
        // expect(app.state('status')).toBe("images");  

        const failedPromise = Promise.resolve({
            json: () => Promise.resolve({ status: 403 })
        })
        global.fetch = () => failedPromise;
        await instance.componentDidMount();
        expect(app.state('image')).toEqual('https://s3.us-east-2.amazonaws.com/mitalletap.io/mitalletap.io_default_imagenotfound.png');  
    });
    
});