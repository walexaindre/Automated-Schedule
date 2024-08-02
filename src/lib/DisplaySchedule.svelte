<script lang="ts">
    import type { Course } from "../Core/Interfaces";
    import { TimeFrame } from "../Core/TimeFrame";
    import { Coloring } from "../Core/coloring";

    import GridSlot from "./GridSlot.svelte";
    export let perm: number[] = [];
    export let courses: Course[] = [];

    let color = new Coloring(courses);

    let colorized: {
        row_start: number[];
        row_end: number[];
        column_start: number[];
        column_end: number[];
        button_size: number[];
    }[] = color.colorize();

    console.log(colorized);
    let tagcount = colorized.length;
</script>

<div class="grid grid-cols-6 gap-1 grid-rows-6 w-3/4 h-48">
    {#each colorized as weekday}
        {#each Array.from({ length: weekday.row_start.length-1 }, (_, i) => i) as idx}
            <div
                class=" col-start-[{weekday
                    .column_start[idx]}] col-end-[{weekday.column_end[
                    idx
                ]}] row-start-[{weekday.row_start[idx]}] row-end-[{weekday
                    .row_end[idx]}] bg-black "
            ></div>
        {/each}
    {/each}
    <div class=" row-start-[6] row-end-[6] col-start-3 col-end-5 bg-red-500"></div>

    <GridSlot re={4} rs={4} cs={2} ce={4}> </GridSlot>
</div>
