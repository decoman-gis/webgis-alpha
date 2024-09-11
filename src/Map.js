import React, { useRef, useEffect, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import '@arcgis/core/assets/esri/themes/light/main.css';
import esriConfig from "@arcgis/core/config"; 
import LayerListWidget from './LayerList'; // Import LayerList component
import CoordinateInputAndPlot from './PlotXY'; // Import merged component
import Toolbar from './Toolbar'; // Import the Toolbar component

const Map = () => {
  const viewDiv = useRef(null); // Reference for the div element
  const [view, setView] = useState(null); // Store view in state
  const [showPlotXY, setShowPlotXY] = useState(false);


  useEffect(() => {
    esriConfig.portalUrl = "https://dpcgeo01.dapeco.com.om/portal/";
    //esriConfig.portalUrl = "https://www.arcgis.com";

    const webmap = new WebMap({
      portalItem: {
        id: "504d864dacfa4308998c124c496568eb"
      },
    });

    const mapView = new MapView({
      container: viewDiv.current,
      map: webmap, // Assign the WebMap to the MapView
    });

    mapView.when(() => {
      LayerListWidget(mapView); // Add LayerList widget
      setView(mapView); // Set the view in state so it can be used for plotting coordinates
    });

    return () => {
      if (mapView) {
        mapView.destroy();
      }
    };
  }, []);

  const handlePlotXYClick = () => {
    setShowPlotXY(!showPlotXY);
  };
  

  return (
    <div style={{ position: 'relative' }}>
      {/* Toolbar */}
      <Toolbar onPlotXYClick={handlePlotXYClick} />

      {/* Map container */}
      <div
        style={{ padding: 0, margin: 0, height: '100vh', width: '100vw', overflow: 'hidden' }}
        ref={viewDiv}
      ></div>

      {/* Show Plot XY form when toggled */}
      {view && showPlotXY && <CoordinateInputAndPlot view={view} />}
    </div>
  );
};

export default Map;
