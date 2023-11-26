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

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
