import { createContext } from 'react'

import PropTypes from 'prop-types'

import { defaultSettings } from 'config'

import useLocalStorage from 'hooks/useLocalStorage'

import getColorPresets, {
  colorPresets,
  defaultPreset,
} from 'utils/getColorPresets'

const initialState = {
  ...defaultSettings,

  onToggleMode: () => {},
  onChangeMode: () => {},

  onChangeColor: () => {},
  setColor: defaultPreset,
  colorOption: [],

  onResetSetting: () => {},
}

const SettingContext = createContext(initialState)

SettingProvider.propTypes = {
  children: PropTypes.node,
}

function SettingProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('settings', {
    themeMode: initialState.themeMode,
    themeColorPresets: initialState.themeColorPresets,
  })

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
    })
  }

  const onChangeMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
    })
  }

  const onChangeColor = (event) => {
    setSettings({
      ...settings,
      themeColorPresets: event?.target?.value,
    })
  }

  const onResetSetting = () => {
    setSettings({
      themeMode: initialState.themeMode,
      themeColorPresets: initialState.themeColorPresets,
    })
  }

  return (
    <SettingContext.Provider
      value={{
        ...settings,
        onToggleMode,
        onChangeMode,
        onChangeColor,
        setColor: getColorPresets(settings.themeColorPresets),
        colorOption: colorPresets.map((color) => ({
          name: color.name,
          value: color.main,
        })),
        onResetSetting,
      }}
    >
      {children}
    </SettingContext.Provider>
  )
}

export { SettingProvider, SettingContext }
