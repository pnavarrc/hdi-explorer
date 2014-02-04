/* globals Backbone, $, d3, _, app, hdi */

app.CountriesTrendView = Backbone.View.extend({

    // Initialize the trend chart
    chart: hdi.chart.trend()
        .series(function(d) { return d.hdiSeries; })
        .x(function(d) { return d.year; })
        .y(function(d) { return d.hdi; }),

    // View DOM Events
    events: {},

    // Initialization and render
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'change:selected', this.render);
    },

    render: function() {
        // Rebind and render the chart
        d3.select(this.el)
            .data([this.collection.toJSON()])
            .call(this.chart);
    }
});