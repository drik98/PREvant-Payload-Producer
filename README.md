# PREvant Payload Producer

P³ is a highly specialized tool which can be used to produce payload for
[PREvant](https://github.com/aixigo/PREvant)s POST requests

## Requirements

* Node >= v18.17.0 (see [.nvmrc](./.nvmrc))
* pnpm >= 8.1.0

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

This is also necessary because in the postinstall step types will be auto generated from the PREvant openAPI
specs. Moreover the corresponding json schema is also generated from the generated types and will be used to
validate the imported payloads.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

## Production

Build a static site which can be deployed for example with netlify.

```bash
pnpm run generate
```

## Configuration

It is possible to configure the app by providing some environment variables during the build:

| Environment Variable              | Description                                                                                                                                                                                                                                                                                                                                                                 | Default Value                                                            |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| NUXT_DOCKER_IMAGE_BY_SERVICE_NAME | Defines a lookup map for services that will be often deployed. It expects a comma-separated list of colon-separated key value pairs of the service name and the image (without the tag).  The service names will be used as suggestions when entering a service name and when such a service is entered the corresponding docker image will also be automatically selected. | `kafka:docker.io/confluentinc/cp-kafka,prevant:docker.io/aixigo/prevant` |
| NUXT_ENABLE_CONFIG_TO_ENV         | The application offers the possibility to optionally enter a configuration key (e.g. `javax.persistence.jdbc.user`) and it will automatically try to turn it into an environment variable key (e.g. `JAVAX_PERSISTENCE_JDBC_USER`).  See also `NUXT_ENV_CONFIG_PREFIX`.                                                                                                      | `false`                                                                  |
| NUXT_ENV_CONFIG_PREFIX            | As some tools like nuxt expect environment variables to be prefixed you can further use this env variable to add a prefix to the automagically determined  environment variable key (see `NUXT_ENABLE_CONFIG_TO_ENV`).                                                                                                                                                      | `NUXT_`                                                                  |


As you probably noticed each variable has to be prefixed with `NUXT_`. See [nuxt docs](https://nuxt.com/docs/api/composables/use-runtime-config).
