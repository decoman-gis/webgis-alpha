import React, { useState } from 'react';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import './App.css';

const CoordinateInputAndPlot = ({ view }) => {
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  // Function to plot the XY coordinates
  const plotXY = (x, y) => {
    const point = new Point({
      x: x,
      y: y,
      spatialReference: { wkid: 3440 },
    });

    const markerSymbol = {
      type: 'simple-marker',
      color: [0, 255, 0],
      size: '12px',
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
    };

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
    });

    view.graphics.removeAll();
    view.graphics.add(pointGraphic);
    view.goTo({ target: point, zoom: 15 });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (x && y && view) {
      plotXY(Number(x), Number(y));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="coordinate-form">
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
