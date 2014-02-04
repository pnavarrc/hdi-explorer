/* globals Backbone, app, _ */

app.CountrySummary = Backbone.Model.extend({

    url: '',

    baseurl: 'http://data.undp.org/resource/wxub-qc5k.json',

    urltpl: _.template('<%= baseurl %>?Abbreviation=<%= code %>'),

    default: {
        code: '',
        name: ''
    },

    setCode: function(code) {
        // Construct the URL and fetch the data
        this.url = this.urltpl({baseurl: this.baseurl, code: code});
        this.fetch({reset: true});
    },

    parse: function(response) {
        // Get the first item of the response
        var item = response.pop();

        var data = {
            code: item.abbreviation,
            name: item.name
        };

        // Parse the rank
        for (var attr in item) {
            if (attr[0] === '_') {
                // Extract the attribute name after the year
                var p = attr.slice(6);
                data[p] = item[attr];

                console.log(p + ' ' + item[attr]);
            }
        }

        console.log(data);

        // Construct the data object
        return data;
    }
});

app.CountryTrend = Backbone.Model.extend({

    // Default values for the Country Trend Model
    defaults: {
        name: '',
        code: '',
        selected: false,
        hdiSeries: []
    },

    // The country code identifies uniquely the model
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
    }
});
