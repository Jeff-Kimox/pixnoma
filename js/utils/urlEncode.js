"use strict";

/**
 * convert onject to url
 * @param {Object} urlObj  url object
 * @returns String
 */

export const urlEncode = urlObj => {
    return Object.entries(urlObj).join("&").replace(/,/g, "=").replace(/#/g, "%23");
}