export const slotLength = parseInt(process.env.SLOT_LENGTH as string)

export const workingHours = {
  from: parseInt(process.env.WORKING_HOURS_FROM as string),
  to: parseInt(process.env.WORKING_HOURS_TO as string),
}