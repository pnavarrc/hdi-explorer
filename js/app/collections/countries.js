/* globals Backbone, app */

app.Countries = Backbone.Collection.extend({
    model: app.CountryTrend,
    url: 'http://data.undp.org/resource/efc4-gjvq.json',

    parse: function(response) {
        return response.filter(function(d) { return d.country_code; });
    },

    setSelected: function(code) {

        var selected = this.findWhere({selected: true});

        if (selected) {
            selected.set('selected', false);
        }

        // Set the new selected item
        selected = this.findWhere({code: code});

        if (selected) {
            selected.set('selected', true);
        }
    }
});