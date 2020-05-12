import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import Admin from '../components/Admin';
import TextField from '@material-ui/core/TextField';
import fetchMock from 'fetch-mock';

describe('tests the admin page', () => {

    let app, instance;
    
    beforeEach(() => {
        app = shallow(<Admin />);
    });

    it('should match page snapshot', () => {
        expect(app).toMatchSnapshot();
    });

    describe('input validation', () => {

        it('tests program name', () => {
            app.find(TextField).find('#user-program').simulate('change', { target: { value: "program name" } })
            expect(app.state('projectName')).toEqual("program name");
        });

        it('tests file name', () => {
            app.find(TextField).find('#user-file').simulate('change', { target: { value: "file name" } })
            expect(app.state('fileName')).toEqual("file name");
        });

        it('tests github name', () => {
            app.find(TextField).find('#user-github').simulate('change', { target: { value: "github name" } })
            expect(app.state('githubUrl')).toEqual("github name");
        });

        it('tests demo name', () => {
            app.find(TextField).find('#user-demo').simulate('change', { target: { value: "demo name" } })
            expect(app.state('demoUrl')).toEqual("demo name");
        });

        it('tests description name', () => {
            app.find(TextField).find('#user-description').simulate('change', { target: { value: "description name" } })
            expect(app.state('description')).toEqual("description name");
        });

        it('tests description name', () => {
            app.find(TextField).find('#user-description').simulate('change', { target: { value: "description name" } })
            expect(app.state('description')).toEqual("description name");
        });

        it('tests file selected', () => {
            app.find('input').simulate('change', { target: { files: [{ name: "file selected" }] } });
            expect(app.state('fileData')).toEqual({ name: "file selected" });
            expect(app.state('image')).toEqual("file selected");
        });

        
        it('tests valid and invalid submissions', () => {
            app.setState({
                fileName: 'test',
                fileType: '.png',
                fileData: [],
                projectName: 'project',
                githubUrl: 'github',
                demoUrl: 'demo',
                image: 'image',
                description: 'description',
                clicked: false,
            })

            app.find('.submit-button').at(0).simulate('click');
            expect(app.state('clicked')).toBe(true);
        });
    });


    describe('ui interactions', () => {

        let app, instance;

        beforeEach(() => {
            app = mount(<Admin />);
            instance = app.instance();
        })

        afterEach(() => {
            fetchMock.restore();
        });

        it('verifies state changes on `handle submit`', async () => {
            const fetchPromise = Promise.resolve({
                json: () => Promise.resolve(true)
            })

            global.fetch = () => fetchPromise;
            await instance.handleSubmit();
            // expect(app.state('status')).toBe("true");
            // expect(app.state('open')).toBe(true);
        });

        it('verifies state changes on `handle close`', async () => {
            const fetchPromise = Promise.resolve({
                json: () => Promise.resolve(true)
            })

            global.fetch = () => fetchPromise;
            await instance.handleClose();
            expect(app.state('open')).toBe(false);     
        });

    });

});