"use strict";

/**
 * IMPORTS
 */

import { client } from "./api_configure.js";
import { photoCard } from "./photo_card.js";

/**
 * Render curated Photos
 */

const /** {NodeElement} */ $photoGrid = document.querySelector("[data-photo-grid]");

$photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);

client.photos.curated({ page: 1, per_page:20 }, data => {
    $photoGrid.innerHTML = "";

    data.photos.forEach(photo => {

        const /** {NodeElements} */ $photoCard = photoCard(photo);

        $photoGrid.appendChild($photoCard)
 
    });
});