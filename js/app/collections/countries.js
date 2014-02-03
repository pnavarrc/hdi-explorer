/* globals Backbone, app */

app.Countries = Backbone.Collection.extend({
    model: app.CountryTrend,
    url: 'http://data.undp.org/resource/efc4-gjvq.json',

    parse: function(response) {

        return response.filter(function(d) { return d.country_code; });

    }
});