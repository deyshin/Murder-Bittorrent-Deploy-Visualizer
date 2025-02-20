import React from 'react';

function Server({ serverId, files, downloading, uploading, totalFiles }) {
  return (
    <div className="border border-gray-700 rounded-lg p-2 bg-gray-800 shadow-lg">
      <div className="flex items-center gap-2 text-gray-200 mb-1.5">
        <span className="text-sm font-medium">S{serverId}</span>
        <div className="flex gap-1 text-xs">
          {downloading && (
            <span className="text-blue-400">
              ↓{downloading.who}
            </span>
          )}
          {uploading && (
            <span className="text-green-400">
              ↑{uploading.who}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-0.5 h-3">
        {files.map((status, index) => (
          <div
            key={index}
            className={`
              flex-1 transition-colors duration-200
              ${status === 'full' ? 'bg-emerald-500' :
                status === 'downloading' ? 'bg-amber-500' :
                'bg-gray-700'}
            `}
          />
        ))}
      </div>
    </div>
  );
}

export default Server;