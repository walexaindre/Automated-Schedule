import { generatePermutations } from './VecOps';

export class TimeFrame {
    private start: number;
    private end: number;
    private day: string;

    private parseTime(timestr: string): number {
        let time = timestr.split(' ').map((t: string) => t.trim());
        let hour_minute = time[0].split(':').map((t: string) => t.trim()).map((t: string) => Number(t));

        let hf = time[1].toLowerCase() === 'pm' ? 12 * 60 : 0;
        return hour_minute[0] * 60 + hour_minute[1] + hf;
    }

    constructor(start: string, end: string, day: string) {
        this.start = this.parseTime(start);
        this.end = this.parseTime(end);
        this.day = day.trim();
    }

    public static intersection(t1: TimeFrame, t2: TimeFrame): boolean {
        return t1.day === t2.day && (t1.start < t2.end && t1.end > t2.start);
    }

    private static generatePairs(perm: number[]): { idx: number; v: number; }[][] {
        let pairs = [];
        for (let i = 0; i < perm.length; i++) {
            for (let j = i + 1; j < perm.length; j++) {
                pairs.push([{ idx: i, v: perm[i] }, { idx: j, v: perm[j] }]);
            }
        }
        return pairs;
    }

    public static intersectionFull(tA: TimeFrame[][]): boolean[] {

        let perm = generatePermutations(tA).map(
            (p: number[]) => this.generatePairs(p).map(
                (pair: { idx: number; v: number; }[]) => {
                    let t1 = tA[pair[0].idx][pair[0].v];
                    let t2 = tA[pair[1].idx][pair[1].v];
                    console.log("intersection: ", TimeFrame.intersection(t1, t2))
                    return !TimeFrame.intersection(t1, t2);
                }).reduce(
                    (acc: boolean, val: boolean) => acc || val, false)
        );

        return perm
    }

    public static intersectionArray(t1: TimeFrame[], t2: TimeFrame[]): boolean {
        for (let i = 0; i < t1.length; i++) {
            for (let j = 0; j < t2.length; j++) {
                if (TimeFrame.intersection(t1[i], t2[j])) {
                    return true;
                }
            }
        }
        return false;
    }

    public static sort(t1: TimeFrame, t2: TimeFrame): number {
        if (t1.day === t2.day) {
            if (t1.start < t2.start) {
                return -1;
            }
            return 1;
        }
        return 0;
    }

    public static distance(t1: TimeFrame, t2: TimeFrame): number {
        if (t1.day === t2.day && !TimeFrame.intersection(t1, t2)) {
            if (t1.start < t2.start) {
                return t1.end - t2.start;
            }
            return t2.end - t1.start;
        }
        return 0;
    }

    public getStart(): number {
        return this.start;
    }

    public getDay(): string {
        return this.day;
    }

    public getEnd(): number {
        return this.end;
    }
}