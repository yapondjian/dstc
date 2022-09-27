import React, { useRef, VFC } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { ExtensionPoint } from 'vtex.render-runtime'
import Countdown from 'react-countdown'
import './CustomLimitedShelf.css'

interface CustomLimitedShelfProps {
  title: string
  finalDate: string
}

const CSS_HANDLES = [
  'shelfLimitedWrapper',
  'shelfLimitedWrapperTimer',
  'shelfLimitedTitle',
  'shelfLimitedTimer',
  'timerItem',
  'timerLabel',
  'timer',
  'shelfLimitedTimerDivider',
  'shelfLimitedTimeoutText',
]

interface Count {
  days: number
  hours: number
  minutes: number
  seconds: number
  completed: boolean
}

const CustomLimitedShelf: StorefrontComponent<CustomLimitedShelfProps> = ({
  title,
  finalDate,
}: {
  title: string
  finalDate: string
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const titleRef = useRef<HTMLDivElement>(null)

  if (!finalDate) {
    return <div />
  }

  const TimerItem: VFC<{
    timer: number
    label: string
    fallBackLabel: string
  }> = ({ fallBackLabel, label, timer }) => (
    <div className={handles.timerItem}>
      <span className={handles.timer}>{timer}</span>
      <span className={handles.timerLabel}>
        {timer >= 1 ? label : fallBackLabel}
      </span>
    </div>
  )

  const renderer = ({ days, hours, minutes, seconds, completed }: Count) => {
    if (completed) {
      if (titleRef.current) {
        titleRef.current.style.display = 'none'
      }

      return (
        <span className={handles.shelfLimitedTimeoutText}>
          Promoção finalizada
        </span>
      )
    }

    return (
      <div className={handles.shelfLimitedTimer}>
        <TimerItem timer={days} label="dias" fallBackLabel="dia" />
        <span className={handles.shelfLimitedTimerDivider} />
        <TimerItem timer={hours} label="horas" fallBackLabel="hora" />
        <span className={handles.shelfLimitedTimerDivider} />
        <TimerItem timer={minutes} label="min" fallBackLabel="min" />
        <span className={handles.shelfLimitedTimerDivider} />
        <TimerItem timer={seconds} label="seg" fallBackLabel="seg" />
      </div>
    )
  }

  return (
    <div className={handles.shelfLimitedWrapper}>
      <div className={handles.shelfLimitedWrapperTimer}>
        <h3 ref={titleRef} className={handles.shelfLimitedTitle}>
          {title}
        </h3>
        <Countdown date={new Date(finalDate)} renderer={renderer} />
      </div>
      <ExtensionPoint id="flex-layout.row" />
    </div>
  )
}

CustomLimitedShelf.schema = {
  title: 'Configurar prateleira de tempo limitada',
  description: 'Configure uma prateleira de tempo limitado',
  type: 'object',
  properties: {
    title: {
      title: 'Titulo da prateleira',
      type: 'string',
    },
    finalDate: {
      title: 'Date de termino da promoção',
      format: 'date-time',
      type: 'string',
    },
  },
}

export default CustomLimitedShelf
