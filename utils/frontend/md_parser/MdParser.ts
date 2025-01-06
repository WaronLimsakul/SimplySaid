import { Pattern } from "./Pattern";
import { Rule } from "./Rule";

// ues class=? attribute to pass tailwind style.
const defaultRules: Rule[] = [
    new Rule("header", [
        new Pattern(
            /^#{4}\s?([^\n]+)/gm,
            "<h4 class='text-lg font-semibold'>$1</h4>",
        ),
        new Pattern(
            /^#{3}\s?([^\n]+)/gm,
            "<h3 class='text-xl font-semibold'>$1</h3>",
        ),
        new Pattern(/^#{2}\s?([^\n]+)/gm, "<h2 class='text-2xl font-bold'>$1</h2>"),
        new Pattern(/^#{1}\s?([^\n]+)/gm, "<h1 class='text-3xl font-bold'>$1</h1>"),
    ]),
    new Rule("horizontal rule", [new Pattern(/^-{3,}|^\_{3,}/gm, "<hr />")]),
    new Rule("code", [
        new Pattern(
            /``(.*?)``/gm,
            "<code class='bg-zinc-300 text-destructive'>$1</code>",
        ),
        new Pattern(
            /`(.*?)`/gm,
            "<code class='bg-zinc-300 text-destructive'>$1</code>",
        ),
    ]),
    new Rule("unorderd list", [
        new Pattern(
            /^[\*|+|-][ |.](.*)/gm,
            "<ul class='list-disc ml-4 mb-2'><li>$1</li></ul>",
        ),
        new Pattern(/<\/ul\>\n<ul class='list-disc ml-4 mb-2'\>/g, "\n"),
    ]),
    new Rule("ordered list", [
        new Pattern(
            /^\d[ |.](.*)/gm,
            "<ol class='list-decimal ml-4 mb-2'><li>$1</li></ol>",
        ),
        new Pattern(/<\/ol\>\n<ol class='list-decimal ml-4 mb-2'\>/g, "\n"),
    ]),
    new Rule("bold italic", [
        new Pattern(/\*\*\*(.*)\*\*\*/gm, "<b><i>$1</i></b>"),
    ]),

    new Rule("bold", [
        new Pattern(/\*\*\s?([^\n]+)\*\*/g, "<b>$1</b>"),
        new Pattern(/\_\_\s?([^\n]+)\_\_/g, "<b>$1</b>"),
    ]),
    new Rule("italic", [
        new Pattern(/\*\s?([^\n]+)\*/g, "<i>$1</i>"),
        new Pattern(/\_\s?([^\n]+)\_/g, "<i>$1</i>"),
    ]),
    new Rule("delete", [new Pattern(/~~(.*)~~/gm, "<del>$1</del>")]),
    new Rule("image", [
        new Pattern(/\!\[([^\]]+)\]\((\S+)\)/g, '<img src="$2" alt="$1" />'),
    ]),
    new Rule("link", [
        new Pattern(
            /\[([^\n]+)\]\(([^\n]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener" class="text-primary hover:underline">$1</a>',
        ),
    ]),

    // new Rule("paragraph", [new Pattern(/([^\n]+\n?)/g, "\n<p>$1</p>\n")]),
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
