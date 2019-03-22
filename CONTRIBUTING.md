# Contribution Guidelines

Thanks for behing here already ! You'll find all the informations you need to start contributing to the project. If you think something is missing, consider sendind us a PR.

## 🍽&nbsp; Summary

- [Code of conduct](https://github.com/OneArmyWorld/onearmy/blob/master/CONTRIBUTING.md#--code-of-conduct)
- [Getting started](https://github.com/OneArmyWorld/onearmy/blob/master/CONTRIBUTING.md#--getting-started)
- [Issue Tracking and Management](https://github.com/OneArmyWorld/onearmy/blob/master/CONTRIBUTING.md#--issue-tracking-and-management)
- [Project structure](https://github.com/OneArmyWorld/onearmy/blob/master/CONTRIBUTING.md#--project-structure)
- [Technologies](https://github.com/OneArmyWorld/onearmy/blob/master/CONTRIBUTING.md#--technologies)
  - [Frontend](https://github.com/OneArmyWorld/onearmy/blob/master/CONTRIBUTING.md#frontend)
  - [Backend](https://github.com/OneArmyWorld/onearmy/blob/master/CONTRIBUTING.md#backend)
- [Branch structure](https://github.com/OneArmyWorld/onearmy/blob/master/CONTRIBUTING.md#--branch-structure)
- [Javascript style guide](https://github.com/OneArmyWorld/onearmy/blob/master/CONTRIBUTING.md#--javascript-style-guide)
- [Why haven't you used ...](https://github.com/OneArmyWorld/onearmy/blob/master/CONTRIBUTING.md#-why-havent-you-used-insert-favourite-languageframeworkconvention-here)
- [Deployment](https://github.com/OneArmyWorld/onearmy/blob/master/CONTRIBUTING.md#--deployment)

## 👐 &nbsp; Code of Conduct

This project and everyone participating in it is governed by the [One Army Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [hello@onearmy.world](mailto:hello@onearmy.world).

## 📟 &nbsp; Getting started

- Fork the repository
- Clone the projet from the fork you have created previously at first step :
  `git clone https://github.com/`**your-github-user**`/onearmy.git`

- Install dependencies
  `yarn`

- Run the dev server
  `yarn start`

### Additional commands

- Run the component documentation
  `yarn storybook`

Note: Builds are currently tested on Chrome/Firefox. If your browser is not
supported, then consider contributing.

## 🐛 &nbsp; Issue Tracking and Management

Issues are tracked on GitHub. Use the labels to filter them to your needs and/or competences.
Anybody can create an issue or feature request, but be sure to use our templates if you want your voice to be eard.
Some issues are collated to form modules which are the parent of each section of the plateform. Modules are then splitted into **pages** and finally **components**. You can navigate throught them by filtering with the labels `Type:Module` and `Type:Pages`. Having a look at **module** and **pages** issues is the best way to have a clear overview of the ongoing work on it.

We've also labeled some of the issues with `Good-first-issue` to help you find the more accessible ones to start with.
When you start working on an issue, comment it or if your are a registered contributor assign yourself to let us know and avoid working on something twice. The comment should include a mention to @mattia-io (our project lead).

When a group of issues has been resolved a pull request to the master branch should be made, where it will undergo a quick review and test. It is expected that the developer will have done through testing themselves first, and most pull requests can be quickly merged.

## 🏠 &nbsp; Project Structure

The project is split across **pages** which make up the visual routing of the application. Within pages there are **components**, some of which are specific to the page and others which are shared.

Typescript **models** that relate to general data flow (such as a user’s profile) are within the models folder, whilst component states and properties are declared within the component. Artificial data for use in development is held in the **mocks** folder, with live data requests handled within **api**.

In addition app state, actions and dispatchers are handled within the **stores** folder, whilst global state property mapping is dealt in page components.

## 🤖 &nbsp; Technologies

### Frontend

The platform is built in **React** and [Typescript](https://www.typescriptlang.org/docs/handbook/basic-types.html) for typing and consistency, [styled-components](https://www.styled-components.com/) for reusability and component based styling.
We created a frontend guide to explain our choices and best practice in building the One Army interface. This guide is available in [the wiki](https://github.com/OneArmyWorld/onearmy/wiki/Frontend)

### Backend

Our backend contains microservices in Node and is based on Firebase's Firestore to manage our database.
You can find usefull links to learn more about these technologies [here](/CONTRIBUTING.md#ressources)

## 🌳 &nbsp; Branch Structure

We have two main branches linked to production and development sites, you should always start with the **master** branch as this contains the most up-to-date code, and will be where pull requests are made to for review. The **production** branch contains the live production site, and will be merged from master after regular review periods.

We use additional branches to define a specific feature or issue group being worked on. An example might be work on the home page, which would be done in the `19-home-page` branch (where 19 refers to the issue number describing what needs to be done). These branches are ephemeral, and so removed after merging into the master branch and closing the issue. Generally it is expected that only 1 developer will be working on a given branch, and it is that developer’s responsibility to create the branch, create a pull requests, reviews or ask for additional support when needed.

## 🚀 &nbsp; Deployment

Master is our current development leading branch, and will autodeploy to the
[development site](https://dev.onearmy.world/) with Travis CI.

## 🤓 &nbsp; Javascript style guide

As this is a large project spread across many developers it is important that not only code is clean but also consistent. We use the prettier style guide to enforce certain conventions through the linting system – if using VSCode it is recommended that you include the [prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to track errors in real time.

We also expect code to follow standard good practice, such as sensible variable naming, informative comments and avoiding files large than a couple hundred lines of code (emphasis on usability and reusability).

### 😖 Why haven't you used [insert favourite language/framework/convention here]

As an open-source project most of our decisions up till now have been guided by the people writing the code and conversations with people in our community whose opinions we value and respect. Some things are by careful design after the result of lengthy discussion, others are just individual preference with few complaints to dates. As we both want to encourage input from newer contributors but also avoid getting too bogged down in circular or repeated debates we encourage you to:

1. Start with an observation - instead of asking 'do you use redux' take a look at the package and see for yourself.
2. See if this is something we've already talked about - we tracked some initial discussions in the google doc [PPv4 - Web Platform Discussions](https://docs.google.com/document/d/1spUOUXvisHoTvvH8UDgFo1-pOi8PBsb1F8H2GRaH4IM/edit?usp=sharing), and are trying to add more of the ongoing discussions to the [GitHub Wiki](https://github.com/OneArmyWorld/onearmy/wiki). There is also plenty more within Slack v4-website-dev channel, which we hope to slowly migrate onto the wiki.
3. Clearly state what you believe the benefits to the project would be - simply 'because I've used it before and like it' isn't good enough! Do your research, evaluate common alternatives (in the very least google '[my awesome thought] vs ' and read the first few articles. Try to present a balanced argument for why we might want to/not want to use something.
4. Be willing to support implementation - any great idea or suggestion will have direct impact on others contributing to the project. If there is something you feel strongly about you should first create a clean, clear demo of how it would work in practice, and be willing to provide additional guidance if called upon.

## 🤝 &nbsp; Joining the team

We are always open to have more people involved. If you would like to contribute more often, we would love to welcome you to the team. Just [send a quick email](mailto:hello@preciousplastic.com?subject=Developers%20Call%20To%20Arms), introducing yourself and outline:

1. Your experience working with the technologies listed above
2. How much time you feel you can dedicate to the project

We ask this so that we can better understand how you might fit in with the rest of the team, and maximise your contributions. From here we will then connect you to the github repository as well as slack channel which we use to handle regular communication.

## 📚 &nbsp; Resources

- https://www.udemy.com/react-redux/
  paid online course to cover most of the basics of React - it uses redux where we use mobx but rest is still very good

* https://levelup.gitconnected.com/typescript-and-react-using-create-react-app-a-step-by-step-guide-to-setting-up-your-first-app-6deda70843a4
  short intro app for typescript and react

* https://medium.com/teachable/getting-started-with-react-typescript-mobx-and-webpack-4-8c680517c030
  react-mobx-typescript example

* https://medium.com/get-it-working/get-googles-firestore-working-with-react-c78f198d2364 react-firestore example

- https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/
  Example using firebase auth with react and linking redux state
