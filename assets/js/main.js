var counties = [];
var colours = ["#66AFB2", "#79CED7", "#C96A23", "#D3D1C5", "#F5821F", "grey", "purple", "yellow", 
            "red", "orange", "green", "blue", "indigo", "cyan", "turquoise"];
var username = sessionStorage.getItem("username");            

var filename = "data/" + sessionStorage.getItem("province") + ".csv"
queue()
    .defer(d3.csv, filename)
    .await(makeGraphs);
    
function makeGraphs(error, data) {
    var ndx = crossfilter(data);
    
    data.forEach(function(d) {
        d.Cars = parseInt(d["Cars"]);
        d.County_Code = d.County[0] + (d.County[d.County.length-1]).toUpperCase();
        d.computer_owned = d["Computer Owned"];
        d.internet_status = d["Internet Status"].split("_")[1];
        d.transport_code = d["Transport"].split("_")[1];
        var start_array = d["Start Time"].split("_");
        if (start_array.length > 2) {
            d.start_code = start_array[2] + "+";
        } else {
            d.start_code = start_array[1];
        }
        d.travel_time_code = d["Travel Time"].split("_")[1];
    })
    show_county_totals(ndx);
    show_computer_totals(ndx);
    show_internet_totals(ndx);
    show_car_totals(ndx);
    show_internet_computer_distribution(ndx);
    show_transport_totals(ndx);
    show_time_totals(ndx);
    show_travel_totals(ndx);
    show_cars_transport_distribution(ndx);
    show_start_time_transport_distribution(ndx);
    show_travel_time_transport_distribution(ndx);
    
    for (i=0;i<data.length;i++) {
        if (counties.includes(data[i].County_Code)) {
            continue;
        } else {
            counties.push(data[i].County_Code);
        }
    }
    
    dc.renderAll();
    document.getElementById("usernameDetails").innerText = "Welcome " + username;
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
        .width(1000)
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

function show_internet_computer_distribution(ndx) {
    
    function rankByComputerOwned(dimension, computer_value) {
        return dimension.group().reduce(
            function (p, v) {
                p.total++;
                if(v.computer_owned == computer_value) {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.computer_owned == computer_value) {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
        );    
    }
    
    var dim = ndx.dimension(dc.pluck("internet_status"));
    var yesByComputerOwned = rankByComputerOwned(dim, "computer_yes");
    var noByComputerOwned = rankByComputerOwned(dim, "computer_no");
    var naByComputerOwned = rankByComputerOwned(dim, "computer_n/a");
    
    var barChart = dc.barChart("#internet_computer_distribution")
        .width(450)
        .height(250)
        .dimension(dim)
        .group(yesByComputerOwned, "Yes")
        .stack(noByComputerOwned, "No")
        .stack(naByComputerOwned, "N/A")
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total) * 100;
            } else {
                return 0;
            }
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Internet")
        .legend(dc.legend().x(400).y(20).itemHeight(15).gap(5))
        .margins({top: 10, right: 60, bottom: 50, left: 40});

}

function show_transport_totals(ndx) {
    
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
    
    var dim = ndx.dimension(dc.pluck("transport_code"));
    
    var barChart = dc.barChart("#transport_totals")
        .width(900)
        .height(400)
        .dimension(dim)
        .group(rankByCounty(dim, counties[0]), counties[0])
        .valueAccessor(function(d) {
            return d.value.count;
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .margins({top: 10, right: 10, bottom: 30, left: 60});
        
    for (var i=1;i<counties.length;i++) {
        barChart.stack(rankByCounty(dim, counties[i]), counties[i]);
    }
}

function show_time_totals(ndx) {
    
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
    
    var dim = ndx.dimension(dc.pluck("start_code"));
    
    var barChart = dc.barChart("#time_totals")
        .width(650)
        .height(250)
        .dimension(dim)
        .group(rankByCounty(dim, counties[0]), counties[0])
        .valueAccessor(function(d) {
            return d.value.count;
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .margins({top: 10, right: 50, bottom: 30, left: 60});
        
    for (var i=1;i<counties.length;i++) {
        barChart.stack(rankByCounty(dim, counties[i]), counties[i]);
    }
}

function show_travel_totals(ndx) {
    
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
    
    var dim = ndx.dimension(dc.pluck("travel_time_code"));
    
    var barChart = dc.barChart("#travel_totals")
        .width(450)
        .height(250)
        .dimension(dim)
        .group(rankByCounty(dim, counties[0]), counties[0])
        .valueAccessor(function(d) {
            return d.value.count;
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .margins({top: 10, right: 50, bottom: 30, left: 60});
        
    for (var i=1;i<counties.length;i++) {
        barChart.stack(rankByCounty(dim, counties[i]), counties[i]);
    }
}

function show_cars_transport_distribution(ndx) {
    
    function rankByCars(dimension, cars) {
        return dimension.group().reduce(
            function (p, v) {
                p.total++;
                if(v.Cars == cars) {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.Cars == cars) {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
        );    
    }
    
    var dim = ndx.dimension(dc.pluck("transport_code"));
    var zeroByTransport = rankByCars(dim, "0");
    var oneByTransport = rankByCars(dim, "1");
    var twoByTransport = rankByCars(dim, "2");
    var threeByTransport = rankByCars(dim, "3");
    var fourByTransport = rankByCars(dim, "4");
    
    var barChart = dc.barChart("#cars_transport_distribution")
        .width(770)
        .height(400)
        .dimension(dim)
        .group(zeroByTransport, "0 cars")
        .stack(oneByTransport, "1 cars")
        .stack(twoByTransport, "2 cars")
        .stack(threeByTransport, "3 cars")
        .stack(fourByTransport, "4+ cars")
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total) * 100;
            } else {
                return 0;
            }
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .legend(dc.legend().x(627).y(20).itemHeight(15).gap(5))
        .margins({top: 10, right: 150, bottom: 50, left: 50});

}

function show_start_time_transport_distribution(ndx) {
    
    function rankByTransport(dimension, transport_code) {
        return dimension.group().reduce(
            function (p, v) {
                p.total++;
                if(v.transport_code == transport_code) {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.transport_code == transport_code) {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
        );    
    }
    
    var dim = ndx.dimension(dc.pluck("start_code"));
    var bicycleByStartTime = rankByTransport(dim, "bicycle");
    var busByStartTime = rankByTransport(dim, "bus");
    var carByStartTime = rankByTransport(dim, "car");
    var footByStartTime = rankByTransport(dim, "foot");
    var liftByStartTime = rankByTransport(dim, "lift");
    var motorcycleByStartTime = rankByTransport(dim, "motorcycle");
    var otherByStartTime = rankByTransport(dim, "other");
    var trainByStartTime = rankByTransport(dim, "train");
    var vanByStartTime = rankByTransport(dim, "van");
    
    var barChart = dc.barChart("#start_time_transport_distribution")
        .width(770)
        .height(400)
        .dimension(dim)
        .group(bicycleByStartTime, "bicycle")
        .stack(busByStartTime, "bus")
        .stack(carByStartTime, "car")
        .stack(footByStartTime, "foot")
        .stack(liftByStartTime, "lift")
        .stack(motorcycleByStartTime, "motorcycle")
        .stack(otherByStartTime, "other")
        .stack(trainByStartTime, "train")
        .stack(vanByStartTime, "van")
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total) * 100;
            } else {
                return 0;
            }
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .legend(dc.legend().x(627).y(20).itemHeight(15).gap(5))
        .margins({top: 10, right: 150, bottom: 50, left: 50});

}

function show_travel_time_transport_distribution(ndx) {
    
    function rankByTransport(dimension, transport_code) {
        return dimension.group().reduce(
            function (p, v) {
                p.total++;
                if(v.transport_code == transport_code) {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.transport_code == transport_code) {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
        );    
    }
    
    var dim = ndx.dimension(dc.pluck("travel_time_code"));
    var bicycleByStartTime = rankByTransport(dim, "bicycle");
    var busByStartTime = rankByTransport(dim, "bus");
    var carByStartTime = rankByTransport(dim, "car");
    var footByStartTime = rankByTransport(dim, "foot");
    var liftByStartTime = rankByTransport(dim, "lift");
    var motorcycleByStartTime = rankByTransport(dim, "motorcycle");
    var otherByStartTime = rankByTransport(dim, "other");
    var trainByStartTime = rankByTransport(dim, "train");
    var vanByStartTime = rankByTransport(dim, "van");
    
    var barChart = dc.barChart("#travel_time_transport_distribution")
        .width(770)
        .height(400)
        .dimension(dim)
        .group(bicycleByStartTime, "bicycle")
        .stack(busByStartTime, "bus")
        .stack(carByStartTime, "car")
        .stack(footByStartTime, "foot")
        .stack(liftByStartTime, "lift")
        .stack(motorcycleByStartTime, "motorcycle")
        .stack(otherByStartTime, "other")
        .stack(trainByStartTime, "train")
        .stack(vanByStartTime, "van")
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total) * 100;
            } else {
                return 0;
            }
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .legend(dc.legend().x(627).y(20).itemHeight(15).gap(5))
        .margins({top: 10, right: 150, bottom: 50, left: 50});

}
