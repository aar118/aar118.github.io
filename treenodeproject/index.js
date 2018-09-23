$(document).ready(function () {
    $('.hideshow').on('click', function (event) {
        $('#backdrop-div').toggle();
        $('#searchbar').toggle();
        //            $('#statzone').toggle();
        $('#gui').toggle();
    });
});

// ------ Global variables -----------
// set SVG width, height to window size

var selected_node = null;
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    full_width = w.innerWidth || e.clientWidth || g.clientWidth,
    full_height = w.innerHeight || e.clientHeight || g.clientHeight;

var svg = d3.select("#viz")
    .attr("width", full_width)
    .attr("height", full_height);

function updateWindow() {
    var full_width = w.innerWidth || e.clientWidth || g.clientWidth;
    var full_height = w.innerHeight || e.clientHeight || g.clientHeight;

    svg.attr("width", full_width).attr("height", full_height);
    backgrd.attr("width", full_width).attr("height", full_height);
}
window.onresize = updateWindow;

// create a background to intercept events
// (responds to mouse, even when transparent)
var backgrd = svg.append("rect")
    .attr("width", full_width)
    .attr("height", full_height)
    .style("fill", "red")
    .style("opacity", 0.0)
    .style("pointer-events", "all")
//            .on("click", unclick);

var g = svg.append("g")
    .attr("class", "container");

/////// ----------------------- FUNCTIONS ----------------

//------------------------ ZOOM ------------------------

function zoomed() {
    //        console.log("zoomed trsfrm", d3.event.transform);
    g.attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ")scale(" + d3.event.transform.k + ")");
}

var zoom = d3.zoom()
    .scaleExtent([0.3, 3])
    .on("zoom", zoomed);
// look at zoom.extent and zoom.translateExtent
svg.call(zoom); // why SVG and not g ?


//------------------------ CLICK STUFF ----------------------

d3.select("#close2").on("click", function () { d3.select("#statzone").attr("class", "hide") });

var acc = document.getElementsByClassName("accordion");
var panel = document.getElementsByClassName('panel');

for (var i = 0; i < acc.length; i++) {
    acc[i].onclick = function () {
        console.log("Boop");
    }
}

function center_node(d, zoomon) {

    // Open panel
    d3.select("#statzone").attr("class", "show");

    // change background of active node and disable background of all other nodes
    //g.selectAll("circle").attr("class", "");

    // Moves clicked node to center ; if zoomon true, will also zoom to on node to make it readable

    if (zoomon) {
        var scale = 3; // change to adapt to font box size !
    } else {
        var scale = d3.zoomTransform(viz).k;
    }

    var dcx = (full_width / 2 - d.x * scale);
    var dcy = (full_height / 2 - d.y * scale);

    // effectively do the transform
    g.transition()
        .duration(2000)
        .attr("transform", "translate(" + dcx + "," + dcy + ")scale(" + scale + ")");

    // update zoom object to reflect the transform, and prevent "jumping" effect when click followed by panning
    d3.select(viz).transition().duration(2000)
        .call(zoom.transform, d3.zoomIdentity.translate(dcx, dcy).scale(scale));
    display_course_info(d)
}

function display_course_info(d) {
    $("#navtitle").html(`<a href="https://www.wright.edu/degrees-and-programs/catalog/courses/${d.course_type}-${d.code}/" target="_blank">${d.name}</a>`); /* onclick="searchNode()" */
    $("#navcoursetype").html(`<label>Course Type: <a class="disabled">${d.course_type}</a></label>`);
    $("#navcode").html(`<label>Code: <a class="disabled">${d.code}</a></label>`);
    $("#navlevel").html(`<label>Level: <a class="disabled">${d.level}</a></label>`);
    $("#navcredithours").html(`<label>Credit Hours: <a class="disabled">${d.credit_hours}</a></label>`);
    $("#navscheduletype").html(`<label>Schedule Type: <a class="disabled">${d.schedule_type}</a></label>`);
    $("#navdescription").html(`<label>Description: <a class="disabled">${d.description}</a></label>`);
    $("#naviw").html(`<label>Integrated Writing: <a class="disabled">${d.iw}</a></label>`);
    $("#navmc").html(`<label>Multicultural Competency: <a class="disabled">${d.mc}</a></label>`);
    var i;
    var coreq = "<label>Corequisites: "
    for (i = 0; i < d.corequisites.length - 1; i++) {
        coreq += `<a onclick="searchNode('${d.corequisites[i]}')">${d.corequisites[i]}</a>, `
    }
    coreq += `<a onclick="searchNode('${d.corequisites[i]}')">${d.corequisites[i]}</a></label>`
    $("#navcorequisites").html(coreq);
    var prereq = "<label>Prerequisites: "
    for (i = 0; i < d.prerequisites.length - 1; i++) {
        prereq += `<a onclick="searchNode('${d.prerequisites[i]}')">${d.prerequisites[i]}</a>, `
    }
    prereq += `<a onclick="searchNode('${d.prerequisites[i]}')">${d.prerequisites[i]}</a></label>`
    $("#navprerequisites").html(prereq);
}

function node_scale(uses) {
    if (config["node scaling"] == false) {
        return 10 + uses;
    } else {
        return 10 + 10 * Math.sqrt(uses);
    }
}


/////////---------------- FORCE SIMULATION -----------------

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink()
        .id(function (d) { return d.name; })
        .distance(function (d) { return d.type == "prerequisite" ? 1000 : 500 })
        .strength(1))
    .force("center", d3.forceCenter(full_width / 2, full_height / 2))
    .force("collision", d3.forceCollide().radius(25));


    d3.json("graph_links.json", function (error, graph_links) {
        if (error) throw error;

        d3.json("graph_nodes.json", function (error, graph_nodes) {
            if (error) throw error;

            var links = [];
            if (config.Major == "") {
                for (var k in graph_links) {
                    for (i = 0; i < graph_links[k].length; i++) {
                        links.push(graph_links[k][i]);
                    }
                }
            } else {
                links = graph_links[config.Major];
            }

            var nodes = [];
            if (config.Major == "") {
                nodes = graph_nodes;
            } else {
                for (var k in graph_nodes) {
                    for (var m in graph_nodes[k].majors) {
                        console.log(m);
                        if (graph_nodes[k].majors[m] == config.Major) {
                            nodes.push(graph_nodes[k]);
                            break;
                        }
                    }
                }
            }

            g.append("defs").selectAll("marker")
                .data(links)
                .enter().append("marker")
                .attr("id", function (d) { return d; })
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 30)
                .attr("refY", 0)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M0,-5L10,0L0,5");

            var link = g.append("g")
                .selectAll("path")
                .data(links)
                .enter().append("path")
                .attr("class", function (d) { return "links " + d.type; })
                .attr("marker-end", function (d) { return "url(#" + d.type + ")"; });


            var count = 0;
            var node = g.append("g")
                .attr("class", "nodes")
                .selectAll("g")
                .data(nodes)
                .enter().append("g")
                .attr("id", function (d) {
                    return d.name;
                })
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));

            var circle = node.append("circle")
                .data(nodes)
                .attr("r", 20)
                .on("mouseover", function (d) {
                    d3.select(this).style("cursor", "pointer")
                })
                .on("mouseout", function (d) {
                    d3.select(this).style("cursor", "")
                })
                .on("click", function (d) {
                    console.log("node clicked!", count);
                    selected_node = d;
                    center_node(d, false);
                    count += 1;
                });

            var text = node.append("text")
                .data(nodes)
                .attr("x", 25)
                .attr("y", ".35em")
                .text(function (d) { return d.name; });
            // -------- SIMULATION -------
            simulation
                .nodes(nodes)
                .on("tick", ticked)
                .on("end", function () {
                    console.log("end of simulation");
                });

            simulation.force("link")
                .links(links);

            var counter = 0;

            var update_Inertia = function () {

                //                requestAnimationFrame(update_Inertia);
                config.Inertia -= 0.02;
                simulation.velocityDecay(config.Inertia);
                simulation.restart()

            };


            function ticked() {
                link
                    .attr("d", function (d) {
                        return "M" + d.source.x + "," + d.source.y + "A0,0 0 0,1" + d.target.x + "," + d.target.y;
                    });


                node
                    .attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    }); // for the text

                circle
                    .classed("circle-active", function (d) { return d === selected_node; });
                counter += 1;

                if (counter < 31) {
                    update_Inertia();
                }
                //                console.log(config.Inertia);
            }

            // --------- Autocomplete search bar (needs access to data) --------
            var optArray = [];
            var optArray2 = [];

            for (var i = 0; i < nodes.length - 1; i++) {
                optArray.push(nodes[i].name);
                optArray.push(nodes[i].course_type + nodes[i].code);
            }

            optArray = optArray.sort();
            $(function () {
                $("#search").autocomplete({
                    source: optArray
                });
            });

            // automatically search font when clicking on it in drop-down menu (//like Google)
            d3.selectAll(".ui-autocomplete").on("click", function () {
                // wait for font to appear in search bar
                setTimeout(function () {
                    document.getElementById('searchBtn').click();
                }, 100)
            });

        });
    });

// --------- More functions --------

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

function searchNode(course) {

    //find the node
    var selectedVal = course || document.getElementById('search').value;
    var node = svg.selectAll("text");

    if (selectedVal == "none") {
        return
        // sth (eg. flash red search box)
    } else {
        var selected = node.filter(function (d) {
            if (course) {
                return d.course_type + d.code == course;
            } else {
                return d.name == selectedVal || d.course_type + d.code == selectedVal;
            }
        });
        selected_node = selected.datum();
        simulation.restart();
        center_node(selected.datum(), true);
        fadeOtherLinks(selected.datum());
    }   
}

function fadeOtherLinks(name) {
    var active_links = g.selectAll("path").filter(function (d) {
        console.log(d);
        return name == d.source.name || name == d.target.name;
    });
    //console.log('hello, fading');

    svg.selectAll("path").attr("class", "inactive");

    active_links.attr("class", "active");

}

            /*
            function getValues() {
                var names = [];

                $('input:checked').each(function () {
                    names.push($(this).attr("name") + this.id);
                });

                console.log(names)
            }

            function mousedownNode(d, i) {
                nodes.splice(i, 1);
                links = links.filter(function (l) {
                    return l.source !== d && l.target !== d;
                });
                d3.event.stopPropagation();

                build_graph();
            }


                <div id="gui" class="gui">
                    <fieldset>
                        <div class="legend">Majors</div>
                        <div>
                            <input type="checkbox" id="computerscience" name="major" value="cs" onclick="getValues()" checked>
                            <label for="computerscience">Computer Science</label>
                        </div>
                        <div>
                            <input type="checkbox" id="computerengineering" name="major" value="ceg" onclick="getValues()" checked>
                            <label for="computerengineering">Computer Engineering</label>
                        </div>
                    </fieldset>
                </div>
            */