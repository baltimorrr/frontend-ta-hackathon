import { Fragment, useCallback, useState } from 'react'

import { Collapse, Stack } from '@mui/material'
import PropTypes from 'prop-types'

import { NavItemRoot, NavItemSub } from './NavItem'

NavList.propTypes = {
  list: PropTypes.array,
}

// function getActive(path, pathname) {
//   return path ? !!matchPath({ path, end: false }, pathname) : false
// }

function NavList({ list = [], isCollapse = false }) {
  // const { pathname } = useLocation()
  // const active = getActive(list.path, pathname)

  return (
    <Stack spacing={0.5}>
      {list.map((item, index) => (
        <Fragment key={item?.title + index}>
          <NavContent menuRootItem={item} isCollapse={isCollapse} />
        </Fragment>
      ))}
    </Stack>
  )
}

function NavContent({ menuRootItem, isCollapse }) {
  const [open, setOpen] = useState(false)
  const hasChildren = menuRootItem.children

  if (hasChildren) {
    return (
      <>
        <NavItemRoot
          item={menuRootItem}
          open={open}
          onToggle={() => setOpen(!open)}
          isCollapse={isCollapse}
        />

        {open && (
          <Collapse in={open} unmountOnExit timeout='auto'>
            <NavListSub list={menuRootItem.children} />
          </Collapse>
        )}
      </>
    )
  }

  return <NavItemRoot item={menuRootItem} isCollapse={isCollapse} />
}

function NavListSub({ list = [], subItem = false }) {
  const [open, setOpen] = useState(false)

  const renderContent = useCallback(
    (menuSubItem) => {
      const hasChildren = menuSubItem.children

      if (hasChildren) {
        return (
          <>
            <NavItemSub
              item={menuSubItem}
              open={open}
              onToggle={() => setOpen(!open)}
            />

            {open && (
              <Collapse in={open} unmountOnExit timeout='auto'>
                <NavListSub list={menuSubItem.children} subItem />
              </Collapse>
            )}
          </>
        )
      }

      return <NavItemSub item={menuSubItem} />
    },
    [open]
  )

  return (
    <Stack
      sx={{
        ...(subItem && {
          marginLeft: 2,
        }),
      }}
      spacing={0.5}
    >
      {list.map((item, index) => (
        <Fragment key={item?.title + index}>{renderContent(item)}</Fragment>
      ))}
    </Stack>
  )
}

export default NavList
