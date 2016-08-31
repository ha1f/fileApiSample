"use strict";

export default class ImageData {
    constructor(blob, filename, foldername, width, height) {
        this.blob = blob;
        this.filename = filename;
        this.foldername = foldername;
        this.width = width;
        this.height = height;
    }
    copy() {
        return new ImageData(this.blob, this.filename, this.foldername, this.width, this.height);
    }
}
