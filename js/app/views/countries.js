/* globals Backbone, $, d3, _, app, hdi, Bloodhound */

app.CountriesTrendView = Backbone.View.extend({

    // Initialize the trend chart
    chart: hdi.chart.trend()
        .series(function(d) { return d.hdiSeries; })
        .x(function(d) { return d.year; })
        .y(function(d) { return d.hdi; }),

    // Initialization and render
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'change:selected', this.render);
    },

    render: function() {

        // Update the width of the chart
        this.chart.width(this.$el.width());

        // Rebind and render the chart
        d3.select(this.el)
            .data([this.collection.toJSON()])
            .call(this.chart);
    },

    setState: function(state) {
        this.collection.setSelected(state.get('code'));
    }
});

app.CountriesSearchView = Backbone.View.extend({

    // Initialize
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
    },

    events: {
        'typeahead:selected input[type=text]': 'setSelected'
    },

    // Render the component
    render: function() {

        // Initialize the engine
        this.engine = new Bloodhound({
            datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: this.collection.toJSON()
        });

        this.engine.initialize();

        // Render the element
        this.$el.children('#search-country-input').typeahead(null, {
            displayKey: 'name',
            source: this.engine.ttAdapter()
        });
    },

    setSelected: function(event, datum) {
        this.setState(datum);
    },

    setState: function(state) {
        this.collection.setSelected(state.code);
    }

});