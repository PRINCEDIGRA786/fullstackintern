import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr("width", 950)
      .attr("height", 500)
      .style("background", "#f0f0f0")
      .style("margin-top", "50px")
      .style("overflow", "visible");

    // Clear previous content
    svg.selectAll("*").remove();

    // Tooltip setup
    const tooltip = d3.select("body").append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("pointer-events", "none");

    if (typeof (data[0]._id) === 'object') {
      // Scaling
      const xScale = d3.scaleBand()
        .domain(data.map(d => d._id.query))
        .range([0, 900])
        .padding(0.3);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([400, 0]);

      // Axis
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      svg.append("g")
        .call(xAxis)
        .attr("transform", "translate(0, 400)")
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

      svg.append("g")
        .call(yAxis)
        .attr("transform", "translate(0, 0)");

      // Draw bars
      svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d._id.query))
        .attr("y", d => yScale(d.count))
        .attr("width", xScale.bandwidth())
        .attr("height", d => 400 - yScale(d.count))
        .attr("fill", "purple")
        .on("mouseover", (event, d) => {
          tooltip.style("visibility", "visible")
            .text(`${d._id.total?d._id.total:""} X: ${d._id.query}, Y: ${d.count}`);
        })
        .on("mousemove", (event) => {
          tooltip.style("top", `${event.pageY - 20}px`)
            .style("left", `${event.pageX + 20}px`);
        })
        .on("mouseout", () => {
          tooltip.style("visibility", "hidden");
        });
    } else {
      // Scaling
      const xScale = d3.scaleBand()
        .domain(data.map(d => d._id))
        .range([0, 900])
        .padding(0.3);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.total ? d.total : d.count)])
        .range([400, 0]);

      // Axis
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      svg.append("g")
        .call(xAxis)
        .attr("transform", "translate(0, 400)")
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

      svg.append("g")
        .call(yAxis)
        .attr("transform", "translate(0, 0)");

      // Draw bars
      svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d._id))
        .attr("y", d => yScale(d.total ? d.total : d.count))
        .attr("width", xScale.bandwidth())
        .attr("height", d => 400 - yScale(d.total ? d.total : d.count))
        .attr("fill", "purple")
        .on("mouseover", (event, d) => {
          tooltip.style("visibility", "visible")
            .text(`X: ${d._id}, Y: ${d.total ? d.total : d.count}`);
        })
        .on("mousemove", (event) => {
          tooltip.style("top", `${event.pageY - 20}px`)
            .style("left", `${event.pageX + 20}px`);
        })
        .on("mouseout", () => {
          tooltip.style("visibility", "hidden");
        });
    }

    // Clean up tooltip on unmount
    return () => {
      tooltip.remove();
    };
  }, [data]);

  return (
    <>
      {
        (data.length === 1 && data[0]._id === null) ? (
          <h1 className='text-2xl animate-fadeIn font-semibold text-purple-600'>
            Sorry!! No such data present
          </h1>
        ) : (
          <svg ref={svgRef}></svg>
        )
      }
    </>
  );
};

export default BarChart;
