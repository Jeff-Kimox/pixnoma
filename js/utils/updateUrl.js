"use strict";

/**
 * Imports
 */

import { urlEncode } from "./urlEncode.js";

/**
 * Update url
 * @param {Object} filterObj  filter object 
 * @param {String} searchType search type eg photos  or videos
 */

export const updateUrl = (filterObj, searchType) => {
    setTimeout(() => {
        const /** {String} */ root = window.location.origin;
        const /** {String} */ searchQuery = urlEncode(filterObj);

        window.location = `${root}/pages/${searchType}/${searchType}.html?${searchQuery}`;

     }, 500);
}