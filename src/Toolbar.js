import React, { useState, useRef } from 'react';
import './App.css'; // Import the stylesheet

const Toolbar = ({ onPlotXYClick }) => {
  const [isFormVisible, setFormVisible] = useState(false); // State to toggle form visibility
  const plotButtonRef = useRef(null); // Ref to track the plot button

  // Utility to toggle the active button's state
  function setActiveButton(selectedButton) {
    const buttons = [plotButtonRef.current]; // Assuming only one button for now
    buttons.forEach((button) => button.classList.remove('active'));
    selectedButton.classList.add('active');
  }

  // Helper to reset all tools and hide the form
  function resetTools() {
    plotButtonRef.current.classList.remove('active');
    setFormVisible(false); // Hide form when resetting
  }

  // Handle click event for Plot XY button
  const handlePlotXYClick = () => {
    if (!plotButtonRef.current.classList.contains('active')) {
      onPlotXYClick(); // Call the provided function
      setActiveButton(plotButtonRef.current);
      setFormVisible(true); // Show the form
    } else {
      resetTools(); // Reset when clicked again
    }
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
        >
          
        </button>
      </div>

      {/* Conditionally render the form */}
      {isFormVisible && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Form submitted");
          }}
          className="coordinate-form"
        >
          <div>
            <label>X Coordinate: </label>
            <input type="number" placeholder="Enter X" />
          </div>
          <div>
            <label>Y Coordinate: </label>
            <input type="number" placeholder="Enter Y" />
          </div>
          <button type="submit">Plot</button>
        </form>
      )}
    </div>
  );
};

export default Toolbar;
