export const isWithinAYear = (dateStr: string) => {
    const dateTime: number = Date.parse(dateStr)
    const msYear = 365*24*3600*1000
    const now = new Date().getTime()
    return (now - dateTime < msYear)
}

export const strToDate = (dateStr: string): Date => {
    return new Date(Date.parse(dateStr))
}