export function getTagsQuery(tags: string[]) {
    let ans = "?";
    tags.forEach((tag) => {
        ans += `tags=${tag}&`;
    });
    return ans.slice(0, ans.length - 1);
}
