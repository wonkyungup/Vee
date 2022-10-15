import { path, app } from './lib'

export default class Constants {
    static APP_IS_PRODUCTION = process.env.NODE_ENV !== 'development'

    static TYPE_SEPARATOR = 'separator'

    static MENU_PORT_FORWARDING = 'Port Forwarding'
    static MENU_QUIT = 'Quit'
    static STR_LINUX = 'linux'
    static STR_AIX = 'aix'
    static STR_SUNOS = 'sunos'
    static STR_NETBSD = 'netbsd'
    static STR_OEPNBSD = 'openbsd'
    static STR_FREEBSD = 'freebsd'
    static STR_CYGWIN = 'cygwin'
    static STR_ANDROID = 'android'
    static STR_DARWIN = 'darwin'
    static STR_WIN32 = 'win32'
    static STR_MAC = 'Mac'
    static STR_WINDOWS = 'Windows'
    static STR_LOCAL = 'local'
    static STR_REMOTE = 'remote'
    static STR_SOCKSV5 = 'socksv5'

    static ICON_APP = '16x16.png'
    static ICON_PLUS = 'mdi-plus'
    static ICON_ACCOUNT = 'mdi-account'
    static ICON_ARROW_COLLAPSE_RIGHT = 'mdi-arrow-collapse-right'
    static ICON_ARROW_LEFT = 'mdi-arrow-left'
    static ICON_SERVER = 'mdi-server'
    static ICON_SERVER_SECURITY = 'mdi-server-security'
    static ICON_CLOUD = 'mdi-cloud'
    static ICON_ARROW_RIGHT_CIRCLE = 'mdi-arrow-right-circle'

    static DRAWER_DIRECTION_PAGE = 0
    static DRAWER_SOURCE_PAGE = 1
    static DRAWER_SERVER_PAGE = 2
    static DRAWER_DESTINATION_PAGE = 3

    static DB_NAME = 'database.db'
    static DB_PATH = path.join(app.getPath('userData'), path.sep, Constants.DB_NAME.split('.')[0])

    static SETUP_NAME = 'setup.ini'
}
