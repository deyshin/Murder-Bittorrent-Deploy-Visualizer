import React from 'react';

function Server({ serverId, files, downloading, uploading, totalFiles }) {
  const isActive = downloading || uploading;
  const borderColor = downloading ? 'border-blue-500' :
                     uploading ? 'border-emerald-500' :
                     'border-gray-700';
  const glowEffect = isActive ? 'shadow-lg shadow-current/20' : '';

  return (
    <div className={`
      border-2 rounded-lg p-2 bg-gray-800
      transition-all duration-200
      ${borderColor} ${glowEffect}
    `}>
      <div className="flex items-center gap-2 text-gray-200 mb-1.5">
        <span className="text-sm font-medium">S{serverId}</span>
        <div className="flex gap-1 text-xs">
          {downloading && (
            <span className="text-blue-400 font-medium">
              ↓{downloading.who}
            </span>
          )}
          {uploading && (
            <span className="text-emerald-400 font-medium">
              ↑{uploading.who}
            </span>
          )}
        </div>
      </div>

      <div className={`
        flex gap-0.5 h-3
        ${isActive ? 'opacity-60' : ''}
      `}>
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