import { parse } from 'node-html-parser';
import { TimeFrame } from './TimeFrame';
import { ValidBuildings } from './Defaults';
import { type Course, type CourseSession } from './Interfaces';

import Sample from "../../public/MATE3172.html?raw";
import Sample2 from "../../public/QUIM3131.html?raw";

class ParseTable {
    private html: string;
    private table: HTMLElement | any;

    constructor(html: string) {
        this.html = html;
        this.table = parse(this.html).querySelector('table')?.querySelector('tbody');
    }

    getTable() {
        return this.table;
    }

    getHeaders() {
        return this.table.querySelectorAll('tr').querySelectorAll('th').map((header: any) => header.text);
    }

    private extractSectionCourse(section: string): { name: string, code: string, section: string } {
        let sec = section.split('\n');
        let course_name = sec[0].trim();

        let tail = sec[1].trim().split('-');

        let course_code = tail[0].trim();
        let course_section = tail[1].trim();

        return { name: course_name, code: course_code, section: course_section };
    }

    private extractTeacher(teacher: string): string[] {
        if (teacher === undefined || teacher === "") {
            return ['TBA'];
        }
        return teacher.split('\n').map((t: string) => t.trim()).filter((t: string) => t !== '');
    }


    private weekday(strwk: string): boolean {

        for (let i = 0; i < strwk.length; i++) {
            if (strwk[i].toUpperCase() !== 'L' && strwk[i].toUpperCase() !== 'M' && strwk[i].toUpperCase() !== 'W' && strwk[i].toUpperCase() !== 'J' && strwk[i].toUpperCase() !== 'V' && strwk[i].toUpperCase() !== 'S') {
                return false;
            }
        }
        return true
    }

    private ishour(strhr: string): boolean {
        let ishour = strhr.includes(":") ? true : false;
        return ishour;
    }

    private isperiod(strhr: string): boolean {
        let isperiod = strhr.toUpperCase().includes("AM") || strhr.toUpperCase().includes("PM") ? true : false;
        return isperiod;
    }

    private isdash(strhr: string): boolean {
        let isdash = strhr.includes("-") ? true : false;
        return isdash;
    }

    private isempty(strhr: string): boolean {
        let isempty = strhr === "" ? true : false;
        return isempty;
    }

    private isweekday(strwk: string): boolean {
        return this.weekday(strwk);
    }

    private isbuilding(strbd: string): boolean {
        return ValidBuildings.includes(strbd.toUpperCase());
    }

    private isroom(strrm: string): boolean {
        return strrm.length === 3 && isFinite(Number(strrm));
    }

    private extractTime(time: string): CourseSession[] {

        //console.log("time: ", JSON.stringify(time))
        let time_f = time.replaceAll('\n', ' ').trim().split(' ').filter(x => x !== "").map(x => x.trim()) // The data can be incomplete, so we need to add missing data as TBA
        const dataSpan = 8;

        //console.log("time_f: ", time_f)

        let startindex = time_f.map((x, i, arr) => { if (x.includes(":") && i < arr.length - 3 && arr[i + 3].includes(":")) return i; else return -1; }).filter(x => x !== -1);
        let endindex = [...startindex.slice(1), time_f.length];


        let new_time_f: string[] = []
        for (let idx = 0; idx < startindex.length; ++idx) {
            let sidx = startindex[idx];
            let eidx = endindex[idx];
            let diff = eidx - sidx;
            if (this.ishour(time_f[sidx + 0]) && this.isperiod(time_f[sidx + 1]) && this.ishour(time_f[sidx + 3]) && this.isperiod(time_f[sidx + 4]) && this.isweekday(time_f[sidx + 5])) {
                new_time_f.push(...time_f.slice(sidx, sidx + 6))
                //console.log("pass sidx: ", sidx, "eidx: ", eidx, "diff: ", diff)
                if (diff === 8) {
                    if (this.isbuilding(time_f[sidx + 6]) && this.isroom(time_f[sidx + 7])) {
                        new_time_f.push(...time_f.slice(sidx + 6, eidx))
                    } else
                        new_time_f.push("TBA", "TBA")
                }
                else if (diff === 6) {
                    new_time_f.push("TBA", "TBA")
                }
                else if (diff === 7) {
                    if (!this.isbuilding(time_f[sidx + 6]) || this.isempty(time_f[sidx + 6])) {
                        new_time_f.push("TBA", "TBA");
                    }
                }

            }
        }
        //console.log("new_time_f: ", new_time_f)
        let output = [];
        time_f = new_time_f;
        for (let i = 0; i < time_f.length; i = i + dataSpan) {
            let time_start = time_f[i + 0];
            let time_start_ampm = time_f[i + 1];
            let time_end = time_f[i + 3];
            let time_end_ampm = time_f[i + 4];
            let weekday = time_f[i + 5];
            let building = time_f[i + 6];
            let building_room = time_f[i + 7];

            let time_collection = weekday.toUpperCase().split('').map((day: string) => new TimeFrame(time_start + " " + time_start_ampm, time_end + " " + time_end_ampm, day));

            let out = {
                start: time_start,
                period_start: time_start_ampm,
                end: time_end,
                period_end: time_end_ampm,
                day: weekday,
                building: building,
                room: building_room,
                time_frame: time_collection
            }

            output.push(out);
        }

        return output;
    }

    public getRows(): Course[] {
        let baserow: string[][] = this.table.querySelectorAll('tr').map((row: any) => row.querySelectorAll('td').map((cell: any) => cell.text));
        baserow = baserow.filter((row: string[]) => row[0] !== '').filter((row: string[]) => row.length > 0);
        //let out = baserow.map((row: string[]) => { return { id: row[0], course: this.extractSectionCourse(row[1]), time: this.extractTime(row[4]), credits: row[2], teacher: this.extractTeacher(row[5]) } });

        let out = baserow.map((row: string[]): Course => {
            let secdata = this.extractSectionCourse(row[1])
            return { id: row[0], code: secdata.code, name: secdata.name, section: secdata.section, credits: row[2], teacher: this.extractTeacher(row[5]), sessions: this.extractTime(row[4]) };

        });

        return out;
    }


}





let tb = new ParseTable(Sample)

export { tb, ParseTable};