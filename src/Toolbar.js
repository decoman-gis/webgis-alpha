import React, { useState, useRef ,useEffect} from 'react';
import CoordinateInputAndPlot from './PlotXY'; // Import the plotting form
import './App.css'; // Import the stylesheet

const Toolbar = ({ view, onPlotXYClick }) => {
  const [isFormVisible, setFormVisible] = useState(false); // State to toggle form visibility
  const plotButtonRef = useRef(null); // Ref to track the plot button

  // Effect to handle button state whenever `isFormVisible` changes
  useEffect(() => {
    if (plotButtonRef.current) {
      if (isFormVisible) {
        plotButtonRef.current.classList.add('active');
      } else {
        plotButtonRef.current.classList.remove('active');
      }
    }
  }, [isFormVisible]);

  // Handle click event for Plot XY button
  const handlePlotXYClick = () => {
    onPlotXYClick(); // Call the provided function (for additional logic)
    setFormVisible((prev) => !prev); // Toggle the form's visibility state
  };

  return (
    <div>
      {/* Toolbar Button */}
      <div className="toolbar">
        <button
          className="action-button esri-icon-table"
          ref={plotButtonRef}
          onClick={handlePlotXYClick}
          title="Plot XY"
        ></button>
      </div>

      {/* Conditionally render the CoordinateInputAndPlot component */}
      {isFormVisible && <CoordinateInputAndPlot view={view} />}
    </div>
  );
};

export default Toolbar;
