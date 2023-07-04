# Contributing

Thanks for being interested in contributing to this project!

## Development

### Setup

Clone this repo to your local machine and install the dependencies.

```bash
pnpm install
```

Run the tests to make sure everything is working.

```bash
pnpm test
```

We use [commitizen](https://commitizen-tools.github.io/commitizen/). Installed on your machine.

```bash

pnpm git:add && pnpm commit

```

## Contributing

### Existing functions

Feel free to enhance the existing functions. You can add more tests, more examples, or even more features.

### New functions

There are some notes for adding new functions

- Before you start working, it's better to discuss the function you want to add in [discord](https://discord.gg/nbkcHgDXPc).
- Try to introduce 3rd-party dependencies as this package is aimed to be solving integration between svelte and other libraries.
- If you'd like to add a function that doesn't depends on any 3rd-party libraries, please contribute to [@sveu/actions](https://github.com/svelte-u/actions), [@sveu/browser](https://github.com/svelte-u/browser) or [@sveu/shared](https://github.com/svelte-u/shared).
- Install the 3rd-party library you want to use, `pnpm add -D <library>`.
- Add the package that you just installed to `peerDependencies` and `peerDependenciesMeta` in `package.json`.

    ```json
    {
    "peerDependencies": {
        "<library>": "*"
    },
    "peerDependenciesMeta": {
        "<library>": {
        "optional": true
        }
    }
    }
    ```

- Details explained in the [Function Folder](#function-folder) section.

> Please note you don't need to update packages' `src/index.ts`. It's automatically generated.

## Project Structure

### Function Folder

A function folder typically contains these 2 files:

```bash

index.ts            # function source code itself
index.test.ts       # vitest unit testing

```

for `index.ts` you should export the function with names.

```ts
// DO
export { myFunction }
// Do
export function myFunction() {}
// DON'T
export default myFunction
// DON'T
export default function myFunction() {}
```

## Thanks

Thank you again for being interested in this project! You are awesome!
