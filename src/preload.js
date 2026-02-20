'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('fastlook', {
  getFastmailUrl: () => ipcRenderer.invoke('get-fastmail-url'),
  onToggleAiPanel: (callback) => {
    ipcRenderer.on('toggle-ai-panel', callback);
    return () => ipcRenderer.removeListener('toggle-ai-panel', callback);
  },
});
