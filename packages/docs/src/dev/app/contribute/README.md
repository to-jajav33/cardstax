
# Card Stax - Contribute

  

Card Stax, app for card game making, made easier.

  

  

# Setup This Repo

  

Ensure you have the following software installed in you computer:

  

## 1. Install node and npm

- go to the following [url](https://nodejs.org/en/)

- download the latest node and that will also download npm

- follow the default instructions

  

## 2. Go to github

  

### 2.1 Create a github account

Just do the default instructions for creating a repo.

  

### 2.2 Get access to the repo

Contact one of the team members with access, and have them send you a contributors request. Using the email or user created above.

  

### 2.3 Clone the Repo

Once you have access, clone the repo. (That means get the git repo into your computer)

  

## 3. NPM install packages

In order to save space on a repo, npm allows you to not save all the addons in your repo. Instead it saves url, and running **npm install** will install everything. This saves space in your repo.

  

Run the following command:

	> npm install

  

## 4. Work on the expected repo

Before working on a project you need to do a two steps:

1. Run [Verdaccio](https://github.com/verdaccio/verdaccio) from the root of the repo

		> verdaccio

    1. If this is the first time trying to run verdaccio, you might need to set it up.

			> npm set registry http://localhost:4873/

			> NPM_CONFIG_REGISTRY=http://localhost:4873

			> npm adduser --registry http://localhost:4873

			> verdaccio

2. **cd** into package to be worked on and run npm install to get the latest packages.

		> cd packages/packageName

		> npm install


### - **packages/docs/**

#### Documentation

  

Documentation for anything game related. Can even become the game site possibly.

  

### - **packages/app/**

#### App repo - Quasar project.

  

App development that we want in the app should be done here. If you want to experiment with an idea, mechanic, or asset from the asset store, use the experimental package mentioned below.

  

### - **packages/experimental/**

#### Experiment with anything - Quasar Project

  

Sometimes you may want to try out some ideas first, see if it is a good feature for the game. This repo allows you to try stuff out, without breaking the code for the actual game.

  

## How to Work On This Repo

### 1. Choose a ticket to work on using Quire

Go to the repos issue site (Quire), and assign a ticket to yourself, or create a new one and then assign to yourself.


### 2. Create a branch off of develop based on issue ID

When creating a branch, there are a few types of branches you can create. Choose the one that's best appropriate for the task you are working on.

- If a feature **feature/#ticketID-summary-of-feature**

- If a fix **bugfix/#ticketID-summary-of-issue**

- If a chore **chore/#ticketID-title-of-ticket**

  

> Issue ID can be found next to the title of the issue on github issues.

  

### 2. Do Work On The Package

Work on the part of the game you need to work on.

#### 2.1 To test the app locally

> \> npx quasar dev

  

### 3. Add documentation (if needed)

If your changes require and explanation, or some time of documentation. Add it were necessary.

#### 3.1 JSDoc Syntax for Code Documentation

If proper JSDoc is used, you can run `npm run docs` to generate docs into the packages/docs repo.

#### 3.2 Documentation for Explanation/Guides

If more info is needed for guidance on the app or development, add/create documentation using packages/docs. This uses Vuepress and more info can be found [here](https://vuepress.vuejs.org/guide/getting-started.html#inside-an-existing-project).


	// runs a server to test
	> npm run docs:dev

	// generates docs in packages/docs/dist/ folder
	> npm run docs:build


  

### 4. Stage the changes you will want to commit

Stage all the changes you want to commit.

  

### 5. Commit The Staged Changes

Now that changes have staged, do the following steps.

  

To run the above command, open a terminal at the root of the project.

Root of the project is where lerna.json is located.

Then open a terminal

1. hold shift and right-click on lerna.json,

2. then select "Open with command prompt" or "Open with PowerShell" or "Open with Terminal"

3. Run the following command

		> npm run git:commit


	This will prompt you for some questions. Answer them accordingly.

	When asked for scope, look at the name of the package you are committing to. **@cardstax/docs**, **@cardstax/experimental**, or **@cardstax/app**

  

### 6. Push

The commit saved the changes locally, but we want to make sure they are saved in the server. To do so, push.

  

Do steps 2-6 as often as you would like. This helps keep a history of you work.

Once you are done with the ticket assigned to you, go on to step 7.

  

### 7. Create Pull Request...Are you done with the ticket?

If you are **not** done with the ticket, do not do not do this step.

  

If you are:

Create a pull request that merges your work back to develop. You can create a pull request in the following ways

  

#### In GitHub
got to repo, then click on **Pull Request** tab. From there, select **New Pull Request**, then from the **compare** drop down, select your branch, and in the **base** drop down. Select **develop**. Then Select **Create Pull Request**. Add reviewers. Only after approval should the request be merged.
