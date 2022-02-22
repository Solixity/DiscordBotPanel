const express = require("./webserver/server");
const { app, BrowserWindow } = require("electron");
const path = require("path");

( async function() {

    await app.whenReady();
    const Window = CreateWindow();

    app.on("activate", function() {

        // gotta add that macos compatibility.
        if (BrowserWindow.getAllWindows().length === 0) CreateWindow();

    });

    express.listen(42801);
    Window.loadURL("http://localhost:42801/");

} )();

app.once("window-all-closed", function() {
    if (process.platform !== "darwin") return app.quit();
});

function CreateWindow() {

    const MainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    return MainWindow;
}

