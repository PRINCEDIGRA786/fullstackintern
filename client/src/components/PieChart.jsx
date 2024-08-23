import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 930;
    const height = 800;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "#f0f0f0")
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`); // Center the chart

    let color, pie, arc;

    if (typeof data[0]._id === 'object') {
      color = d3.scaleOrdinal()
        .domain(data.map(d => d._id.query))
        .range(d3.schemeSet3);

      pie = d3.pie().value(d => d.count);
      arc = d3.arc().innerRadius(0).outerRadius(radius);

      const arcs = svg.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g");

      arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data._id.query))
        .style("stroke", "#fff") // Add a stroke for better visibility
        .style("stroke-width", "1px")
        .on("mouseover", (event, d) => {
          d3.select(tooltipRef.current)
            .style("visibility", "visible")
            .style("background", color(d.data._id.query))
            .html(`${d.data._id.query} - for: ${d.data._id.total?d.data._id.total:2021}`);
        })
        .on("mousemove", (event) => {
          d3.select(tooltipRef.current)
            .style("top", `${event.pageY - 20}px`)
            .style("left", `${event.pageX + 20}px`);
        })
        .on("mouseout", () => {
          d3.select(tooltipRef.current)
            .style("visibility", "hidden");
        });
    } else {
      color = d3.scaleOrdinal()
        .domain(data.map(d => d._id))
        .range(d3.schemeSet3);

      pie = d3.pie().value(d => d.total || d.count);
      arc = d3.arc().innerRadius(0).outerRadius(radius);

      const arcs = svg.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g");

      arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data._id))
        .style("stroke", "#fff")
        .style("stroke-width", "1px")
        .on("mouseover", (event, d) => {
          d3.select(tooltipRef.current)
            .style("visibility", "visible")
            .style("background", color(d.data._id))
            .html(`${d.data._id} - Total: ${d.data.total || d.data.count}`);
        })
        .on("mousemove", (event) => {
          d3.select(tooltipRef.current)
            .style("top", `${event.pageY - 20}px`)
            .style("left", `${event.pageX + 20}px`);
        })
        .on("mouseout", () => {
          d3.select(tooltipRef.current)
            .style("visibility", "hidden");
        });
    }

  }, [data]);

  return (
    <>
      {
        (data.length === 1 && data[0]._id === null) ? (
          <h1 className='text-2xl font-semibold text-purple-600 animate-fadeIn'>
            Sorry!! No such data present
          </h1>
        ) : (
          <>
            <svg ref={svgRef} className='animate-fadeIn'></svg>
            <div
              ref={tooltipRef}
              style={{
                position: "absolute",
                visibility: "hidden",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                padding: "5px",
                borderRadius: "5px",
                pointerEvents: "none",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
              }}
            ></div>
          </>
        )
      }
    </>
  );
};

export default PieChart;
