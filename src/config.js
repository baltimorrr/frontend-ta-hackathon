import { enUS, viVN } from '@mui/material/locale'

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
}

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
}

export const DOMAIN_SERVER_API = process.env.REACT_APP_HOST_API || ''

// DATETIME FORMAT
export const DATE_FORMAT = 'dd/MM/yyyy'
export const DATE_YEAR_MONTH_DAY_FORMAT = 'yyyy-MM-dd'
export const DATETIME_FORMAT = 'dd/MM/yyyy HH:mm'
export const AMPM_DATETIME_FORMAT = 'hh:mma dd/MM/yyyy'
export const DATETIME_FORMAT_AMPM = 'dd/MM/yyyy hh:mm a'
export const TIME_FORMAT = 'HH:mm'
export const TIME_FORMAT_AMPM = 'hh:mm a'
export const DATE_FORMAT_DAY_MONTH = 'do MMM'
export const CALENDAR_DATE_FORMAT = 'MM/dd/yyyy'
export const CALENDAR_DATETIME_FORMAT = 'MM/dd/yyyy HH:mm:ss'
export const TIMEZONE = 'Asia/Ho_Chi_Minh'
export const MIN_DATE_VALUE = new Date('1970/01/01')
export const YEAR_FORMAT = 'yyyy'
export const MONTH_YEAR_FORMAT = 'MM/yyyy'
export const HUMAN_MONTH_YEAR_FORMAT = 'MMM yyyy'
export const HUMAN_MONTH_FORMAT = 'MMM'
export const HUMAN_DAY_FORMAT = 'E dd'

// LOCALE
export const DEFAULT_LOCALE = 'en'

export const allLanguages = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '',
  },
  {
    label: 'Vietnamese',
    value: 'vi',
    systemValue: viVN,
    icon: '',
  },
]

export const defaultLanguage = allLanguages[0]

export const DEFAULT_PAGE = 1
export const DEFAULT_PAGE_SIZE = 10

export const defaultSettings = {
  themeMode: 'light',
  themeColorPresets: 'yellow',
}

export const MAX_SIZE_FILE_IMAGE = 5 * 1024 * 1024 // 5 MB
export const ACCEPTED_IMAGE_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
]

export const DRAWER_WIDTH = { xs: 1, sm: '80%', md: '60%', lg: '50%' }

export const ROLE = {
  ADMIN: 'admin',
}

export const defaultPagination = 10
