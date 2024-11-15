"use strict";

/**
 * IMPORTS
 */

import { client } from "./api_configure.js";

/**
 * Add or remove from favourite
 * @param {Node} $element 
 * @param {String} type  item type eg photos or videos
 * @param {Number} id  item id
 */


export const favorite = ($element, type, id) => {
    $element.addEventListener("click", () => {

        $element.setAttribute("disabled", "");

        const /** {Object} */ favoriteObj = JSON.parse(window.localStorage.getItem("favorite"));

        if(favoriteObj[type][id]) {
            $element.classList.toggle("active");
            $element.removeAttribute("disabled");

            delete favoriteObj[type][id];

            window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
        } else {
            client[type].detail(id, data => {
                $element.classList.toggle("active");
                $element.removeAttribute("disabled");
            })
        }

    });

}