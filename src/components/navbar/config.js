import SvgIconStyle from 'components/SvgIconStyle'

const getIcon = (name) => (
  <SvgIconStyle
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
)

const ICONS = {
  analytics: getIcon('ic_analytics'),
  blog: getIcon('ic_blog'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  calendar: getIcon('ic_calendar'),
  chat: getIcon('ic_chat'),
  cart: getIcon('ic_cart'),
  dashboard: getIcon('ic_dashboard'),
  ecommerce: getIcon('ic_ecommerce'),
  invoice: getIcon('ic_invoice'),
  kanban: getIcon('ic_kanban'),
  mail: getIcon('ic_mail'),
  menu: getIcon('ic_menu'),
  user: getIcon('ic_user'),
}

export const navConfig = [
  {
    subheader: 'general',
    items: [
      { title: 'app', path: '', icon: ICONS.dashboard },
      { title: 'ecommerce', path: '', icon: ICONS.ecommerce },
      { title: 'analytics', path: '', icon: ICONS.analytics },
      { title: 'banking', path: '', icon: ICONS.banking },
      { title: 'booking', path: '', icon: ICONS.booking },
    ],
  },
]
