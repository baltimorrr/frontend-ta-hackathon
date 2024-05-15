import {
  addMonths,
  addWeeks,
  addYears,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  formatDistanceToNow,
  getTime,
  intervalToDuration,
  isAfter,
  isBefore,
  isValid,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns'
import { formatInTimeZone, utcToZonedTime } from 'date-fns-tz'

import {
  DATETIME_FORMAT_AMPM,
  DATE_FORMAT,
  DEFAULT_LOCALE,
  HUMAN_DAY_FORMAT,
  HUMAN_MONTH_FORMAT,
  TIMEZONE,
  YEAR_FORMAT,
  dateFnsLocaleConfig,
} from 'config'

export function fDate(date, dateFormat = DATE_FORMAT) {
  try {
    return format(new Date(date), dateFormat)
  } catch (error) {
    return null
  }
}

export function fUtcToDateTime(date, timeZone = TIMEZONE) {
  return utcToZonedTime(new Date(date), timeZone)
}

export function fDateTimeToUtc(date, dateFormat = DATE_FORMAT) {
  return formatInTimeZone(new Date(date), 'UTC', dateFormat)
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy p')
}

export function fTimestamp(date) {
  return getTime(new Date(date))
}

export function fDateTimeSuffix(date, dateFormat = DATETIME_FORMAT_AMPM) {
  return format(new Date(date), dateFormat)
}

export function fToNow(date, locale = DEFAULT_LOCALE) {
  return formatDistanceToNow(new Date(date), {
    locale: dateFnsLocaleConfig[locale],
    addSuffix: true,
  })
}

export function fDateCalendar(date) {
  // use with date input format dd/MM/yyyy
  try {
    const convertDate = date?.split('/') || []
    if (convertDate.length < 3) return new Date()
    return new Date(`${convertDate[1]}/${convertDate[0]}/${convertDate[2]}`)
  } catch (error) {
    return new Date()
  }
}

export function fDateDuration(startDate, endDate, isCurrentJob = false) {
  try {
    if (!startDate || (!endDate && !isCurrentJob))
      return {
        value: 0,
        label: 'common.month',
      }

    const dateDuration = intervalToDuration({
      start: new Date(startDate),
      end: isCurrentJob ? new Date() : new Date(endDate),
    })

    const { years = 0, months = 0 } = dateDuration || {}

    if (!years)
      return {
        value: months || 1,
        label: `common.month${months > 1 ? 's' : ''}`,
      }

    const suffix = months > 0 ? '+' : ''

    return {
      value: `${years}${suffix}`,
      label: `common.year${years > 1 ? 's' : ''}`,
    }
  } catch (error) {
    return {
      value: 1,
      label: 'common.month',
    }
  }
}

export function fDateOfBirth(date, dateFormat = YEAR_FORMAT) {
  if (!date || !isValid(new Date(date))) return ''

  return fDate(new Date(date), dateFormat)
}

export function fDateStartOfWeek(date, options) {
  return startOfWeek(date, options)
}

export function fDateEndOfWeek(date, options) {
  return endOfWeek(date, options)
}

export function fDateSubYears(date, years) {
  return subYears(date, years)
}

export function fDateAddYears(date, years) {
  return addYears(date, years)
}

export function fDateSubMonths(date, months) {
  return subMonths(date, months)
}

export function fDateAddMonths(date, months) {
  return addMonths(date, months)
}

export function fDateSubWeeks(date, weeks) {
  return subWeeks(date, weeks)
}

export function fDateAddWeeks(date, weeks) {
  return addWeeks(date, weeks)
}

export function fDateSubDays(date, days) {
  return subDays(date, days)
}

export function fDateStartOfMonth(date) {
  return startOfMonth(date)
}

export function fDateEndOfMonth(date) {
  return endOfMonth(date)
}

export function fDateStartOfYear(date) {
  return startOfYear(date)
}

export function fDateEndOfYear(date) {
  return endOfYear(date)
}

export function fIsBefore(date, dateToCompare) {
  return isBefore(date, dateToCompare)
}

export function fIsAfter(date, dateToCompare) {
  return isAfter(date, dateToCompare)
}

export function fDateEachMonthOfInterval({
  startDate,
  endDate,
  monthFormat = HUMAN_MONTH_FORMAT,
}) {
  const months = eachMonthOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  })

  return months.map((month) => format(month, monthFormat))
}

export function fDateEachDayOfInterval({
  startDate,
  endDate,
  dayFormat = HUMAN_DAY_FORMAT,
  options = {},
}) {
  const days = eachDayOfInterval(
    { start: new Date(startDate), end: new Date(endDate) },
    options
  )

  return days.map((day) => format(day, dayFormat))
}

export function fDateEachWeekOfInterval({ startDate, endDate, options = {} }) {
  return eachWeekOfInterval(
    { start: new Date(startDate), end: new Date(endDate) },
    options
  )
}
