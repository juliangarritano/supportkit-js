var Backbone = require('backbone');
var sync = Backbone.sync;
var endpoint = require('./endpoint');

module.exports = {
    sync: function(method, model, options) {
        var self = this;
        options.beforeSend = function(xhr) {
            xhr.setRequestHeader('app-token', endpoint.appToken);
            xhr.setRequestHeader('Content-Type', 'application/json');
        };
        return sync(method, model, options);
    },

    fetchPromise: function() {
        var deferred = $.Deferred();

        this.fetch({
            success: function(result) {
                deferred.resolve(result);
            },
            error: function(err) {
                deferred.reject(err);
            }
        });

        return deferred;
    }
};