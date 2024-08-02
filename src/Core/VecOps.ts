function generatePermutations(courses: any[][]): number[][] {
    let permutations = [];
    let n = courses.length;
    let clen = courses.map((c: any[]) => c.length);
    let indices = Array(n).fill(0);

    while (true) {
        let permutation = indices.map((idx: number) => idx);
        permutations.push(permutation);

        let i = n - 1;
        while (i >= 0 && (indices[i] + 1 >= clen[i])) {
            i -= 1;
        }

        if (i < 0) {
            break;
        }

        indices[i] += 1;
        for (let j = i + 1; j < n; j++) {
            indices[j] = 0;
        }
    }

    return permutations;
}

export { generatePermutations };