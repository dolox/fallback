<p align="center"><a href="http://fallback.io/" target="_blank"><img alt="Fallback JS" height="128" src="http://fallback.io/img/logo.png" /></a></p>
<h1 align="center">Contributing to Fallback JS</h1>

Looking to contribute to Fallback JS? **Here's how you can help.**

Please take a moment to review this document in order to make the contribution process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue or assessing patches and features.

- [Issue Tracker](#issue-tracker)
- [Feature Requests](#feature-requests)
- [Pull Requests](#pull-requests)
- [Coding Guidelines](#coding-guidelines)
- [Grunt](#grunt)

---

## Issue Tracker

The [issue tracker](https://github.com/dolox/fallback/issues) is the preferred channel for [bug reports](#bug-reports), [features requests](#feature-requests) and submitting [pull requests](#pull-requests), but please respect the following restrictions:

- **Please do not** use the issue tracker for personal support requests without first doing your homework. Search the [issue tracker](https://github.com/dolox/fallback/issues) and [StackOverflow (#fallbackjs)](http://stackoverflow.com/questions/tagged/fallbackjs) first to see if answers to questions you have, may've already been answered prior to opening a new issue.

- **Please do not** derail or troll issues. Keep the discussion on topic and respect the opinions of others.

---

## Bug Reports

A bug is a ***demonstrable problem*** that is caused by the code in the repository. Good bug reports are extremely helpful, so thanks!

Guidelines for bug reports:

1. **Isolate the problem** — ideally create a reduced test case and a live example. [Plunker](http://plnkr.co/) really shines when it comes to supplying test cases for bug reports.

2. **Validate and lint your code** — validate and lint your JavaScript to ensure your problem isn't caused by a simple error in your own code. ([Plunker](http://plnkr.co/) will do this automatically for you).

3. **Use the GitHub issue search** — check if the issue has already been reported.

4. **Check if the issue has been fixed** — try to reproduce it using the latest master or development branch in the repository.

A good bug report shouldn't leave others needing to chase you up for more information. Please try to be as detailed as possible in your report. What is your environment? What steps will reproduce the issue? What browser(s) and OS experience the problem? Do other browsers show the bug differently? What would you expect to be the outcome? All these details will help people to fix any potential bugs.

**Example:**

> Short and descriptive example bug report title
>
> A summary of the issue and the browser/OS environment in which it occurs. If suitable, include the steps required to reproduce the bug.
>
> This is the first step
> This is the second step
> Further steps, etc.
> <url> - a link to the reduced test case

> Any other information you want to share that is relevant to the issue being reported. This might include the lines of code that you have identified as causing the bug, and potential solutions (and your opinions on their merits).

---

## Feature Requests

Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Please provide as much detail and context as possible.

---

## Pull Requests

Good pull requests—patches, improvements, new features—are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

Please ask first before embarking on any significant pull request (e.g. implementing features, refactoring code, porting to a different language), otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project.

Please adhere to the [coding guidelines](#coding-guidelines) used throughout the project (indentation, accurate comments, etc.) and any other requirements (such as test coverage).

**IMPORTANT:** By submitting a patch, you agree to allow the project owners to license your work under the terms of the projects [LICENSE](https://github.com/dolox/fallback/blob/master/LICENSE.txt).

---

## Coding Guidelines

We're using [idiomatic.js](https://github.com/rwaldron/idiomatic.js/blob/master/readme.md).

- Real Tabs (no spaces).
- No padding parenthesis with spaces.
- Single quotes.
- Strict mode.
- 120 character line limit for comments.
- Use `//` for comments, not `/* */`.
- Use descriptive variable names.
- Comment your code, as if an amateur were reading it.
- If changing/adding functionality add/update associated tests.

**You're changes must pass the tests that are in place, otherwise they won't be accepted!**

To check your coding style run `grunt lint` from the CLI.

---

## Grunt

The following commands can be used for the CLI. Before attempting to run any of these commands please make sure you've:

- Updated the project repository.
- Installed `grunt-cli` (`npm install -g grunt-cli`)
- Installed the library's dependencies (`npm install`)

| Command        | Description |
| -------------- | ----------- |
| grunt build    | Build the project. This command will build the docs and the library. |
| grunt dev      | Build the project and run a local server instance to actively work on developing the project. This command is bundled with live reload, so when you save your code, it will automatically refresh your browser. |
| grunt devTests | Runs the tests for the project with watch, so you may update the tests without having to restart the server every time. |
| grunt docs     | Generate the documents located in the `docs/` folder. |
| grunt lint     | Run ESLint on the project to check for valid JavaScript syntax. |
| grunt tests    | Run tests that are included for the project. |
