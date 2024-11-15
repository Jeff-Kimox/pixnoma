"use strict";

/**
 * Imports
 */

import { ripple } from "./utils/ripple.js";
import { addEventOnElements } from "./utils/event.js";
import { segment } from "./segment_btn.js";
import { updateUrl } from "./utils/updateUrl.js";

/**
 * Search view toggle in small devices  
 */

const /** {NodeList} */ $searchTogglers = document.querySelectorAll("[data-search-toggler]");
const /** {NodeElement} */ $searchView = document.querySelector("[data-search-view]");

addEventOnElements($searchTogglers, "click", () => $searchView.classList.toggle("show"))

/**
 * Search clear
 */

const /** {NodeElement} */ $searchField = document.querySelector("[data-search-field]");

const /** {NodeElement} */ $searchClearBtn = document.querySelector("[data-search-clear-btn]");

$searchClearBtn.addEventListener("click", () => $searchField.value = "");

/**
 * Search Type
 */

const /** {NodeElement} */  $searchSegment = document.querySelector("[data-segment='search']"); 
const /** {NodeElement} */  $activeSegmentBtn = $searchSegment.querySelector("[data-segment-btn].selected");

window.searchType = $activeSegmentBtn.dataset.segmentValue;


segment($searchSegment, segmentValue => window.searchType = segmentValue);

/**
 * Search submit
 */

const /** {NodeElement} */ $searchBtn = document.querySelector("[data-search-btn]");

$searchBtn.addEventListener("click", function() {
    const /** {Boolean} */ searchValue = $searchField.value.trim();
    console.log(searchValue);

    if (searchValue) {
        updateSearchHistory(searchValue);
        window.filterObj.query = searchValue;
        updateUrl(window.filterObj, window.searchType);
    }
});



/**
 * Search when pressing enter
 */


$searchField.addEventListener("keydown", e => {
    if (e.key === "Enter" && $searchField.value.trim()) $searchBtn.click();
});



/**
 * Search History
 */

// Initial search history

let /** {Object} */ searchHistory = { items: [] };

if (window.localStorage.getItem("search_history")) {
    searchHistory = JSON.parse(window.localStorage.getItem("search_history"));
} else {
    window.localStorage.setItem("search_history", JSON.stringify(searchHistory));
}

// Update search History

const updateSearchHistory = searchValue => {

    /**
     * If the Search Value is already present ensure the latest search value
     */

    if (searchHistory.items.includes(searchValue)) {
        searchHistory.items.splice(searchHistory.items.indexOf(searchValue), 1);
    }

    searchHistory.items.unshift(searchValue);

    window.localStorage.setItem("search_history", JSON.stringify(searchHistory));
}

/**
 * Render Search items in search list
 */

const /** {NodeElement} */  $searchList = document.querySelector("[data-search-list]");

const /** {Number} */ historyLen = searchHistory.items.length;

for (let i = 0; i < historyLen & i <= 5; i++) {
    const /** {NodeElement} */ $listItem = document.createElement("button");
    $listItem.classList.add("list-item");

    $listItem.innerHTML = `
        <span class="material-symbols-outlined leading-icon" aria-hidden="true">history</span>
        <span class="body-large text">${searchHistory.items[i]}</span>
        <div class="state-layer"></div>                     
    `;

    ripple($listItem);

    $listItem.addEventListener("click", function() {
        $searchField.value = this.children[1].textContent;
        $searchBtn.click();
    });

    $searchList.appendChild($listItem);
}