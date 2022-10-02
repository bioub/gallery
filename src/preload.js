// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer, contextBridge } = require('electron/renderer');

contextBridge.exposeInMainWorld('gallery', {
  getImages() {
    return ipcRenderer.invoke('getImages');
  },
  importImages() {
    return ipcRenderer.invoke('importImages');
  },
  exportImages(selection) {
    return ipcRenderer.send('exportImages', selection);
  },
});
