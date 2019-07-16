declare module "*.module.css" {
  const classes: { [key: string]: string }
  export default classes
}

declare module "*.module.scss" {
  const classes: { [key: string]: string }
  export default classes
}

interface HappyHour {
  timeSlot: TimeSlot[]
  special: string
  specials: string[]
  specialsFormat?: string[]
}

interface TimeSlot {
  startEndTime?: string
  frequency?: string[]
  daily: boolean
  allDay: boolean
  frequencyFormat?: string[]
}
