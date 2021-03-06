// This is the annotated source code for
// [VisualSearch.js](http://documentcloud.github.com/visualsearch/),
// a rich search box for real data.
//
// The annotated source HTML is generated by
// [Docco](http://jashkenas.github.com/docco/).

/** @license VisualSearch.js 0.6.8
 *  (c) 2011 Samuel Clay, @samuelclay, DocumentCloud Inc., Investigative Reporters & Editors
 *  VisualSearch.js may be freely distributed under the MIT license.
 *  For all details and documentation:
 *  http://documentcloud.github.com/visualsearch
 */

(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as anonymous module.
        require.config({
          packages: [
            "visualsearch/search_box",
            "visualsearch/search_facet",
            "visualsearch/search_input",
            "visualsearch/utils/backbone_extensions",
            "visualsearch/utils/hotkeys",
            "visualsearch/utils/inflector",
            "visualsearch/utils/jquery_extensions",
            "visualsearch/utils/search_parser",
            "visualsearch/models/search_facet",
            "visualsearch/models/search_query"
          ]
        });
        define("visualsearch", ["jquery", "underscore", "backbone"], factory);
    } else if (typeof exports === "object") {
        // Node / CommonJS
        factory(require("jquery"), require("underscore"), require("backbone"));
    } else {
        // Browser globals.
        factory(jQuery, _, Backbone);
    }
})(function($, _, Backbone) {
  // Setting up VisualSearch globals. These will eventually be made instance-based.
  if (!window.VS) window.VS = {};
  if (!VS.app)    VS.app = {};
  if (!VS.ui)     VS.ui = {};
  if (!VS.model)  VS.model = {};
  if (!VS.utils)  VS.utils = {};

  // Sets the version for VisualSearch to be used programatically elsewhere.
  VS.VERSION = '0.6.9';

  VS.VisualSearch = function(options) {
    var defaults = {
      container: '',
      query: '',
      autosearch: true,
      unquotable: [],
      remainder: 'text',
      showFacets: true,
      readOnly: false,
      enterKeyEnabled: true,
      className: {
        inputAutocomplete: '',
        facetAutocomplete: ''
      },
      callbacks: {
        search: $.noop,
        focus: $.noop,
        blur: $.noop,
        facetMatches: $.noop,
        valueMatches: $.noop,
        clearSearch: $.noop,
        removedFacet: $.noop,
        formatFacets: $.noop
      }
    };
    this.options = _.extend({}, defaults, options);
    this.options.callbacks = _.extend({}, defaults.callbacks, options.callbacks);

    VS.app.hotkeys.initialize();
    this.searchQuery = new VS.model.SearchQuery();
    this.searchBox = new VS.ui.SearchBox({
      app: this,
      showFacets: this.options.showFacets
    });

    if (options.container) {
      var searchBox = this.searchBox.render().el;
      $(this.options.container).html(searchBox);
    }
    this.searchBox.value(this.options.query || '');

    // Disable page caching for browsers that incorrectly cache the visual search inputs.
    // This forces the browser to re-render the page when it is retrieved in its history.
    $(window).bind('unload', function(e) {
    });

    // Gives the user back a reference to the `searchBox` so they
    // can use public methods.
    return this;
  };

  // Entry-point used to tie all parts of VisualSearch together. It will either attach
  // itself to `options.container`, or pass back the `searchBox` so it can be rendered
  // at will.
  VS.init = function(options) {
    return new VS.VisualSearch(options);
  };

  if (typeof define === "function" && define.amd) {
    _.defer(function() {
      require([
        "visualsearch/search_box",
        "visualsearch/search_facet",
        "visualsearch/search_input",
        "visualsearch/utils/backbone_extensions",
        "visualsearch/utils/hotkeys",
        "visualsearch/utils/inflector",
        "visualsearch/utils/jquery_extensions",
        "visualsearch/utils/search_parser",
        "visualsearch/models/search_facet",
        "visualsearch/models/search_query"
      ]);
    });
  }

  return VS;
});
