import React from 'react';
import Server from './Server';

function ServerGrid({ servers, totalFiles }) {
  if (!servers.length) {
    return (
      <div className="text-center text-gray-500 mt-8">
        Click Initialize to start the visualization
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-4 mt-8">
      {servers.map((server, index) => (
        <Server
          key={index}
          serverId={index}
          files={server.files}
          downloading={server.downloading}
          uploading={server.uploading}
          totalFiles={totalFiles}
        />
      ))}
    </div>
  );
}

export default ServerGrid;