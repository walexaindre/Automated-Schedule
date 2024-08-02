import { TimeFrame } from "./TimeFrame";
import { type Course, type CourseSession } from "./Interfaces";



export class Coloring {
    days: string[]
    course_list: Course[];
    start_time: string;
    end_time: string;
    daytimeframe: TimeFrame[];
    step: number = 0;

    public get_day_time_frame(day: string) {
        return { tm: this.daytimeframe.filter((time_frame: TimeFrame) => time_frame.getDay() === day), index: this.daytimeframe.findIndex((time_frame: TimeFrame) => time_frame.getDay() === day) };
    }

    public day_events(day: string) {

        let events = this.course_list.filter((course: Course) => {
            let sessions = course.sessions.filter((session: CourseSession) => session.day === day);
            return sessions.length > 0;
        });

        return events;
    }

    public day_colorize(day: string) {
        let events = this.day_events(day);

        let reduction = events.map((event: Course): Course => {
            let out = { ...event };
            out.sessions = out.sessions.map((session: CourseSession) => {
                let new_time_frame = session.time_frame.filter((time_frame: TimeFrame) => time_frame.getDay() === day).sort((a: TimeFrame, b: TimeFrame) => TimeFrame.sort(a, b));
                return { ...session, time_frame: new_time_frame };
            });
            return out;
        });

        reduction = reduction.filter((event: Course) => event.sessions.length > 0)

        let sorted = reduction.sort((a: Course, b: Course) => {
            let a_start = a.sessions[0].time_frame[0].getStart();
            let b_start = b.sessions[0].time_frame[0].getStart();
            return a_start - b_start;
        });

        let row_start: number[] = [];
        let row_end: number[] = [];
        let column_start: number[] = [];
        let column_end: number[] = [];
        let button_size: number[] = [];

        sorted.map((event: Course) => {
            event.sessions.map((session: CourseSession) => {
                session.time_frame.map((time_frame: TimeFrame) => {
                    let start = time_frame.getStart();
                    let end = time_frame.getEnd();
                    let diff = end - start;
                    let size = diff / this.step;

                    if (size < 0.5) {
                        button_size.push(4);
                    } else {
                        button_size.push(Math.ceil(4 * size));
                    }

                    let { tm, index } = this.get_day_time_frame(day);

                    let rstart = start - tm[0].getStart();
                    let rend = end - tm[0].getStart();

                    rstart = Math.floor(rstart / this.step);
                    rend = Math.floor(rend / this.step);

                    column_start.push(index + 2);
                    column_end.push(index + 2);

                    row_start.push(rstart);
                    row_end.push(rend);
                });
            });
        });
        return { row_start, row_end, column_start, column_end, button_size };
    }

    public colorize() {
        return this.days.map((day: string) => {
            return this.day_colorize(day);
        });
    }

    constructor(courses: Course[], step: number = 30, start_time: string = "6:30 am", end_time: string = "9:30 pm", days: string[] = ['L', 'M', 'W', 'J', 'V', 'S']) {
        {
            this.days = days;
            this.course_list = courses;
            this.start_time = start_time;
            this.end_time = end_time;
            this.daytimeframe = this.days.map((day: string) => new TimeFrame(this.start_time, this.end_time, day));
            this.step = step;
        }
    }
}