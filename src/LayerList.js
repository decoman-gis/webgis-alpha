import LayerList from '@arcgis/core/widgets/LayerList';

// This function creates and adds a LayerList widget to the view
const LayerListWidget = (view) => {
  const layerList = new LayerList({
    view: view,
  });

  // Add the LayerList to the top-right of the UI
  view.ui.add(layerList, 'top-right');
};

export default LayerListWidget;
