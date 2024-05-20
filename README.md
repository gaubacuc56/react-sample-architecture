# React Template 🛡️ ⚛️

A simple, scalable, and powerful architecture for any React applications.

## Core Principles

-   Easy to get started with
-   Simple to understand and maintain
-   Uses the right tools for the job
-   Clean boundaries between different parts of the application
-   Security
-   Performance
-   Scalability in terms of codebase and team size
-   Issues detectable as early as possible

## Installation

### Pre-requisites

1. Node.js v21.xx.
2. Download from [here](https://nodejs.org/en/download/) or use nvm.

### How to run

1. Clone the repo:

```bash
git clone https://github.com/gaubacuc56/react-sample-architecture.git
git checkout master
```

2. Install project's dependencies and libraries:

```bash
npm install
```

3. Start application:

```bash
npm start
```

## Folder structure

```
src\
+---app-core            # global configurations
+---assets              # assets folder can contain all the static files such as css, images, fonts, etc.
+---config              # app configurations such as env, routes, sidebar, etc.
+---constant            # app constants such as definition of navigation, route, etc.
+---layout              # determines how template are arranged together to form a page or section of the application.
+---libs                # reusable libraries preconfigured for the application.
|   +---components      # base on Atomic desgin pattern.
|   |   +---shared      # combine atoms together to form components with specific functions (Molecules).
|   |   +---template    # independent interfaces capable of operating independently, consisting of Molecules and Atoms.
|   |   +---ui (atoms)  # most basic UI components and cannot be divided into smaller parts (Atoms).
|   +---dtos            # models of api's request & response.
|   +---features        # feature's data storage and api services.
|   +---hooks           # shared hooks used across the entire application
|   +---translation     # i18next dictionary
|   +---utils
|       +---helper      # shared utility functions
|       +---hoc         # app hoc component
+---pages               # application specific pages
```
