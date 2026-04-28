import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './App.css';

function App() {
  const d3Container = useRef(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Note: Change to your Render/Vercel URL after deployment
    fetch('http://localhost:5001/api/skills')
      .then(res => {
        if (!res.ok) throw new Error("Backend connection failed");
        return res.json();
      })
      .then(json => setData(json))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    if (data && d3Container.current) {
      const width = 800;
      const height = 500;
      
      const svg = d3.select(d3Container.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

      svg.selectAll("*").remove(); 

      // Physics Simulation Configuration
      const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink(data.links).id(d => d.id).distance(120))
        .force("charge", d3.forceManyBody().strength(-700)) 
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide(65)); // Prevents label overlapping

      // 1. Draw Links (Connections)
      const link = svg.append("g")
        .selectAll("line")
        .data(data.links)
        .join("line")
        .attr("stroke", "#cbd5e0")
        .attr("stroke-width", 2);

      // 2. Draw Nodes (Circles)
      const node = svg.append("g")
        .selectAll("circle")
        .data(data.nodes)
        .join("circle")
        .attr("r", 16)
        .attr("fill", d => {
          if (d.group === 1) return "#3b82f6"; // Blue (Frontend)
          if (d.group === 2) return "#10b981"; // Green (Backend)
          return "#f59e0b"; // Orange (Data/Analytics)
        })
        .style("cursor", "grab")
        .call(d3.drag()
          .on("start", (e, d) => {
            if (!e.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x; d.fy = d.y;
          })
          .on("drag", (e, d) => {
            d.fx = e.x;
            d.fy = e.y;
          })
          .on("end", (e, d) => {
            if (!e.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }));

      // 3. Draw Labels
      const labels = svg.append("g")
        .selectAll("text")
        .data(data.nodes)
        .join("text")
        .text(d => d.id)
        .attr("font-size", "14px")
        .attr("font-weight", "600")
        .attr("fill", "#1e293b")
        .attr("dx", 22)
        .attr("dy", 5);

      // 4. Tick Function (Physics update loop)
      simulation.on("tick", () => {
        // --- BOUNDING BOX LOGIC ---
        // Keeps nodes from bouncing out of the frame
        data.nodes.forEach(d => {
          const r = 20; // Padding from edge
          d.x = Math.max(r, Math.min(width - r - 80, d.x)); // Extra margin on right for text
          d.y = Math.max(r, Math.min(height - r, d.y));
        });

        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

        node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);

        labels
          .attr("x", d => d.x)
          .attr("y", d => d.y);
      });
    }
  }, [data]);

  return (
    <div className="App">
      <header className="header">
        <h1>SkillFlow Visualizer</h1>
        <p>Interactive mapping of course skills and industry tech.</p>
      </header>
      <div className="viz-container">
        {/* SVG fills the white box defined in CSS */}
        <svg ref={d3Container} width="100%" height="500px" />
      </div>
      <footer className="footer-legend">
        <span style={{color: '#3b82f6'}}>● Frontend</span>
        <span style={{color: '#10b981'}}> ● Backend</span>
        <span style={{color: '#f59e0b'}}> ● Analytics</span>
      </footer>
    </div>
  );
}

export default App;