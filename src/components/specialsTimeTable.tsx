import * as React from "react"
import indexStyles from "../pages/indexPage.module.scss"
import specialStyles from "./specialsTimeTable.module.scss"

function SpecialsTimeTable(props: TimeTableProps) {
  const daysArrayToRange = (daysArray: string[], isDaily: boolean): string => {
    if (isDaily || daysArray.length > 6) {
      return `Daily`
    } else if (daysArray.length === 1) {
      return daysArray[0].substring(0, 1)
    } else {
      return `${daysArray[0].substring(0, 1)}-${daysArray[
        daysArray.length - 1
      ].substring(0, 1)}`
    }
  }

  return (
    <div>
      {props.happyHours.map((happyHour: HappyHour) => (
        <div className={indexStyles.special} key={happyHour.special}>
          <div>
            {happyHour.timeSlot.map((timeSlot: TimeSlot) => (
              <div>
                <div>
                  {daysArrayToRange(timeSlot.frequency, timeSlot.daily)}
                </div>
                {timeSlot.allDay ? (
                  <div>All Day</div>
                ) : (
                  timeSlot.startEndTime && <div>{timeSlot.startEndTime}</div>
                )}
              </div>
            ))}
          </div>
          <div>{happyHour.special}</div>
        </div>
      ))}
    </div>
  )
}

interface TimeTableProps {
  happyHours: HappyHour[]
}

export default SpecialsTimeTable
