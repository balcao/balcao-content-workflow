export const isWithinAYear = (dateStr: string) => {
    const dateTime: number = Date.parse(dateStr)
    const msYear = 365*24*3600*1000
    const now = new Date().getTime()
    return (now - dateTime < msYear)
}

export const strToDate = (dateStr: string | undefined): Date => {
    return dateStr ? new Date(Date.parse(dateStr)) : new Date(3000, 1, 1)
}

export const oneYearAgo = (): Date => {
    const msYear = 365*24*3600*1000
    const now = new Date().getTime()
    return new Date(now - msYear)
}