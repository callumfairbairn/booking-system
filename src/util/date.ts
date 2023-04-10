// convert date object to YYYY-MM-DD
export const formatDate = (date: Date) => date.toLocaleDateString("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" })
