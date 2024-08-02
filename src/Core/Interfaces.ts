import { TimeFrame } from './TimeFrame';

export interface Course{
    id: string;
    code: string;
    name: string;
    section: string;
    credits: string;
    teacher: string[];
    sessions: CourseSession[];
}

export interface CourseSession {
    start: string;
    period_start: string;
    end: string;
    period_end: string;
    day: string;
    building: string;
    room: string;
    time_frame: TimeFrame[];
}
