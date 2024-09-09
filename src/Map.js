import React, { useRef, useEffect } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import '@arcgis/core/assets/esri/themes/light/main.css';
import esriConfig from "@arcgis/core/config"; 
import LayerListWidget from './LayerList'; // Import LayerList component

const Map = () => {
  const viewDiv = useRef(null); // Reference for the div element

  useEffect(() => {
    esriConfig.portalUrl = "https://dpcgeo01.dapeco.com.om/portal/";
    //esriConfig.portalUrl = "https://www.arcgis.com";

    const webmap = new WebMap({
      portalItem: {
        id: "504d864dacfa4308998c124c496568eb"
      },
    });

    const view = new MapView({
      container: viewDiv.current,
      map: webmap, // Assign the WebMap to the MapView
    });

    // Wait for the view to load
    view.when(() => {
      LayerListWidget(view); // Call LayerList component to add it to the UI
    });

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  return (
    <div
      style={{ padding: 0, margin: 0, height: '100vh', width: '100vw', overflow: 'hidden' }}
      ref={viewDiv}
    ></div>
  );
};

export default Map;
