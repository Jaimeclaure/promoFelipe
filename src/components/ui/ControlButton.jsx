import React from 'react';

const ControlButton = ({ onClick, disabled = false, children, ariaLabel }) => {
  return (
    <button
      className="control-button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default ControlButton;