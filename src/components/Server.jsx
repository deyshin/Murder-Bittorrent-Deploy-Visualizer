import React from 'react';

function Server({ serverId, files, downloading, uploading, totalFiles }) {
  // Calculate statistics for the progress bar
  const stats = files.reduce((acc, status) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const fullCount = stats.full || 0;
  const downloadingCount = stats.downloading || 0;
  const progress = ((fullCount + downloadingCount) / totalFiles) * 100;

  return (
    <div className="border border-gray-700 rounded-lg p-3 bg-gray-800 shadow-lg">
      <div className="flex items-center justify-between text-gray-200 mb-2">
        <span className="font-medium">Server {serverId}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs">{Math.round(progress)}%</span>
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
      </div>

      <div className="flex h-4 w-full bg-gray-700 rounded overflow-hidden">
        <div
          className="bg-emerald-500 h-full transition-all duration-200"
          style={{ width: `${(fullCount / totalFiles) * 100}%` }}
        />
        <div
          className="bg-amber-500 h-full transition-all duration-200"
          style={{ width: `${(downloadingCount / totalFiles) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default Server;