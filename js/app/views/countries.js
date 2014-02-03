/* globals Backbone, $, d3, _, app, hdi */

app.CountriesTrendView = Backbone.View.extend({

    chart: hdi.chart.trend()
        .series(function(d) { return d.hdiSeries; })
        .x(function(d) { return d.year; })
        .y(function(d) { return d.hdi; }),

    events: {

    },

    // Initialization and render
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'change:selected', this.render);
    },

    render: function() {

        console.log('view::contries::render ' + app.state.get('code'));

        // Confirm that the collection has a selected item
        var selected = this.collection.findWhere({selected: true});

        if (selected) {
            console.log('view::countries::render ');
            console.log(selected.toJSON());
        } else {
            console.log('view::countries::render (no selected)');
        }

        console.log('view::countries::render (updating the chart)');
        d3.select(this.el)
            .data([this.collection.toJSON()])
            .call(this.chart);
    }

});