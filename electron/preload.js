// electron/preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  sendLog: (msg) => ipcRenderer.send("log-message", msg),
  updateEquipmentStatus: (id, status) =>
    ipcRenderer.send("update-equipment-status", { id, status }),
});
