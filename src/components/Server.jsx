import React from 'react';

function Server({ serverId, files, downloading, uploading, totalFiles }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <div className="font-semibold mb-2">Server {serverId}</div>

      <div className="grid grid-cols-5 gap-1">
        {Array.from({ length: totalFiles }).map((_, index) => {
          const fileStatus = files[index];
          let bgColor = 'bg-gray-200'; // empty
          if (fileStatus === 'full') bgColor = 'bg-green-500';
          if (fileStatus === 'downloading') bgColor = 'bg-yellow-500';

          return (
            <div
              key={index}
              className={`${bgColor} w-full aspect-square rounded`}
              title={`File ${index}: ${fileStatus}`}
            />
          );
        })}
      </div>

      {downloading && (
        <div className="text-xs mt-2 text-blue-600">
          Downloading #{downloading.what} from Server {downloading.who}
        </div>
      )}

      {uploading && (
        <div className="text-xs mt-1 text-green-600">
          Uploading #{uploading.what} to Server {uploading.who}
        </div>
      )}
    </div>
  );
}

export default Server;