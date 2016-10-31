(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as anonymous module.
        define("visualsearch/utils/backbone_extensions", ["jquery", "underscore", "backbone"], factory);
    } else if (typeof exports === "object") {
        // Node / CommonJS
        factory(require("jquery"), require("underscore"), require("backbone"));
    } else {
        // Browser globals.
        factory(jQuery, _, Backbone);
    }
})(function($, _, Backbone) {
  // Makes the view enter a mode. Modes have both a 'mode' and a 'group',
  // and are mutually exclusive with any other modes in the same group.
  // Setting will update the view's modes hash, as well as set an HTML class
  // of *[mode]_[group]* on the view's element. Convenient way to swap styles
  // and behavior.
  Backbone.View.prototype.setMode = function(mode, group) {
    this.modes || (this.modes = {});
    if (this.modes[group] === mode) return;
    $(this.el).setMode(mode, group);
    this.modes[group] = mode;
  };
});
