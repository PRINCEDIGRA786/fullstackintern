import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data.length === 1 && data[0]._id === null) {
      return;
    }

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up SVG container
    const svg = d3.select(svgRef.current)
      .attr("width", 950)
      .attr("height", 500)
      .style("background", "#f0f0f0")
      .style("margin-top", "50px")
      .style("overflow", "visible");

    // Define margins
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = 950 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Append a group element to the SVG
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scaling
    let xScale, yScale, xAccessor, yAccessor;

    if (typeof (data[0]._id) === 'object') {
      // When _id is an object, assume it has `year` and `intensity`
      xAccessor = d => d._id.query;  // Replace 'queryField' with actual field name
      yAccessor = d => d.count;  // Y-axis represents intensity

      xScale = d3.scaleLinear()
        .domain([d3.min(data, xAccessor), d3.max(data, xAccessor)])
        .range([0, width]);

      yScale = d3.scaleLinear()
        .domain([0, d3.max(data, yAccessor)])
        .range([height, 0]);
    } else {
      // When _id is a simple value (number)
      xAccessor = d => d._id;
      yAccessor = d => d.count;

      xScale = d3.scaleLinear()
        .domain([d3.min(data, xAccessor), d3.max(data, xAccessor)])
        .range([0, width]);

      yScale = d3.scaleLinear()
        .domain([0, d3.max(data, yAccessor)])
        .range([height, 0]);
    }

    // Axis
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
    const yAxis = d3.axisLeft(yScale);

    g.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    g.append("g")
      .call(yAxis);

    // Draw scatter points
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(xAccessor(d)))
      .attr("cy", d => yScale(yAccessor(d)))
      .attr("r", 5)
      .attr("fill", "purple");

    // Add tooltip
    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "5px")
      .style("border-radius", "5px");

    g.selectAll("circle")
      .on("mouseover", (event, d) => {
        if (typeof (d._id) === 'object') {
          tooltip.html(`X: ${xAccessor(d)}<br>Y: ${yAccessor(d)}<br> ${d._id.total?d._id.total:""}`)
            .style("visibility", "visible");
        } else {
          tooltip.html(`X: ${d._id}<br>Y: ${yAccessor(d)}`)
            .style("visibility", "visible");
        }
      })
      .on("mousemove", event => {
        tooltip.style("top", `${event.pageY - 20}px`)
          .style("left", `${event.pageX + 20}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    // Clean up tooltip on unmount
    return () => {
      tooltip.remove();
    };
  }, [data]);

  return (
    <>
      {
        (typeof (data[0]._id) === 'object' || typeof (data[0]._id) === 'number') ?
          <svg ref={svgRef}></svg> :
          <h1 className='text-purple-600 text-3xl animate-fadeIn font-extrabold'>No!! Data to Display</h1>
      }
    </>
  );
};

export default ScatterPlot;
