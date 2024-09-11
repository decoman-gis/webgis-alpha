import React, { useState } from 'react';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import './App.css'

// Component that handles both input and plotting
const CoordinateInputAndPlot = ({ view }) => {
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  // Function to plot the XY coordinates
  const plotXY = (x, y) => {
    // Define the point geometry using the provided X and Y coordinates
    const point = new Point({
      x: x, // X coordinate
      y: y, // Y coordinate
      spatialReference: { wkid: 3440 } // Ensure it matches your map's spatial reference
    });

    const markerSymbol = {
      type: "simple-marker",
      color: [0, 255, 0], // Green color for better visibility
      size: "12px",
      outline: {
        color: [255, 255, 255], // White outline
        width: 1
      }
    };

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol
    });

    // Clear previous graphics and add the new point
    view.graphics.removeAll();
    view.graphics.add(pointGraphic);

    // Optionally, center the map on the point
    view.goTo({ target: point, zoom: 15 });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (x && y && view) {
      plotXY(Number(x), Number(y)); // Plot the XY coordinates
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({ x, y });
      }}
      className="coordinate-form" // Using the CSS class defined in App.css
    >
      <div>
        <label htmlFor="x-coordinate">X Coordinate:</label>
        <input
          id="x-coordinate"
          type="number"
          value={x}
          onChange={(e) => setX(e.target.value)}
          placeholder="Enter X"
        />
      </div>

      <div>
        <label htmlFor="y-coordinate">Y Coordinate:</label>
        <input
          id="y-coordinate"
          type="number"
          value={y}
          onChange={(e) => setY(e.target.value)}
          placeholder="Enter Y"
        />
      </div>

      <button type="submit" className="action-button">
        Plot
      </button>
    </form>
  );
}; 

export default CoordinateInputAndPlot;
