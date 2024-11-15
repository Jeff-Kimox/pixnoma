"use strict";

/**
 * IMPORTS
 */


import { urlEncode } from "./utils/urlEncode.js";


const /** {String} */ API_KEY = "IHFPhYB6vS3j3Tmcv8OqWISFco19iAPtlSAFSq5cOhdYNboPnjyxSF4h";

const /** {Function} */ headers = new Headers();

headers.append("Authorization", API_KEY);

const /** {Object} */ requestOptions = { headers }


/**
 * Fetch data from pexels api
 * @param {String} url  fetch data
 * @param {Function} successCallback  success callback function
 */


const fetchData = async function (url, successCallback) {
    const /** {Object} */ response = await fetch(url, requestOptions);

    if (response.ok) {
        const /** {Object} */ data = await response.json();
        successCallback(data);
    }
}

let /** {String} */ requestUrl = "";

const /** {Object} */ root = {
    default: "https://api.pexels.com/v1/",
    videos: "https://api.pexels.com/videos/",
}

export const /** {Object} */ client = {

    photos: {

        /**
         * search photos
         * @param {Object} parameters url object
         * @param {Function} callback  callback function
         */

        search(parameters, callback) {
            requestUrl = `${root.default}search?${urlEncode(parameters)}`;
            fetchData(requestUrl, callback);
        },

        /**
         * curated photos
         * @param {Object} parameters  url object
         * @param {Function} callback  callback function
         */

        curated(parameters, callback) {
            fetchData(`${root.default}curated?${urlEncode(parameters)}`, callback);
        },

        /**
         * Get single phot detail
         * @param {String} id Photo ID
         * @param {Function} callback callback function
         */

        detail(id, callback) {
            fetchData(`${root.default}photos/${id}`, callback);
        }

    },

    videos: {

        /**
         * search videos
         * @param {Object} parameters url object
         * @param {Function} callback  callback function
         */

        search(parameters, callback) {
            requestUrl = `${root.videos}search?${urlEncode(parameters)}`;
            fetchData(requestUrl, callback);
        },

        /**
         * Get popular videos
         * @param {Object} parameters  url object
         * @param {Function} callback  callback function
         */

        popular(parameters, callback) {
            fetchData(`${root.videos}popular?${urlEncode(parameters)}`, callback);
        },

        /**
         * Get single video detail
         * @param {String} id video ID
         * @param {Function} callback callback function
         */

        detail(id, callback) {
            fetchData(`${root.videos}videos/${id}`, callback);
        }

    },

    collections: {

        
        /**
         * Get Featured collections
         * @param {Object} parameters  url object
         * @param {Function} callback  callback function
         */

        featured(parameters, callback) {
            requestUrl = `${root.default}collections/featured?${urlEncode(parameters)}`;
            fetchData(requestUrl, callback);
        },

        /**
         * Get a collection media
         * @param {String} id Collection ID
         * @param {Object} parameters url Object
         * @param {Function} callback callback function
         */

        detail(id, parameters, callback) {
            requestUrl = `${root.default}/collections/${id}?${urlEncode(parameters)}`;
            fetchData(requestUrl, callback);
        }

    },

}