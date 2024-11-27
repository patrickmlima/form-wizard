# form-wizard
An adaptable form wizard in React.

The form wizard handle steps that can be easily defined as well as a review page. All the progress is stored on local storage, so if the user refreshes the page, no data are lost.

Trying to make it easily extensible, the steps components are injected with a validation function that receives both the current step data and all the form data, so you can cross-validate fields that depends on previous steps values.

This project is a mono-repo composed by:
> backend

folder that gathers the mini service that stores the form data

> form-page

frontend application that shows the created component in action

> slight-form-wizard

Created component that is a form wizard using react

## Dependencies

This project have as dependencies:
- NodeJS >= 22
- NPM >= 10
- Docker CE >= 27

## Setup

In order to run this project you will need to create some files first:

1. Create a .env file into the folder `backend/environments` according to the environment you are going to run (development|production, for example). So you will have something like:
`backend/environments/.env.development`

2. Create a .env into the folder `form-page`. This one is called just `.env`, nothing else.

The variables you need to put on those files can be found on the `.env.example` in their respective folders.

## Running this project

### Just run

You can run this project directly as a docker compose stack, so you don't have to install anything in your machine. To do it, you just need to run

```bash
docker compose up --build
```

This will build the container images and run them. You can access check if the application is running through the URLs:

Frontend: `http://localhost:3200`
Backend docs: `http://localhost:3000/api/spec/#/`

### Development

In order to setup and run this project for development purposes you need, after cloning it, install dependencies inside each of the projects folders.

Once it can be boring, I already create an script to do it, so you just need to run:
```bash
./scripts/prepare-dev.sh
```

This will build the `slight-form-wizard` component and install all the project dependencies.

### Building the form wizard component

If you want to just build the slight-form-wizard component, you just need to go into its folder, install the dependencies (if you have not done it yet), build it and pack using npm, like:

```bash
cd slight-form-wizard && \
npm install && \
npm run build && \
npm pack
```

Those commands will generate a `.tgz` file that can be used for install the component into other applications.
