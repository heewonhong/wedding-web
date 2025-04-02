import { parseISO, format } from 'date-fns'
import classNames from 'classnames/bind'
import Section from '../shared/Section'
import { ko } from 'date-fns/locale'
import { DayPicker } from 'react-day-picker'

import 'react-day-picker/dist/style.css'
import styles from './Calendar.module.scss'

const cx = classNames.bind(styles)
const css = `
.rdp-month_caption {
display:none;
}
.rdp-nav {
display:none;
}
.rdp-day {
  pointer-events: none;
}
.rdp-day_button{
cursor: default
}
.rdp-weekdays {
font-weight: 500;
font-size:20px;
font-weight: bold;
}
.rdp-selected {
background-color: var(--red);
font-weight: bold;
color: #fff;
border-radius: 50%;
}
.rdp-selected .rdp-day_button{
    border: none;
}
.rdp-selected:hover {
background-color:var(--red);
}
`

function Calendar({ date }: { date: string }) {
  const weddingDate = parseISO(date)

  return (
    <Section
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('txt-date')}>
            {format(weddingDate, 'yyyy.MM.dd')}
          </span>
          <span className={cx('txt-time')}>
            {format(weddingDate, 'aaa h시 eeee', { locale: ko })}
          </span>
        </div>
      }
    >
      <div className={cx('wrap-calender')}>
        <style>{css}</style>
        <DayPicker
          mode="single"
          locale={ko}
          month={weddingDate}
          selected={weddingDate}
          formatters={{ formatCaption: () => '' }}
        />
      </div>
    </Section>
  )
}

export default Calendar
