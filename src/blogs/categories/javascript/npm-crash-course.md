---
title: NPM crash course
description:
banner: /blogs/javascript/npm-crash-course/banner.png
altText: NPM crash course in Cules Coding by @thatanjan
customID: 9DLqAhsqeKCkkNHl-ms-H
---

## What is NPM?

NPM stands for Node Package Manager. It is a package manager for
Node.js. is used to install and manage packages.

## What is a package?

A package is just a collection of code that you can use and share with other developers.

For example, you have created a simple function that will generate a random number.

```javascript
const generateRandomNumber = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min
```

You might need to use this function in other projects. You can just copy-paste. But there is a better way to do this.
You can create a package with the code and publish it on the web. And
then you can install it in your project. If other developers want to use this function, they can just install it in their project.

A package can be just one line of code or a collection of files.

Also, packages are called modules. So, when I will mention modules in this article, I will mean packages.

## Who should use NPM?

Any javascript developer. If you are a front-end dev, you might have
used the library through CDN. But you can use NPM to install those libraries
because a library is just a collection of packages. If you are a back-end dev and you are using Node.js, you can use NPM to install packages
for node.js.

## How to install NPM?

You just need to install Node.js. Check how to install Node.js for your OS.

For those who are using Arch based system, you can install Node.js through Pacman.

```bash
sudo pacman -S nodejs

# check nodejs version

node --version
```

## Check NPM version

```bash
npm -v
```

It will give you the version of NPM. If you get any error that means
npm is not installed.

## Initialize package.json

Pakcage.json is a file that contains information about your project. We will talk about them in a minute.

First, we need to initialize package.json. Just navigate to your
project folder in your terminal and type the following command.

```bash
npm init
```

It will ask you some questions. You can just answer and hit enter.

If you don't want the questions, you can do this:

```bash
npm init --yes

# or you can do this

npm init -y
```

You will have a package.json file in your project folder. It will look like this if you use default values:

```json
{
	"name": "npm-try", // it will be the name of your project
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"keywords": [],
	"author": "",
	"license": "ISC"
}
```

<!-- If you have no idea about json, You can watch the video on json. -->

<!-- <Iframe /> -->

## Change the default values

You can set default config options for the init command. For example, to set the default author email, author name, and license, on the command line, run the following commands:

```bash
npm set init.author.email "example-user@example.com"
npm set init.author.name "example_user"
npm set init.license "MIT"
```

## Install a package

I am going to install a package called `lodash`. You don't have to
know what lodash is. You can check it out on npmjs.com.

```bash
npm install lodash

# or

npm i lodash
```

```json
{
	"name": "npm-try",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"keywords": [],
	"author": "",
	"license": "ISC",
	"dependencies": {
		"lodash": "^4.17.21"
	}
}
```

You can see that there is a dependency object in package.json. This object contains all the dependencies that you have installed.

Dependency simply means that you have installed a package. There is
another type of dependency called devDependency. We will talk about it in a minute.

The property name is the name of the package. The value is the version
of the package.

You also have a node_modules folder. It contains all the packages that
you have installed. It is huge.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gjog057pyaqlb614rm6v.jpeg)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/00rxhpc1245rdwnspt5g.png)

## How to use a package?

Let's say you have installed lodash. You can use it like this:

```javascript
const lodash = require('lodash')

const randomNum = lodash.random(1, 10)

console.log(randomNum) // 5
```

You can also use es6 import syntax. Just add the following line in your package.json.

```json
{
	"type": "module"
}
```

Then you can use lodash like this:

```javascript
import lodash from 'lodash'

const randomNum = lodash.random(1, 10)

console.log(randomNum) // 2
```

## Remove a package

```bash
npm remove lodash
```

## Reinstalling packages

Let's remove the node_modules folder.

```bash
rm -rf node_modules
```

Now let's reinstall the packages.

```bash
npm install
```

This is helpful when you pull someone else's or your repository from other sources
like GitHub. You wouldn't wanna push them to GitHub. So, you keep
`node_modules` outside your version control like git.

For git, create a `.gitignore` file and add the following line:

```
node_modules/
```

## dependency vs devDependency

| dependency                                                                         | devDependency                                                   |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| A dependency is a package that you have installed that your actual app depends on. | A devDependency is a package that is used for building the app. |
| It will be included in your app.                                                   | It will not be included in your app.                            |
| For example, lodash, express, bootstrap                                            | For instance, nodemon, webpack, gulp                            |

Any package can be installed as dependency or devDependency. It depends on the project that you are building.

## Install devDependency

```bash
npm install --save-dev nodemon gulp
```

You can install multiple packages at once.

```json
{
	"dependencies": {
		"lodash": "^4.17.21"
	},
	"devDependencies": {
		"gulp": "^4.0.2",
		"nodemon": "^2.0.15"
	}
}
```

## Remove devDependency

```bash
npm uninstall --save-dev nodemon gulp
```

## Npm Scripts

Npm scripts are simply a way to define a command that you can run in your terminal.

For example, if you want to run a javascript file with node you will do this,

```bash
node index.js
```

Every time you need to run your file you will have to type the command.
But if you use npm scripts, you can just type the name of the script.

```json
{
	"scripts": {
		"start": "node index.js"
	}
}
```

You can just now run the command like this:

```bash
npm run start
```

It will be much more helpful if the command is too big. For
example,

```bash
eslint . --ext ts --ext tsx --ext js
```

This script will run eslint on all the files in your project. By the
way if you want to learn how to set up eslint then you can watch this
video.

<Iframe id='T-n0mrssDiw' />

Typing this command every time will be painful. Npm scripts make your
life easy.

```json
{
	"scripts": {
		"start": "eslint . --ext ts --ext tsx --ext js"
	}
}
```

Now just run :

```bash
npm run lint
```

You can add multiple scripts.

## Package version

You might have seen a package version like this `^2.21.1`. Let's see what this means.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z2u17z8l5258p11637b8.png)

- Patch release: In this release, some small bugs get fixed. It won't change the API. So, it will not break your code.
- Minor release: In this release, some new features are added. Most probably it will not change the API. So, it will not break your code.
- Major release: Now some major changes are made. API will be changed. So, Most probably your code will break. But that doesn't mean everything will change.

## Let's see the little signs of the package version.

When you install packages from an existing package

- `~`: This will install the package but with the minor patch release. For
  example, if the version is `~1.3.4` in the package.json file and you
  install the package then it will install the latest patch release for
  example `1.3.6`. It will not change minor and major release
  versions.

- `^`: This will install the latest minor and patch release. For
  Example:

From:

```json
{
	"dependencies": {
		"lodash": "^4.16.5"
	}
}
```

To:

```json
{
	"dependencies": {
		"lodash": "^4.17.21"
	}
}
```

- `*`: If you just put `*` in the version then it will install the
  latest version.

```json
{
	"dependencies": {
		"lodash": "*"
	}
}
```

- No sign: If you don't put any sign then it will install the exact version.

## Install a specific version of a package

Just add a `@` sign after the package name and the version number.

```bash
npm install lodash@17.13.0
```

## Update package

```bash
npm update lodash
```

## Npm global packages

We have learned how to install packages locally for our project. But we
can install them globally and it will be available for your whole
system.

A common package is installed globally is the `nodemon` package. It
restart our node sever when we make any changes in our code.

## Install global package

Let's install the `nodemon` package globally.

```bash
npm install -g nodemon

# or

npm i -g nodemon
```

Now you can run the command like this from anywhere:

```bash
nodemon index.js
```

## Remove global package

```bash
npm uninstall -g nodemon
```

## List all package

Local:

```bash
npm list
```

Global:

```bash
npm list -g
```
