import React from 'react';

function Controls({ onInitialize, onStep, step, isInitialized }) {
  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={onInitialize}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Initialize
      </button>

      <button
        onClick={onStep}
        disabled={!isInitialized}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
      >
        Step
      </button>

      <div className="text-gray-600">
        Step: {step}
      </div>
    </div>
  );
}

export default Controls;