import * as React from "react"
import indexStyles from "../pages/indexPage.module.scss"
import specialStyles from "./specialsTimeTable.module.scss"
import classNames from "classnames"
import { useEffect, useState } from "react"

function SpecialsTimeTable(props: TimeTableProps) {
  // const daysArrayToRange = (daysArray: string[], isDaily: boolean): string => {
  //   if (isDaily || daysArray.length > 6) {
  //     return `Daily`
  //   } else if (daysArray.length === 1) {
  //     return daysArray[0].substring(0, 1)
  //   } else {
  //     return `${daysArray[0].substring(0, 1)}-${daysArray[
  //       daysArray.length - 1
  //     ].substring(0, 1)}`
  //   }
  // }

  const daysTemplate = ["S", "M", "T", "W", "TH", "F", "S"]

  // On initialization, create a formatted list of days
  // Ex: ["Thursday"] becomes ["TH"]
  const [happyHoursFormatted, _] = useState(() => {
    const newState = props.happyHours.slice(0)
    newState.forEach(happyHour => {
      happyHour.timeSlot.forEach(
        time =>
          time.frequency &&
          (time.frequencyFormat = time.frequency.map(day =>
            day === "Thursday"
              ? day.substring(0, 2).toUpperCase()
              : day.substring(0, 1)
          ))
      )
      happyHour.specialsFormat = happyHour.special.split(";")
    })
    return newState
  })

  return (
    <>
      {happyHoursFormatted.map((happyHour: HappyHour) => (
        <div className={specialStyles.special} key={happyHour.special}>
          <div>
            {happyHour.specials.map(special => (
              <div>{special}</div>
            ))}
          </div>
          <div className={specialStyles.timeSlotContainer}>
            {happyHour.timeSlot.map((timeSlot: TimeSlot) => (
              <div
                className={specialStyles.timeSlot}
                key={timeSlot.startEndTime}
              >
                <div className={specialStyles.days}>
                  {timeSlot.daily ? (
                    <div className={specialStyles.daily}>Daily</div>
                  ) : (
                    daysTemplate.map(day => (
                      <div
                        key={day}
                        className={classNames(specialStyles.day, {
                          [specialStyles.bold]: timeSlot.frequencyFormat.includes(
                            day
                          ),
                        })}
                      >
                        {day}
                      </div>
                    ))
                  )}
                </div>
                {timeSlot.allDay ? (
                  <div>All Day</div>
                ) : (
                  timeSlot.startEndTime && <div>{timeSlot.startEndTime}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

interface TimeTableProps {
  happyHours: HappyHour[]
}

export default SpecialsTimeTable
