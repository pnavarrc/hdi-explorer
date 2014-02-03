/* globals Backbone, app */

app.CountrySummaryView = Backbone.View.extend({

    initialize: function() {
        this.listenTo(this.model, 'change:code', this.render);
    },

    render: function() {
        console.log(this.model.get('code'));
    }

});