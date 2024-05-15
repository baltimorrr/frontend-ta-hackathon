import SvgIconStyle from 'components/SvgIconStyle'
import { PATH_DASHBOARD } from 'routes/path'

const getIcon = (name) => (
  <SvgIconStyle
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
)

const ICONS = {
  chat: getIcon('ic_chat'),
  chart: getIcon('ic_chart'),
  list: getIcon('ic_list'),
}

const navConfig = [
  {
    subheader: '',
    items: [
      {
        title: 'chat',
        path: PATH_DASHBOARD.general.chat,
        icon: ICONS.chat,
      },
      {
        title: 'chart',
        path: PATH_DASHBOARD.general.chart,
        icon: ICONS.chart,
      },
      {
        title: 'list',
        path: PATH_DASHBOARD.general.list,
        icon: ICONS.list,
      },
    ],
  },
]

export default navConfig
