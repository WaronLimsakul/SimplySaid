# SimplySaid

This is SimplySaid, a new media platform for sharing and reading simple explanation of of any complicated topics!

![Simply Said in Action](https://github.com/user-attachments/assets/148ce297-cd67-4061-9a64-06267b2d9d96)

## Motivation

Richard Feynman famously said,

> "If you want to master something, teach it. The more you teach, the better you learn. Teaching is a powerful tool to learning"

SimplySaid takes this as a core concept of it. We encourage people who want to understand complicated topics to simply teach it to everyone, reflecting a feedback and exercise your understanding. As a result, people who do not understand will understand, and people who understand will understand _more_.

## 🚀 Quick Start

Navigate to [SimplySaid](https://simply-said.vercel.app/) and sign in to receive full experience!

You can read and post as you want!.

## ⚙️ Technologies used

- Next.js as full-stack frame work.
- MongoDB Atlas as database.
- MongoDB Driver in Node.js
- Auth.js module for users authentication
- TailwindCSS for styling
- ShadCNui as designed components

## 📖 Usage

### Authentication

- User can signin with OAuth using github or google account
- User can sign out of the account.
- The users can check [term of service](https://simply-said.vercel.app/tos) and [public](https://simply-said.vercel.app/policy) in the site

### Post Searching

At the search area of the navigation bar, User can search explanations posted in the main feed using many query words provided
**(The search bar will be hidden in the small viewport, users can click the magnifying glass icon to open the searching dialog)**

##### _Full text search (recommended)_

User can have typo and vaguely search what they want to search.

- Fuzzy search : using DIY fuzzy search algorithm to match the expected word and rank post scores
- Atlas search: using MongoDB Atlas' Atlas search to as a full text based search.

##### _Exact search_

User must define an exact type of fields in a post and exact words.

- Search by tags: User can search one the the tags they interested in
- Search by object: User can search a main topic they want to study in exact word
- Search by userid: User can put an exact users id of a certain users to find all post of them.

### Post Voting and Sharing

On the header of each post, users can

1. Click at the profile picture of the post writer. This will navigate users to the writer profile.

On the footer of each post, users can

1. Upvote or Downvote post as they want
2. Share url of the post.

### User searching

At the _users avatar_ icon on the top right (or left for small viewport) of the navigation bar, users can click the avatar to open a dropdown menu. In the menu users can click on the `Search User` button which will popup the dialog.
Users must input the exact name of the user they want to find to be able to navigate to their profile page.

### Seeing & Setting users' own profile

At the _users avatar_ icon on the top right (or left for small viewport) of the navigation bar, users can click the avatar to open a dropdown menu. In the menu users can click on the `Profile` button which will navigate users to their profile page.

#### Checking for profile information

**In the profile page**, users can check their information which are

1. Name
2. Email
3. How many posts users have posted so far
4. How many posts users have voted so far

#### Setting profile information

In the user profile page, users can click `Edit Profile` button which will popup a dialog.
User can set their profile information then click `Save` as they finish.

### Seeing Other users' profile page

As mention in the earlier part, users can use a `Search User` feature to find a user by their username. That will result in navigating users to the target user profile. At the page, features are different from own profile page.

#### Checking others' information:

User can see other users information like in their own profile. **However**, will not be able to edit others' profile.

#### Seeing others' posts:

Users can click on `See ... posts` button under target users avatar, this will navigate users to post feed that contain only posts from the target users.

### Posting

At the bottom right of the viewport users can click the pencil icon button to navigate to writing page. At the writing page, user must fill all the information required a post which are

1. Object: The main topic users want to explain in simple term.
2. Title: The main idea of the explanation or title of the post in a sentence.
3. Tags: Related fields or subjects that users think might interest people there.
4. Content: content of the post, users can use [Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) language to write there post content.

#### Markdown preview:

On the right side (or below in a smaller viewport) of the textarea input for the content, users can see an output preview of their Markdown Input.

#### Supported Markdown

##### Heading

Users can write `# `/`## `/`### `/`#### ` as a `<h1>`, `<h2>`, `<h3>` and `<h4>` text in order

##### Horizontal rule

Users can write `---` (at least 3) to create a horizontal rule.

##### Code

Users can write `` `<text>` `` or ` ``<text>`` ` to wrap a text as an inline code

##### Unordered list

Users can write as below to represent a bullet point list.

```md
- l1
- l2
  ...
```

##### Ordered list

Users can write a list in order as shown below to present an ordered list.

```md
1. text
2. text
3. text
   ....
```

##### Typography

1. `***text***` = bold-italic
2. `**text**` or `\_\_ text \_\_` = bold
3. `*text*` or `\_ text \_` = italic
4. `~~text~~` = deleted

##### Image

users can write `![text](href)` to shown an image by its url.

##### Hypertext

Users can write `[text](href)` to show a hyper text.

### Home page navigation

At the top of the application, users can click the application's logo in order to navigating to main page.

## 🤝 Contributing

I would love your help. Please clone the repo and submit a pull request to the `main` branch.

### To install dependencies

```bash
npm install
```

## License

This project use [MIT](https://www.mit.edu/~amini/LICENSE.md) license.
