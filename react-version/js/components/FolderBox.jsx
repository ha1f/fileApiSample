"use strict";

import React from 'react';

import ImageBox from './ImageBox.jsx';

export default class FolderBox extends React.Component {
    render() {
        return (
            <div className="folder-box">
                <div className="foldername-label">{this.props.foldername}</div>
                <div className="folder-images-list">
                    {this.props.imagedatas.map((imagedata) =>
                        <ImageBox imagedata={imagedata} key={"image-box-" + imagedata.foldername + "-" + imagedata.filename} />
                    )}
                </div>
            </div>
        );
    }
}
