"use strict";

function makeMultiFilter(array) {
    var originalArray = array;
    var currentArray = array;
    function arrayFilterer(filter, callback) {
        if (!filter) {
            return currentArray;
        }
        currentArray = currentArray.filter(filter);
        if (callback) {
            callback.call(originalArray, currentArray);
        }
        return arrayFilterer;
    }
    return arrayFilterer;
}