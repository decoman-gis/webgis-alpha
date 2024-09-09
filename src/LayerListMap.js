import React, { useRef, useEffect } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import LayerList from '@arcgis/core/widgets/LayerList';
import '@arcgis/core/assets/esri/themes/light/main.css';

const LayerListMap = () => {
  const viewDiv = useRef(null); // Reference for the div element

  useEffect(() => {
    // Create the WebMap instance using the provided WebMap ID
    const webmap = new WebMap({
      portalItem: {
        id: 'e691172598f04ea8881cd2a4adaa45ba', // Your WebMap ID
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
