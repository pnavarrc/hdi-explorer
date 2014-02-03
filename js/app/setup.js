/* globals app, $ */


// Models & Collections

app.state = new app.ApplicationModel();

app.countries = new app.Countries();
app.countries.fetch({reset: true});

app.countries.listenTo(app.state, 'change:code', function(changed) {

    var code = changed.get('code');

    console.log('app.state ' + code);

    // Unselect previously selected items
    var selected = this.findWhere({selected: true});

    if (selected) {
        console.log('previously selected item: ' + selected.get('code'));
        selected.set('selected', false);
    }

    // Change the selected item
    selected = this.get(code);
    console.log('new selected item: ' + selected.get('code'));
    selected.set('selected', true);
});


app.country = new app.CountrySummary();


var lview = new app.CountriesTrendView({
    el: $('div#chart'),
    collection: app.countries
});