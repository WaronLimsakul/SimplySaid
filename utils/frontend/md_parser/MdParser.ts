import { Pattern } from "./Pattern";
import { Rule } from "./Rule";

const defaultRules: Rule[] = [
    new Rule("header", [
        new Pattern(/^#{6}\s?([^\n]+)/gm, "<h6>$1</h6>"),
        new Pattern(/^#{5}\s?([^\n]+)/gm, "<h5>$1</h5>"),
        new Pattern(/^#{4}\s?([^\n]+)/gm, "<h4>$1</h4>"),
        new Pattern(/^#{3}\s?([^\n]+)/gm, "<h3>$1</h3>"),
        new Pattern(/^#{2}\s?([^\n]+)/gm, "<h2>$1</h2>"),
        new Pattern(/^#{1}\s?([^\n]+)/gm, "<h1>$1</h1>"),
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
        if (index !== -1) {
            this.rules.splice(index, 0, rule);
        }
        return this;
    }
}
