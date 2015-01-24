/**
 * The browser console
 *
 * @property console
 * @private
 * @type object
 */
window.console = window.console || {};
window.console.log = this.console.log || function() {};

/**
 * expose our sdk
 */
(function(root) {
    root.SupportKit = root.SupportKit || {};
    root.SupportKit.VERSION = "js1.0.0";
}(this));

/**
 * main sdk
 */
(function(root) {

    root.SupportKit = root.SupportKit || {};

    /**
     * Contains all SupportKit API classes and functions.
     * @name SupportKit
     * @namespace
     *
     * Contains all SupportKit API classes and functions.
     */
    var SupportKit = root.SupportKit;

    // If jQuery has been included, grab a reference to it.
    if (typeof(root.$) !== "undefined") {
        SupportKit.$ = root.$;
    }

    // Set the server for SupportKit to talk to.
    SupportKit.serverURL = "https://en.wikipedia.org";

    /**
     * Call this method first to set your authentication key.
     * @param {String} API Token
     */
    SupportKit.Initialize = function(apiToken) {
        SupportKit._initialize(apiToken);
    };

    /**
     * Get data according to a wikipedia page.
     * @param {string} title of a wikipedia page like 'Cheese'
     */
    SupportKit.GetPage = function(title) {
        SupportKit._requestSample(title, function(data) {
            var rawtext = data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]["*"];
            var upperCaseTest = SupportKit.WikiTextHelper._upperCase(rawtext);

            SupportKit.$("body").append('<p>' + title + ':</p>');
            SupportKit.$("body").append('<p>' + rawtext.substring(0, 250) + '</p>');
            SupportKit.$("body").append('<p>' + upperCaseTest.substring(0, 250) + '</p>');
        });
    };

    /**
     * This method is for SupportKit's own private use.
     * @param {String} API Token
     */
    SupportKit._initialize = function(apiToken) {
        SupportKit.apiToken = apiToken;
    };

    /**
     * sample request to our api server
     * @param  {string} title
     * @param  {function} successCallback
     */
    SupportKit._requestSample = function(title, successCallback) {
        var url = SupportKit.serverURL +
            "/w/api.php?rvprop=content&format=json&prop=revisions|categories&rvprop=content&action=query&titles=" +
            encodeURI(title) +
            "&token=" +
            encodeURI(SupportKit.apiToken);

        var jqxhr =
            SupportKit.$.ajax({
                url: url,
                dataType: 'jsonp',
                type: 'GET'
            })
            .success(function(result) {
                successCallback(result);
            })
            .error(function() {
                console.log('Http request failed');
                // throw eror here
            });
    };

}(this));