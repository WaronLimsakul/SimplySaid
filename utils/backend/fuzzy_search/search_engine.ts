import postt from "@/lib/schema_design/post_type";

interface InvertedIndex {
    [word: string]: Set<string>;
}

interface Posts {
    [post_id: string]: postt;
}

class SearchEngine {
    private invertedIndex: InvertedIndex;
    private posts: Posts;

    constructor() {
        this.invertedIndex = {};
        this.posts = {};
    }

    getEditDistance(word: string, target: string): number {
        if (word.length == 0) return target.length;
        if (target.length == 0) return word.length;

        const n = word.length;
        const m = target.length;

        const dp = Array(n + 1)
            .fill(0)
            .map(() => Array(m + 1).fill(0));

        for (let i = 0; i < m + 1; i++) dp[n][i] = m - i;
        for (let i = 0; i < n + 1; i++) dp[i][m] = n - i;

        for (let i = n - 1; i >= 0; i--) {
            for (let j = m - 1; j >= 0; j--) {
                const pos_match = word[i] === target[j] ? 1 : 0;
                dp[i][j] =
                    1 +
                    Math.min(dp[i + 1][j + 1] - pos_match, dp[i + 1][j], dp[i][j + 1]);
            }
        }

        return dp[0][0];
    }

    // maximum distance 2, more than that, you are on your own.
    findClosestWord(word: string) {
        let minDistance = Infinity;
        let closestW = word;

        const marginOfError = 2;

        for (const dictWord of Object.keys(this.invertedIndex)) {
            const distance = this.getEditDistance(word, dictWord);
            if (distance < minDistance && distance <= marginOfError) {
                minDistance = distance;
                closestW = dictWord;
            }
        }

        return closestW;
    }

    tokenize(str: string) {
        return str
            .toLowerCase()
            .replace(/[^\w\s]/g, "") // remove special char
            .split(/\s+/) // split by space
            .filter((word) => word.length > 2);
    }

    addPost(post: postt) {
        const { _id, tags, object, title, user_data } = post;
        const { name } = user_data;

        this.posts[post._id] = post;

        const allTokens = new Set([
            ...this.tokenize(title),
            ...this.tokenize(object),
            ...this.tokenize(name),
            ...tags.map((tag) => tag.toLowerCase()),
        ]);

        allTokens.forEach((token) => {
            if (!this.invertedIndex[token])
                this.invertedIndex[token] = new Set([_id]);
            else this.invertedIndex[token].add(_id);
        });
    }

    search(target_text: string) {
        const target_tokens = this.tokenize(target_text);
        const score_board: { [post_id: string]: number } = {};

        target_tokens.forEach((token) => {
            token = this.findClosestWord(token);

            let target_posts: Set<string> = new Set();
            // can't escape forEach
            if (this.invertedIndex[token]) {
                target_posts = this.invertedIndex[token];
            }
            target_posts.forEach((post_id) => {
                score_board[post_id] =
                    post_id in score_board ? score_board[post_id] : 0;
                const full_post = this.posts[post_id];
                if (full_post.title.toLowerCase().includes(token))
                    score_board[post_id] += 4;
                if (full_post.object.toLowerCase().includes(token))
                    score_board[post_id] += 3;
                if (full_post.tags.some((tag) => tag.toLowerCase().includes(token)))
                    score_board[post_id] += 2;
                if (full_post.user_data.name.toLowerCase().includes(token))
                    score_board[post_id] += 2;
            });
        });
        console.log("score_board: ", score_board);

        // find cut point later.
        return Object.entries(score_board)
            .sort((post_a, post_b) => post_b[1] - post_a[1])
            .map((post) => post[0]);
    }
}

export default SearchEngine;
