'use strict'

import { app, Tray, Menu, path, ipcMain, Notification } from './assets/lib'
import Defs from './assets/constants'
import Utils from './assets/utils'

let tray = null
let masterPassword = null
let portForwarding = null
let appNotification = null

if (Defs.APP_IS_PRODUCTION) {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

if (!app.requestSingleInstanceLock()) {
  app.exit()
}

global.Constants = Defs
global.MSG_MASTER_KEY = 'MSG_MASTER_KEY'

const executionNotification = () => {
  const config = {
    title: Defs.NOTIFICATION_TITLE,
    body: Defs.NOTIFICATION_BODY
  }

  if (appNotification === null) {
    appNotification = new Notification(config)
  }

  appNotification.show()
}

const createMasterPassword = () => {
  if (global.Constants.DB_CERTIFIED) {
    global.Constants.DB_CERTIFIED = false
  }

  if (masterPassword === null) {
    masterPassword = Utils.getMasterPasswordBrowserWindow()
  }

  if (Defs.isMac) {
    app.dock.setIcon(path.join(__static, path.sep, Defs.STATIC_IMG_APP_DOCK))
    app.dock.bounce()
  } else {
    masterPassword.setIcon(path.join(__static, path.sep, Defs.STATIC_IMG_APP_DOCK))
  }

  masterPassword.loadURL(Utils.setWinUrl('master-password'))

  masterPassword.once('ready-to-show', () => {
    masterPassword.show()
  })
  masterPassword.on('show', () => {
    masterPassword.focus()
  })
  masterPassword.on('closed', (event) => {
    event.preventDefault()

    if (global.Constants.DB_CERTIFIED) {
      if (Defs.isMac) {
        app.dock.hide()
      }

      executionNotification()
      createTray()
      createPortForwarding()
    }
  })
}

const createPortForwarding = () => {
  if (portForwarding === null) {
    portForwarding = Utils.getPortForwardingBrowserWindow()
  }

  portForwarding.setMenu(null)
  portForwarding.loadURL(Utils.setWinUrl('port-forwarding'))

  portForwarding.on('page-title-updated', event => {
    event.preventDefault()
  })
  portForwarding.on('close', event => {
    event.sender.hide()
    event.preventDefault()
  })
}

const createTray = () => {
  if (tray === null) {
    tray = new Tray(path.join(__static, path.sep, Defs.STATIC_IMG_TRAY))
  }

  const config = [
    {
      label: Defs.MENU_PORT_FORWARDING,
      click: () => {
        portForwarding.show()
      }
    },
    { type: Defs.TYPE_SEPARATOR },
    {
      label: Defs.MENU_IP_LOOKUP,
      click: () => {
        console.log('On Tray IP lookup Click')
      }
    },
    { type: Defs.TYPE_SEPARATOR },
    { label: Defs.MENU_QUIT,
      click: () => {
        if (portForwarding) {
          portForwarding = null
        }

        app.exit()
      }
    }
  ]

  if (tray && config) {
    tray.setContextMenu(Menu.buildFromTemplate(config))
    tray.on('click', () => {
      appNotification.close()
    })
  }
}

app.on('browser-window-created', (_, window) => {
  require("@electron/remote/main").enable(window.webContents)
})

app.on('ready', () => {
  createMasterPassword()
})

ipcMain.on(global.MSG_MASTER_KEY, (event, args) => {
  if (args.DB_CERTIFIED) {
    global.Constants.DB_CERTIFIED = args.DB_CERTIFIED
    global.Constants.DB_MASTER_KEY = args.DB_MASTER_KEY
    masterPassword.close()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
