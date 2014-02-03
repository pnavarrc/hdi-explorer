/* globals d3 */

// Encapsulate the charts in a global variable
var hdi = {};
hdi.chart = {};

hdi.chart.trend = function() {
    'use strict';

    var attributes = {
        width: 600,
        height: 400,
        margin: {top: 20, right: 20, bottom: 20, left: 20},
        series: function(d) { return d.series; },
        x: function(d) { return d.x; },
        y: function(d) { return d.y; }
    };

    // Charting Function
    function chart(selection) {
        selection.each(function(data) {

            var div = d3.select(this),
                svg = div.selectAll('svg').data([data]);

            var margin = chart.margin(),
                width = chart.width() - margin.left - margin.right,
                height = chart.height() - margin.top - margin.bottom;


            // Initialize the SVG element on enter
            svg.enter().append('svg').call(chart.svgInit);

            var gchart = svg.select('g.chart'),
                gphantom = svg.select('g.chart-phantom');

            // Scales
            var items = d3.merge(data.map(attributes.series));

            var xScale = d3.scale.linear()
                .domain(d3.extent(items, function(d) { return attributes.x(d); }))
                .range([0, width]);

            var yScale = d3.scale.linear()
                .domain(d3.extent(items, function(d) { return attributes.y(d); }))
                .range([height, 0]);

            var line = d3.svg.line()
                .x(function(d) { return xScale(attributes.x(d)); })
                .y(function(d) { return yScale(attributes.y(d)); });

            // Data Join
            var lines = gchart.selectAll('path').data(data),
                ghost = gphantom.selectAll('path').data(data);

            // Enter
            lines.enter().append('path')
                .attr('d', function(d) { return line(attributes.series(d)); })
                .classed('trend-path', true);

            ghost.enter().append('path')
                .attr('d', function(d) { return line(attributes.series(d)); })
                .classed('trend-phantom', true);

            // Highlight the phantom lines
            ghost.classed('trend-highlight', function(d) {
                return d.selected;
            });

            // X Axis
            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom');

            svg.select('g.xaxis').call(xAxis);

            svg.select('g.xaxis').selectAll('g.tick').select('line')
                .style('stroke', 'white')
                .attr('y2', 6)
                .attr('y1', -height);


        });
    }

    chart.svgInit = function(svg) {

        // Compute the width and height of the chart
        var margin = chart.margin(),
            width = chart.width() - margin.left - margin.right,
            height = chart.height() - margin.top - margin.bottom;

        // Set the SVG width and height
        svg.attr('width', chart.width()).attr('height', chart.height());

        // Group for the chart background rectangle
        svg.append('g')
            .attr('class', 'chart-background')
            .attr('transform', 'translate(' + [margin.left, margin.top] + ')')
            .append('rect')
            .attr('class', 'chart-background')
            .attr('width', width)
            .attr('height', height);

        // X Axis
        svg.append('g').attr('class', 'axis xaxis')
            .attr('transform', 'translate(' + [margin.left, margin.top + height] + ')');

        // Chart Groups

        // Main Lines
        svg.append('g').attr('class', 'chart')
            .attr('transform', 'translate(' + [margin.left, margin.top] + ')');

        // Phantom group
        svg.append('g').attr('class', 'chart-phantom')
            .attr('transform', 'translate(' + [margin.left, margin.top] + ')');

    };

    // Accessor Methods
    function createAccessor(attr) {
        function accessor(value) {
            if (!arguments.length) { return attributes[attr]; }
            attributes[attr] = value;
            return chart;
        }
        return accessor;
    }

    for (var attr in attributes) {
        if ((!chart[attr]) && (attributes.hasOwnProperty(attr))) {
            chart[attr] = createAccessor(attr);
        }
    }

    return chart;
};