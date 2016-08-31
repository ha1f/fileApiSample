"use strict";

export function putImagedata(imagedata) {
    return {
        type: 'PUT',
        imagedata: imagedata
    };
}

export function updateImagedata(imagedata) {
    return {
        type: 'UPDATE',
        imagedata: imagedata
    };
}
