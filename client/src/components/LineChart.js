import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        // Clear the previous content
        d3.select(svgRef.current).selectAll("*").remove();

        // Set up the SVG container
        const svg = d3.select(svgRef.current)
            .attr("width", 950)
            .attr("height", 500)
            .style("background", "#f0f0f0")
            .style("margin-top", "50px")
            .style("overflow", "visible");

        // Define the margins
        const margin = { top: 20, right: 30, bottom: 50, left: 50 };
        const width = 950 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Append a group element to the SVG for the chart content
        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Scaling
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => {
                if (typeof d._id === 'object') {
                    return d._id.query;
                } else {
                    return d._id;
                }
            }))
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.total)])
            .range([height, 0]);

        // Axis
        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d")); // Format as integer
        const yAxis = d3.axisLeft(yScale);

        g.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        g.append("g")
            .call(yAxis);

        // Line generator
        const line = d3.line()
            .x(d => {
                if (typeof d._id === 'object') {
                    return xScale(d._id.query);
                } else {
                    return xScale(d._id);
                }
            })
            .y(d => yScale(d.count))
            .curve(d3.curveMonotoneX); // Apply smoothing

        // Draw the line
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "purple")
            .attr("stroke-width", 2)
            .attr("d", line);

        // Add circles at data points
        g.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => {
                if (typeof d._id === 'object') {
                    return xScale(d._id.query);
                } else {
                    return xScale(d._id);
                }
            })
            .attr("cy", d => yScale(d.total))
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
                let displayValue;
                if (typeof d._id === 'object') {
                    displayValue = d._id.query;
                } else {
                    displayValue = d._id;
                }
                tooltip.html(` ${displayValue}<br>value: ${d.total}`)
                    .style("visibility", "visible");
            })
            .on("mousemove", event => {
                tooltip.style("top", `${event.pageY - 20}px`)
                    .style("left", `${event.pageX + 20}px`);
            })
            .on("mouseout", () => {
                tooltip.style("visibility", "hidden");
            });

        // Cleanup tooltip on component unmount
        return () => {
            tooltip.remove();
        };

    }, [data]);

    return (
        <>
            {
                (typeof data[0]._id === 'number' || typeof data[0]._id === 'object') ? (
                    <svg ref={svgRef}></svg>
                ) : (
                    <h1 className='text-purple-600 text-3xl animate-fadeIn font-extrabold'>
                        No!! Data to Display
                    </h1>
                )
            }
        </>
    );
};

export default LineChart;
