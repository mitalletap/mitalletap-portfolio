import React, { Component } from 'react';

const HelperFunction = {

    getEnvironmentStatus: function() {
        const eVar = process.env.NODE_ENV === 'production' ? '3.20.212.154:8080' : 'localhost:8080';
        return eVar;
    } 

}

export default HelperFunction;