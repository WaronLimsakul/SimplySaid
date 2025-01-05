import { Pattern } from "./Pattern";
import { Rule } from "./Rule";

// ues class=? attribute to pass tailwind style.
const defaultRules: Rule[] = [
    new Rule("header", [
        new Pattern(/^#{6}\s?([^\n]+)/gm, "<h6 class='text-lg'>$1</h6>"),
        new Pattern(/^#{5}\s?([^\n]+)/gm, "<h5 class='text-xl'>$1</h5>"),
        new Pattern(/^#{4}\s?([^\n]+)/gm, "<h4 class='text-2xl'>$1</h4>"),
        new Pattern(/^#{3}\s?([^\n]+)/gm, "<h3 class='text-3xl'>$1</h3>"),
        new Pattern(/^#{2}\s?([^\n]+)/gm, "<h2 class='text-4xl '>$1</h2>"),
        new Pattern(/^#{1}\s?([^\n]+)/gm, '<h1 class="text-5xl ">$1</h1>'),
    ]),
    new Rule("bold", [
        new Pattern(/\*\*\s?([^\n]+)\*\*/g, "<b>$1</b>"),
        new Pattern(/\_\_\s?([^\n]+)\_\_/g, "<b>$1</b>"),
    ]),
    new Rule("italic", [
        new Pattern(/\*\s?([^\n]+)\*/g, "<i>$1</i>"),
        new Pattern(/\_\s?([^\n]+)\_/g, "<i>$1</i>"),
    ]),
    new Rule("image", [
        new Pattern(/\!\[([^\]]+)\]\((\S+)\)/g, '<img src="$2" alt="$1" />'),
    ]),
    new Rule("link", [
        new Pattern(
            /\[([^\n]+)\]\(([^\n]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener">$1</a>',
        ),
    ]),
    new Rule("paragraph", [new Pattern(/([^\n]+\n?)/g, "\n<p>$1</p>\n")]),
];

export class MdParser {
    private rules: Rule[] = defaultRules;

    public addRuleBefore(rule: Rule, before: string): MdParser {
        const index = this.rules.findIndex((r) => r.name == before);
        // .findIndex return -1 if not found target.
        if (index !== -1) {
            // no Array.insert() method. We have to use this trick.
            // The trick make no delete and add something before the index.
            this.rules.splice(index, 0, rule);
        }
        return this;
    }

    // technically add rule before paragraph
    public addRule(rule: Rule): MdParser {
        this.addRuleBefore(rule, "paragraph");
        return this;
    }

    public render(raw: string) {
        let result = raw;
        this.rules.forEach((rule) => (result = rule.apply(result)));
        return result;
    }
}
