<html>
 <head></head>
 <body>
  !function(e,t){"function"==typeof define&amp;&amp;define.amd?define(["exports"],t):"undefined"!=typeof exports?t(exports):(t(t={}),e.ResourceListing=t)}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,(function(e){"use strict";function r(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&amp;&amp;null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||s(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(t,e){var r,n=Object.keys(t);return Object.getOwnPropertySymbols&amp;&amp;(r=Object.getOwnPropertySymbols(t),e&amp;&amp;(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)),n}function i(n){for(var e=1;e
  <arguments.length;e++){var i="null!=arguments[e]?arguments[e]:{};e%2?t(Object(i),!0).forEach((function(e){var" t,r;t="n,r=i[e],e" in t?object.defineproperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]="r})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(i)):t(Object(i)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(i,e))}))}return" n}function n(e,t){return function(e){if(array.isarray(e))return e}(e)||function(e,t){var r="Object.prototype.toString.call(e).slice(8,-1);return&quot;Map&quot;===(r=&quot;Object&quot;===r&amp;&amp;e.constructor?e.constructor.name:r)||&quot;Set&quot;===r?Array.from(e):&quot;Arguments&quot;===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(e,t):void" symbol&&e[symbol.iterator]||e["@@iterator"];if(null!="r){var" n,i,s="[],a=!0,o=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&amp;&amp;(s.push(n.value),!t||s.length!==t);a=!0);}catch(e){o=!0,i=e}finally{try{a||null==r.return||r.return()}finally{if(o)throw" i}}return s}}(e,t)||s(e,t)||function(){throw new typeerror("invalid attempt to destructure non-iterable instance.\nin order be iterable, non-array objects must have a [symbol.iterator]() method.")}()}function s(e,t){if(e){if("string"="=typeof" e)return a(e,t);var 0}}function a(e,t){(null="=t||t">
   e.length)&amp;&amp;(t=e.length);for(var r=0,n=new Array(t);r
   <t;r++)n[r]=e[r];return n}object.defineproperty(e,"__esmodule",{value:!0}),e.default="void" 0;var o="{template:'<div" class="resource-listing thumbnail-links-wrapper"> 
    <div class="thumbnail-links-wrapper__header filters" v-if="!hideFilters"> 
     <a href="../../../../../../../index.html" class="skip-link">{{ strings.skip_filters }}</a> 
     <div class="filters__wrapper"> 
      <button @click="resetFilters" :aria-disabled="!filtersActive &amp;&amp; !searchActive" :tabindex="!filtersActive &amp;&amp; !searchActive ? -1 : 0" :aria-hidden="!filtersActive &amp;&amp; !searchActive" v-if="dropdowns || (filters.length > 1)" class="link-cta filters__item filters__item--reset"> {{ strings.view_all }} </button> 
      <selectnav v-for="filter in mappedFilters" v-model="currentFilters[filter.name]" v-if="dropdowns || filters.length > 1" :key="filter.name" v-bind="filter" :id="`${filter.name}-filter`" :dropdownIcon="dropdownIcon" :multiselect="multiselect" :strings="strings" /> 
      <linknav v-for="filter in mappedFilters" v-model="currentFilters[filter.name]" v-else :key="filter.name" v-bind="filter" :id="`${filter.name}-filter`" :dropdownIcon="dropdownIcon" :strings="strings" /> 
     </div> 
     <searchform class="filters__item filters__item--search" :label="strings.search_label" :submitLabel="strings.submit_search_label" :clearLabel="strings.clear_search_label" id="resources-search" v-model="searchInput" @submit="currentSearch = searchInput" @reset="currentSearch = \'\'" /> 
    </div> 
    <a id="after-filters"></a> 
    <div class="resource-listing__heading" v-if="filters.length <= 1 &amp;&amp; !multiselect &amp;&amp; !hideFilters"> 
     <h2 v-html="mainHeading"></h2> 
    </div> 
    <ul class="thumbnail-links-wrapper__items" v-if="filteredResources.length > 0"> 
     <thumbnaillink v-for="resource, index in visibleResources" :key="index + \'-\' + componentKey" v-bind="resource" ref="resources" :styles="styles.resource" :aria-setsize="filteredResources.length" :aria-posinset="index + 1" /> 
    </ul> 
    <div v-else class="thumbnail-links-wrapper__error" v-html="strings.no_results_message"></div> 
    <div v-if="totalPages > currentPage" class="thumbnail-links-wrapper__footer"> 
     <button :class="buttonStyle" @click="loadMore">{{ strings.load_more }}</button> 
    </div> ',components:{ThumbnailLink:window.ThumbnailLink.default,SelectNav:window.SelectNav.default,LinkNav:window.LinkNav.default,SearchForm:window.SearchForm.default},mixins:[window.resourceListingMixins],data:function(){return{currentPage:1,currentFilters:{},currentSearch:"",searchInput:"",componentKey:0}},watch:{currentPage:function(e){e&gt;this.totalPages&amp;&amp;0
    <this.totalpages?this.currentpage=this.totalpages:e<1&&(this.currentpage=1)},totalpages:function(e){this.currentpage>
     e&amp;&amp;(this.currentPage=e)},currentFilters:{handler:function(e){var r=window.themeUtility.insertUrlParam;Object.entries(e).forEach((function(e){var t=(e=n(e,2))[0];e=e[1];r(t,!!e&amp;&amp;(e instanceof Array?e.map((function(e){return e.name})).join(","):e.name))})),this.componentKey+=1},deep:!0},currentSearch:function(e){window.themeUtility.insertUrlParam("search",e.toString().trim()),this.searchInput!==e&amp;&amp;(this.searchInput=e)}},computed:{defaultFilters:function(){var r={};return this.filters.forEach((function(e){var t=e.name;e.options,r[t]=null})),r},mappedFilters:function(){var n=this;return this.filters.map((function(r){return i(i({},r),{},{options:r.options.filter((function(t){return n.resources.find((function(e){return n.handleFilterOption(e,t,r)}))}))})}))},filtersActive:function(){return 0
    </this.totalpages?this.currentpage=this.totalpages:e<1&&(this.currentpage=1)},totalpages:function(e){this.currentpage>
   </t;r++)n[r]=e[r];return>
  </arguments.length;e++){var>
 </body>
</html>