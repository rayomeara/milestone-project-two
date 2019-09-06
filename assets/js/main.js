var counties = [];
var colours = ["#66AFB2", "#79CED7", "#C96A23", "#D3D1C5", "#F5821F", "grey", "purple", "yellow", 
            "red", "orange", "green", "blue", "indigo", "cyan", "turquoise"];
queue()
    .defer(d3.csv, "data/munster.csv")
    .await(makeGraphs);
    
function makeGraphs(error, data) {
    var ndx = crossfilter(data);
    
    data.forEach(function(d) {
        d.Cars = parseInt(d["Cars"]);
        d.County_Code = d.County[0] + (d.County[d.County.length-1]).toUpperCase();
    })
    show_county_totals(ndx);
    show_computer_totals(ndx);
    show_internet_totals(ndx);
    show_car_totals(ndx);
    
    for (i=0;i<data.length;i++) {
        if (counties.includes(data[i].County_Code)) {
            continue;
        } else {
            counties.push(data[i].County_Code);
        }
    }
    
    dc.renderAll();
}

function show_county_totals(ndx) {
    var dim = ndx.dimension(dc.pluck("County_Code"));
    
    function add_item(p) {
        p.count++;
        return p;
    }
    
    function remove_item(p) {
        p.count--;
        return p;
    }
    
    function initialise() {
        return {count: 0};
    }
    
    var computersByRegion = dim.group().reduce(add_item, remove_item, initialise);
    
    dc.barChart("#county_totals")
        .width(800)
        .height(500)
        .margins({top: 20, right: 80, bottom: 30, left: 80})
        .dimension(dim)
        .group(computersByRegion)
        .valueAccessor(function(d) {
            return d.value.count;
        })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .colorAccessor(d => d.key)
        .ordinalColors(colours)
        .yAxis().ticks(16);
}

function show_computer_totals(ndx) {
    
    function rankByCounty(dimension, rank) {
        return dimension.group().reduce(
            function (p, v) {
                p.count++;
                return p;
            },
            function (p, v) {
                p.count--;
                return p;
            },
            function () {
                return {count: 0};
            }
        );    
    }
    
    var dim = ndx.dimension(dc.pluck("Computer Owned"));
    
    var barChart = dc.barChart("#computer_totals")
        .width(450)
        .height(250)
        .dimension(dim)
        .group(rankByCounty(dim, counties[0]), counties[0])
        .valueAccessor(function(d) {
            return d.value.count;
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .margins({top: 10, right: 100, bottom: 30, left: 60});
        
    for (var i=1;i<counties.length;i++) {
        barChart.stack(rankByCounty(dim, counties[i]), counties[i]);
    }
    barChart.xAxis().tickFormat(function(l) { return l.split('_')[1]; });
}

function show_internet_totals(ndx) {
    
    function rankByCounty(dimension, rank) {
        return dimension.group().reduce(
            function (p) {
                p.count++;
                return p;
            },
            function (p) {
                p.count--;
                return p;
            },
            function () {
                return {count: 0};
            }
        );    
    }
    
    var dim = ndx.dimension(dc.pluck("Internet Status"));
    
    var barChart = dc.barChart("#internet_totals")
        .width(550)
        .height(250)
        .dimension(dim)
        .group(rankByCounty(dim, counties[0]), counties[0])
        .valueAccessor(function(d) {
            return d.value.count;
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .margins({top: 10, right: 100, bottom: 30, left: 60});
        
    for (var i=1;i<counties.length;i++) {
        barChart.stack(rankByCounty(dim, counties[i]), counties[i]);
    }
    barChart.xAxis().tickFormat(function(l) { return l.split('_')[1]; });
}

function show_car_totals(ndx) {
    
    function rankByCounty(dimension, rank) {
        return dimension.group().reduce(
            function (p) {
                p.count++;
                return p;
            },
            function (p, v) {
                p.count--;
                return p;
            },
            function () {
                return {count: 0};
            }
        );    
    }
    
    var dim = ndx.dimension(dc.pluck("Cars"));
    
    var barChart = dc.barChart("#car_totals")
        .width(450)
        .height(250)
        .dimension(dim)
        .group(rankByCounty(dim, counties[0]), counties[0])
        .valueAccessor(function(d) {
            return d.value.count;
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .margins({top: 10, right: 100, bottom: 30, left: 60});
        
    for (var i=1;i<counties.length;i++) {
        barChart.stack(rankByCounty(dim, counties[i]), counties[i]);
    }
}
