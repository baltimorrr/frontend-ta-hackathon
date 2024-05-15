import { Divider, MenuItem } from '@mui/material'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import RHFSelect from './RHFSelect'

RHFBasicSelect.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  hasBlankOption: PropTypes.bool,
}

export default function RHFBasicSelect({
  name,
  options = [],
  hasBlankOption = false,
  ...other
}) {
  const destOptions = useMemo(
    () =>
      options.map((option) => {
        if (typeof option === 'object' && option !== null) {
          const {
            value = '',
            label: displayName = '',
            disabled = false,
          } = option || {}

          return {
            value,
            displayName,
            disabled,
          }
        }

        return {
          value: option,
          displayName: option,
          disabled: false,
        }
      }),
    [options]
  )

  const render = useMemo(
    () =>
      [
        hasBlankOption && (
          <MenuItem
            key='blank_default_option'
            value=''
            sx={{
              fontStyle: 'italic',
              color: 'text.secondary',
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
            }}
          />
        ),
        hasBlankOption && <Divider key='divider' />,
        destOptions.map(
          ({ value = '', displayName = '', disabled = false }) => (
            <MenuItem
              key={value}
              value={value}
              disabled={disabled}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 0.75,
                typography: 'body2',
              }}
            >
              {displayName}
            </MenuItem>
          )
        ),
      ].filter(Boolean),
    [hasBlankOption, destOptions]
  )

  return (
    <RHFSelect
      name={name}
      SelectProps={{
        MenuProps: {
          sx: { '& .MuiPaper-root': { maxHeight: 260 } },
        },
      }}
      {...other}
    >
      {render}
    </RHFSelect>
  )
}
