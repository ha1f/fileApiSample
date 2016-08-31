"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import ImageData from './../models/ImageData.jsx'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './../actions';

class ImageBox extends React.Component {
    updateSize() {
        if (this.props.imagedata.width < 1) {
            let img = ReactDOM.findDOMNode(this.refs.img);
            let imagedata = this.props.imagedata.copy();
            let getStatus = ()=>{
                imagedata.width = img.naturalWidth;
                imagedata.height = img.naturalHeight;
            }
            getStatus();
            if (imagedata.width > 0) {
                this.props.updateImagedata(imagedata);
            } else {
                setTimeout(()=>{
                    getStatus();
                    this.props.updateImagedata(imagedata);
                }, 5);
            }
        }
    }
    componentDidMount() {
        this.updateSize();
    }
    render() {
        if (this.props.imagedata.filename == "22.png") {
            console.log(this.props.imagedata.foldername);
        }
        return (
            <div className="img-box">
                <img src={this.props.imagedata.blob} ref="img" />
                <div className="filename-label">{this.props.imagedata.filename}</div>
                <div className="information-label">{String(this.props.imagedata.width) + " px * " + String(this.props.imagedata.height) + "px"}</div>
            </div>
        );
    }
}

export default connect((state) => {return {}}, (dispatch) => { return bindActionCreators(Actions, dispatch); })(ImageBox);
