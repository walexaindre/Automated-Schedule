import { ParseTable } from './ParseTable';
import { TimeFrame } from './TimeFrame';
import { generatePermutations } from './VecOps';

import Sample from "../../public/MATE3172.html?raw";
import Sample2 from "../../public/QUIM3131.html?raw";
import type { Course } from './Interfaces';


export class Schedule {
    private courses: Course[][];

    private distance(sorted_candidates: TimeFrame[]) {
        let _distance = 0;
        for (let i = 0; i < sorted_candidates.length - 2; i++) {
            _distance += TimeFrame.distance(sorted_candidates[i], sorted_candidates[i + 1]);
        }
        return _distance;
    }

    constructor() {
        let c1 = new ParseTable(Sample);
        let c2 = new ParseTable(Sample2);

        //console.log("c1: ", c1.getRows());
        //console.log("c2: ", c2.getRows());

        this.courses = [c1.getRows(), c2.getRows()];
    }


    public getSchedule(): { vperm: number[][], timeframes: any[][], courses: any[][] } {

        let timeframes = this.courses.map((c: Course[]) => c.map((course: Course) => course.sessions));

        console.log("timeframes: ", timeframes);

        let candidates = TimeFrame.intersectionFull(timeframes);
        let permutations = generatePermutations(timeframes);
        console.log("candidates: ", candidates);
        console.log("permutations: ", permutations);


        let valid_permutations = candidates.map((c: boolean, i: number) => c ? permutations[i] : []).filter((p: number[]) => p.length > 0);

        return { vperm: valid_permutations, timeframes: timeframes,courses: this.courses };
    }

    public getCourses(): any[] {
        return this.courses;
    }
}

