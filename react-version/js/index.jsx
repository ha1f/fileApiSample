"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App.jsx'

const INITIAL_STATE = {
    imagedatas: {}
}

const store = createStore((state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PUT':
            /* imagedata */
            let newFolderImages = state.imagedatas[action.imagedata.foldername] ? [].concat(state.imagedatas[action.imagedata.foldername]) : [];
            newFolderImages.push(action.imagedata);
            let update = {};
            update[action.imagedata.foldername] = newFolderImages;
            let newImageDatas = Object.assign({}, state.imagedatas, update);
            return Object.assign({}, state, {
                imagedatas: newImageDatas
            });
        case 'UPDATE':
            /* imagedata */
            let newFolderImages2 = state.imagedatas[action.imagedata.foldername] ? [].concat(state.imagedatas[action.imagedata.foldername]) : [];
            for (var i=0; i < newFolderImages2.length; i++) {
                if (newFolderImages2[i].filename == action.imagedata.filename) {
                    newFolderImages2[i] = action.imagedata;
                    break;
                }
            }
            let update2 = {};
            update2[action.imagedata.foldername] = newFolderImages2;
            let newImageDatas2 = Object.assign({}, state.imagedatas, update2);
            return Object.assign({}, state, {
                imagedatas: newImageDatas2
            });
        default:
            return state
    }
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react-root')
);
