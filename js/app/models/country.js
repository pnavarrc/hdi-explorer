/* globals Backbone, app */

app.CountrySummary = Backbone.Model.extend({

    url: 'http://data.undp.org/resource/wxub-qc5k.json?Abbreviation=NOR'

});

app.CountryTrend = Backbone.Model.extend({

    defaults: {
        name: '',
        code: '',
        selected: false,
        hdiSeries: []
    },

    idAttribute: 'code',

    // Parse the country fields before instantiating the model
    parse: function(response) {

        var data = {
                code: response.country_code,
                name: response.country_name,
                selected: false,
                hdiSeries: []
            };

        // Compute the HDI Series
        for (var attr in response) {
            var part = attr.split('_'),
                series = [];
            if ((part.length === 3) && (part[2] === 'hdi')) {
                data.hdiSeries.push({
                    year: parseInt(part[1], 10),
                    hdi: parseFloat(response[attr])
                });
            }
        }

        // Sort the data items
        data.hdiSeries.sort(function(a, b) { return b.year - a.year; });
        return data;
    },


});
