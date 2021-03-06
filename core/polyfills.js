'use strict';

// For IE 11
if (typeof Promise === 'undefined') {
    global.Promise = require('core-js/es6/promise')
}

global.Exception = class Exception extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'Exception';
    }
}

global.size = function size(obj) {
    return obj && ((typeof obj === 'string') ? obj.length : Object.keys(obj).length)
}

/**
 * Returns a numeric hash of a string
 * @returns {number}
 */
String.prototype.hashCode = function() {
    var hash = 0, i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash
}

/**
 * Here we add a few ES6 polyfills since we dont want to include whole of babel-polyfill
 */
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

if (!String.prototype.includes) {
    String.prototype.includes = function includes(str) {
        return this.indexOf(str) !== -1;
    };
}
if (!String.prototype.trimLeft) {
    String.prototype.trimLeft = function trimLeft(str) {
        return remove(this, `^${str || '\\s'}+`);
    };
}
if (!String.prototype.trimRight) {
    String.prototype.trimRight = function trimRight(str) {
        return remove(this, `${str || '\\s'}+$`);
    };
}

function remove(str, rx) {
    return str.replace(new RegExp(rx), '');
}

if(typeof window !== 'undefined'){
    window.requestIdleCallback =
    window.requestIdleCallback ||
    function (cb) {
      var start = Date.now();
      return setTimeout(function () {
        cb({
          didTimeout: false,
          timeRemaining: function () {
            return Math.max(0, 50 - (Date.now() - start));
          }
        });
      }, 1);
    }
  
  window.cancelIdleCallback =
    window.cancelIdleCallback ||
    function (id) {
      clearTimeout(id);
    }
}
