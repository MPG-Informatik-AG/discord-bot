import { WebUntis, Lesson } from "webuntis"

export async function getTimetable() {
    const untis = new WebUntis("MPG Schorndorf", "bindermar-mpg", "27032005", "hepta.webuntis.com")
    return untis.login().then(async () => {
        console.log("untis logged in")
        let tt = await untis.getOwnClassTimetableForToday()
        let sortedByTime: {[key: number]: Lesson[]} = {}

        for (let a of tt) {
            if (!(a.startTime in sortedByTime)) {
                sortedByTime[a.startTime] = []
            }
            sortedByTime[a.startTime].push(a)
        }

        return sortedByTime;
    })
}
