import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';

// Function to add a point to the map
const plotXY = (view) => {
  // Define the point geometry (using meters as spatial reference)
  const point = new Point({
    x: 377930.18, // X coordinate in meters
    y: 2514656.07, // Y coordinate in meters
    spatialReference: { wkid: 3857 } // Make sure the spatial reference matches your map's spatial reference
  });

  // Create a symbol for the point (customize this as needed)
  const markerSymbol = {
    type: "simple-marker",
    color: [255, 0, 0], // Red color
    size: "12px",
    outline: {
      color: [255, 255, 255], // White outline
      width: 1
    }
  };

  // Create a graphic and add the point and symbol to it
  const pointGraphic = new Graphic({
    geometry: point,
    symbol: markerSymbol
  });

  // Add the graphic to the view
  view.graphics.add(pointGraphic);

  // Optionally, center the map on the point
  view.goTo({ target: point, zoom: 15 });
};

export default plotXY;
