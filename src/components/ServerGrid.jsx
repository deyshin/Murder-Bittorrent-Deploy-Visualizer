import React from 'react';
import Server from './Server';

function ServerGrid({ servers, totalFiles }) {
  if (!servers.length) {
    return (
      <div className="text-center text-gray-400 mt-8">
        Click Initialize to start the visualization
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-2 mt-8">
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