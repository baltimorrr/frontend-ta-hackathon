function path(root, subLink) {
  return `${root}${subLink}`
}

const ROOT = ''
// const ROOT_AUTHS = '/auth'
const ROOT_DASHBOARD = '/dashboard'

export const PATH_DASHBOARD = {
  root: ROOT_DASHBOARD,
  general: {
    app: path(ROOT_DASHBOARD, ''),
    chat: path(ROOT, '/chat'),
    chart: path(ROOT, '/chart'),
    list: path(ROOT, '/list'),
  },
}
