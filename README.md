<p align="center">
<img height="150" src="https://avatars.githubusercontent.com/u/120715197" />

<h3 align="center">Svelte Utility</h3>
<h2 align="center">Write less, Do more</h2>
</p>


<p align="center">
<a href="https://www.npmjs.com/package/@sveu/extend" target="_blank">
    <img src="https://img.shields.io/npm/dm/@sveu/extend?color=50a36f">
</a>

<a href="" target="_blank">
    <img src="https://img.shields.io/static/v1?label=functions&message=100&color=50a36f">
</a>

</p>

---
The key features are:

* **Type Strong ๐ช**: Written in [TypeScript](https://www.typescriptlang.org/), with [TS Docs](https://github.com/microsoft/tsdoc).
* **Fast to code ๐**: Increase the speed to develop features by about 200% to 300%.
* **Fewer bugs ๐**: Reduce about 40% of human (developer) induced errors.
* **SSR Friendly ๐บ**: Works perfectly with server-side.
* **Easy ๐ซ**: Designed to be easy to use and learn. Less time reading docs.
* **Interactive demos ๐** : Documentation of functions also come with interactive demos!.
* **Feature Rich  ๐**: 100+ functions for you to choose from.
* **Fully ๐ณ shakeable**: Only take what you want.

## Installation

```bash
pnpm add -D @sveu/extend
```

## ๐งช Example

```svelte
<script>
 import { fcm } from "@sveu/extend/fcm"
 
 const { token, error, supported, on_message } = fcm(firebase_app, {vapid_key:"my-key",})
 
</script>
```

## ๐ Thanks

This project is heavily inspired by the following awesome projects.

- [vueuse/vueuse](https://github.com/vueuse/vueuse/)
- [rayepps/radash](https://github.com/rayepps/radash)
- [Python](https://python.org)
- [Vue](https://vuejs.org)
## ๐ License

[MIT License](#License) ยฉ 2022-PRESENT [Mohamed Nesredin](https://github.com/mohamed-kaizen)