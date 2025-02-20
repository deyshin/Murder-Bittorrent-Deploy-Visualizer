export function initializeServers(totalServers, totalFiles) {
  const servers = [];

  // Initialize first server with all files
  const firstServer = {
    files: Array(totalFiles).fill('full'),
    downloading: null,
    uploading: null
  };

  servers.push(firstServer);

  // Initialize rest of the servers with empty files
  for (let i = 1; i < totalServers; i++) {
    servers.push({
      files: Array(totalFiles).fill('empty'),
      downloading: null,
      uploading: null
    });
  }

  return servers;
}

export function getServerWithFile(servers, fileNumber) {
  const serverWithFile = servers.findIndex(server =>
    server.files[fileNumber] === 'full' && !server.uploading
  );
  return serverWithFile;
}

export function startDownloading(servers, upServer, downServer, fileNumber) {
  const newServers = [...servers];

  newServers[upServer] = {
    ...newServers[upServer],
    uploading: { what: fileNumber, who: downServer }
  };

  newServers[downServer] = {
    ...newServers[downServer],
    files: newServers[downServer].files.map((status, index) =>
      index === fileNumber ? 'downloading' : status
    ),
    downloading: { what: fileNumber, who: upServer }
  };

  return newServers;
}

export function performStep(servers) {
  let newServers = [...servers];

  // Complete previous downloads
  newServers = newServers.map(server => {
    if (server.downloading) {
      return {
        ...server,
        files: server.files.map((status, index) =>
          index === server.downloading.what ? 'full' : status
        ),
        downloading: null,
        uploading: null
      };
    }
    return { ...server, uploading: null };
  });

  // Start new downloads
  for (let i = 1; i < newServers.length; i++) {
    if (newServers[i].downloading) continue;

    // Find empty files
    const emptyFiles = newServers[i].files
      .map((status, index) => ({ status, index }))
      .filter(file => file.status === 'empty')
      .map(file => file.index);

    if (emptyFiles.length === 0) continue;

    // Pick random empty file
    const randomFile = emptyFiles[Math.floor(Math.random() * emptyFiles.length)];

    // Find server with this file
    const sourceServer = getServerWithFile(newServers, randomFile);
    if (sourceServer !== -1) {
      newServers = startDownloading(newServers, sourceServer, i, randomFile);
    }
  }

  return newServers;
}