<script lang="ts">
    import { TimeFrame } from "../Core/TimeFrame";
    import {Coloring} from "../Core/coloring";


    export let timeframes: TimeFrame[][] = [];
    export let perm: number[] = [];


    let frame = perm.map((idx, i) => timeframes[i][idx]);

    const valid_time = new TimeFrame("6:30 am", "9:30 pm", "L");
    const start_time = valid_time.getStart();
    const end_time = valid_time.getEnd();
    const step = 30; // 30 minutes

    function minutes_to_12h_format(minute: number) {
        const hours = Math.floor(minute / 60);
        const minutes = (minute % 60).toString().padStart(2, "0");

        if (hours === 0) {
            return `12:${minutes} am`;
        }

        if (hours > 12) {
            const hfmts = String(hours - 12).padStart(2, "0");
            return `${hfmts}:${minutes} pm`;
        }

        const hfmt = String(hours).padStart(2, "0");
        return `${hfmt}:${minutes} am`;
    }

    function time_steps(start_time: number, end_time: number, step: number) {
        return Array.from(
            { length: (end_time - start_time) / step + 1 },
            (_, i) => {
                const time = start_time + i * step;
                return minutes_to_12h_format(time);
            },
        );
    }
    const time_text = time_steps(start_time, end_time, step);

    const rows = Number((end_time - start_time) / step);
    const cols = 6;

    const matrix = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => {
            return { class_list: [] };
        }),
    );

    for (let i = 0; i < 4; ++i) {
        matrix[i][i].class_list.push("s");
    }

    function cell_ctx(i: number, j: number) {
        return "nm";
    }

    function cell_isempty(i: number, j: number) {
        return matrix[i][j].class_list.length === 0;
    }

    console.log(matrix);
</script>


