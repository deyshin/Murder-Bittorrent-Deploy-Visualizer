import React, { useState, useEffect } from 'react';
import ServerGrid from './components/ServerGrid';
import Controls from './components/Controls';
import { initializeServers, performStep } from './utils/algorithmLogic';

function App() {
  const [servers, setServers] = useState([]);
  const [step, setStep] = useState(0);
  const [serverCount, setServerCount] = useState(50);
  const [fileCount, setFileCount] = useState(15);
  const [isRunning, setIsRunning] = useState(false);

  const isComplete = servers.length > 0 && servers.every(server =>
    server.files.every(file => file === 'full')
  );

  // Reset servers when configuration changes
  useEffect(() => {
    setServers([]);
    setStep(0);
    setIsRunning(false);
  }, [serverCount, fileCount]);

  const handleInitialize = () => {
    // Stop any running simulation first
    setIsRunning(false);
    // Reset all states
    setServers(initializeServers(serverCount, fileCount));
    setStep(0);
  };

  const handleStep = () => {
    if (isComplete) {
      setIsRunning(false);
      return;
    }
    const newServers = performStep(servers);
    setServers(newServers);
    setStep(prev => prev + 1);
  };

  // Stop running when complete
  useEffect(() => {
    if (isComplete && isRunning) {
      setIsRunning(false);
    }
  }, [isComplete, isRunning]);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-[1600px] mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-100">
          Murder Bittorrent Deploy Visualizer
        </h1>

        <Controls
          onInitialize={handleInitialize}
          onStep={handleStep}
          step={step}
          isInitialized={servers.length > 0}
          isComplete={isComplete}
          serverCount={serverCount}
          setServerCount={setServerCount}
          fileCount={fileCount}
          setFileCount={setFileCount}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
        />

        <ServerGrid
          servers={servers}
          totalFiles={fileCount}
        />
      </div>
    </div>
  );
}

export default App;