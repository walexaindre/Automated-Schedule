<script lang="ts">
 import { Schedule } from "./Core/Schedule";
    import DisplaySchedule from "./lib/DisplaySchedule.svelte";

  let schedule = new Schedule();

  let res = schedule.getSchedule();

  let fr = res.timeframes;
  let perm = res.vperm[0];
  let courses = res.courses;

  let courselist = [courses[0][perm[0]],courses[1][perm[1]]]
</script>

<DisplaySchedule {perm} courses={courselist} />