import React, { useState } from 'react';
import ServerGrid from './components/ServerGrid';
import Controls from './components/Controls';
import { initializeServers, performStep } from './utils/algorithmLogic';

const TOTAL_SERVERS = 50;
const TOTAL_FILES = 15;
const FILE_SIZE = 1; // in GB

function App() {
  const [servers, setServers] = useState([]);
  const [step, setStep] = useState(0);

  const handleInitialize = () => {
    setServers(initializeServers(TOTAL_SERVERS, TOTAL_FILES));
    setStep(0);
  };

  const handleStep = () => {
    const newServers = performStep(servers);
    setServers(newServers);
    setStep(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Murder Bittorrent Deploy Visualizer
        </h1>

        <Controls
          onInitialize={handleInitialize}
          onStep={handleStep}
          step={step}
          isInitialized={servers.length > 0}
        />

        <ServerGrid
          servers={servers}
          totalFiles={TOTAL_FILES}
        />
      </div>
    </div>
  );
}

export default App;