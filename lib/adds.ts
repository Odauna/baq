function addZero(i: any) {
    if (i < 10) { i = "0" + i }
    return i
}
export async function currentTime() {
    const today = new Date()
    const hour = addZero(today.getHours())
    const minute = addZero(today.getMinutes())

    return `${hour}:${minute}`
}
export async function currentDateTime() {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()
    const hour = addZero(today.getHours())
    const minute = addZero(today.getMinutes())

    return `${year}-${month}-${date}, ${hour}:${minute}`
}

export async function isValidTime(timeString: string) {
    if (!timeString) return false
    return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(timeString)
}

export function getInitials(name: string) {
    const full = name.split(" ")
    let initial = ""
    for (const fn of full) {
        if (fn.length > 0) {
            initial += fn[0]
        }
    }
    return initial
}