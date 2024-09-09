import React, { useRef, useEffect } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import LayerList from '@arcgis/core/widgets/LayerList';
import '@arcgis/core/assets/esri/themes/light/main.css';
import esriConfig from "@arcgis/core/config"; 

const LayerListMap = () => {
  const viewDiv = useRef(null); // Reference for the div element

  useEffect(() => {
    // Create the WebMap instance using the provided WebMap ID

    esriConfig.portalUrl = "https://dpcgeo01.dapeco.com.om/portal/";
    //esriConfig.portalUrl = "https://www.arcgis.com";

    const webmap = new WebMap({
      portalItem: {
        //id: "18b13990505d4f0faf1158783846b78d"  // Your WebMap ID
        id: "504d864dacfa4308998c124c496568eb"
      },
    });

    // Create the MapView instance (2D)
    const view = new MapView({
      container: viewDiv.current,
      map: webmap, // Assign the WebMap to the MapView
    });

    // Wait for the view to load
    view.when(() => {
      // Add the LayerList widget
      const layerList = new LayerList({
        view: view,
      });

      // Add the LayerList to the top-right of the UI
      view.ui.add(layerList, 'top-right');
    });

    // Clean up the view on component unmount
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

export default LayerListMap;
