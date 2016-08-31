"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FolderBox from './FolderBox.jsx';

import ImageData from './../models/ImageData.jsx'

import * as Actions from './../actions';

class App extends React.Component {
    readFile(file) {
        if (file.name != ".") {
            // 画像のみが対象
            if (!file.type.match(/image.*/g)) {
                return;
            }

            // フォルダ名を取得
            let paths = file.webkitRelativePath.split("/");
            let pathLength = paths.length;
            let foldername = (pathLength > 0) ? paths[pathLength - 2] : "";

            let reader = new FileReader();
            reader.onload = (e) => {
                this.props.putImagedata(new ImageData(e.target.result, file.name, foldername, 0, 0));
            };
            reader.readAsDataURL(file);
        }
    }
    handleDirectorySelected(e) {
        let files = e.target.files;
        Array.from(files).forEach((file, index, array) => {
            this.readFile(file);
        });
    }
    componentDidMount() {
        let node = ReactDOM.findDOMNode(this.refs.filesInput)
        node.webkitdirectory = true;
        node.directory = true;
    }
    render() {
        let folders = [];
        for (var foldername in this.props.imagedatas) {
            folders.push(
                <FolderBox imagedatas={this.props.imagedatas[foldername]} foldername={foldername} key={"folder-box-" + foldername}></FolderBox>
            );
        }
        return (
            <div>
                <input type="file" ref="filesInput" onChange={this.handleDirectorySelected.bind(this)} />
                <div className="images-list">
                    {folders}
                </div>
            </div>
        );
    }
}

export default connect((state) => state, (dispatch) => { return bindActionCreators(Actions, dispatch); })(App);
