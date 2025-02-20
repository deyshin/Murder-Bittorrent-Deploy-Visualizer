import React, { useState, useRef, useEffect } from 'react';

function Controls({
  onInitialize,
  onStep,
  step,
  isInitialized,
  isComplete,
  serverCount,
  setServerCount,
  fileCount,
  setFileCount,
  isRunning,
  setIsRunning
}) {
  const [stepInterval, setStepInterval] = useState(10);
  const runIntervalRef = useRef(null);

  // Clear interval when component unmounts or when isInitialized changes
  useEffect(() => {
    return () => {
      if (runIntervalRef.current) {
        clearInterval(runIntervalRef.current);
      }
    };
  }, []);

  // Stop running when initialization happens
  useEffect(() => {
    if (!isInitialized) {
      if (runIntervalRef.current) {
        clearInterval(runIntervalRef.current);
        runIntervalRef.current = null;
      }
      setIsRunning(false);
    }
  }, [isInitialized, setIsRunning]);

  // Stop running when initialization happens or when servers change
  useEffect(() => {
    if (isRunning && !isInitialized) {
      clearInterval(runIntervalRef.current);
      runIntervalRef.current = null;
      setIsRunning(false);
    }
  }, [isInitialized, isRunning, setIsRunning]);

  const handleRun = () => {
    if (!isInitialized) return;

    if (isRunning) {
      clearInterval(runIntervalRef.current);
      runIntervalRef.current = null;
      setIsRunning(false);
    } else {
      if (runIntervalRef.current) {
        clearInterval(runIntervalRef.current);
      }
      runIntervalRef.current = setInterval(onStep, stepInterval);
      setIsRunning(true);
    }
  };

  // Update interval while running
  useEffect(() => {
    if (isRunning) {
      clearInterval(runIntervalRef.current);
      runIntervalRef.current = setInterval(onStep, stepInterval);
    }
  }, [stepInterval, isRunning, onStep]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <label className="text-gray-300 text-sm">Servers:</label>
            <input
              type="number"
              value={serverCount}
              onChange={(e) => setServerCount(Number(e.target.value))}
              className="w-20 px-2 py-1 bg-gray-700 text-gray-200 rounded border border-gray-600 disabled:opacity-50"
              min="2"
              max="100"
              disabled={isRunning}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="text-gray-300 text-sm">Files:</label>
            <input
              type="number"
              value={fileCount}
              onChange={(e) => setFileCount(Number(e.target.value))}
              className="w-20 px-2 py-1 bg-gray-700 text-gray-200 rounded border border-gray-600 disabled:opacity-50"
              min="1"
              max="50"
              disabled={isRunning}
            />
          </div>
        </div>

        <div className="h-8 border-l border-gray-600"></div>

        <button
          onClick={onInitialize}
          disabled={isRunning}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Initialize
        </button>

        <div className="flex gap-4 items-center">
          <button
            onClick={onStep}
            disabled={!isInitialized || isRunning || isComplete}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            Step
          </button>

          <button
            onClick={handleRun}
            disabled={!isInitialized || isComplete}
            className={`px-4 py-2 ${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white rounded disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors`}
          >
            {isRunning ? 'Stop' : 'Run'}
          </button>

          <div className="flex gap-2 items-center">
            <label className="text-gray-300 text-sm">Interval (ms):</label>
            <input
              type="number"
              value={stepInterval}
              onChange={(e) => setStepInterval(Number(e.target.value))}
              className="w-20 px-2 py-1 bg-gray-700 text-gray-200 rounded border border-gray-600 disabled:opacity-50"
              min="10"
              max="2000"
              step="10"
              disabled={isRunning}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-gray-300">
            Step: {step}
          </div>
          {isComplete && (
            <div className="text-emerald-400 font-medium">
              Complete!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Controls;