
/**
 * Main process
 */
var app = require('app'),
    ipc = require('ipc'),
    BrowserWindow = require('browser-window')

var windows = {
    main: null
  , w1: null
}


function createWindow(name, options) {
  windows[name] = new BrowserWindow({
      width: 1024
    , height: 768
    , show: true
  })

  windows[name].loadUrl('file://' + __dirname + '/windows/main/main.html')

  windows[name].on('closed',function() {
    windows[name] = null
  })

  return windows[name]
}


app.on('ready', function() {
    
  createWindow('main').openDevTools()

  // ipc.on('toggle-w1-view', function() {
  //     if(!windows['w1']) createWindow('w1')
  //     return (!windows['w1'].isClosed() && windows['w1'].isVisible()) ? windows['w1'].hide() : windows['w1'].show()
  // })
})

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  app.quit()
  // }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if(windows.main === null) {
    createWindow('main')
  }
})
