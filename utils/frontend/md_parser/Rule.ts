import { Pattern } from "./Pattern";

export class Rule {
    name: string;
    // one rule can have more than one pattern
    patterns: Pattern[];
    constructor(name: string, patterns: Pattern[]) {
        this.name = name;
        this.patterns = patterns;
    }

    apply(raw: string): string {
        return this.patterns.reduce(
            // try apply every pattern in accumulator result
            (result, pattern) => pattern.apply(result),
            raw,
        );
    }
}
