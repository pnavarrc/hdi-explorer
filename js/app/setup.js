/* globals app, $ */


// Models & Collections

app.state = new app.ApplicationModel();

app.countries = new app.Countries();
app.countries.fetch({reset: true});

app.countries.listenTo(app.state, 'change:code', function(changed) {

    var code = changed.get('code');

    // Unselect previously selected items
    var selected = this.findWhere({selected: true});
    if (selected) { selected.set('selected', false); }

    // Change the selected item
    selected = this.get(code);
    selected.set('selected', true);
});


app.country = new app.CountrySummary();

app.country.listenTo(app.state, 'change:code', function(state) {
    this.setCode(state.get('code'));
});

app.country.listenTo(app.country, 'reset', function() {
    console.log('FETCH SUMMARY');
    console.log(this.toJSON());
});


var lview = new app.CountriesTrendView({
    el: $('div#chart'),
    collection: app.countries
});


app.countrySummaryView = new app.CountrySummaryView({
    el: 'div#table',
    model: app.country
});