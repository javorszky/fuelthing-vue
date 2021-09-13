[![Netlify Status](https://api.netlify.com/api/v1/badges/63be1350-b1b4-45f2-9827-2c28b0871ee8/deploy-status)](https://app.netlify.com/sites/fuelthing-vue/deploys)

# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)


## Steps taken to set the project up

Get supabase installed, per https://supabase.io/docs/guides/examples. It uses https://github.com/DidoMarchet/vue-3-supabase, which I installed, added the .env file with the keys, added that to the .gitignore file, and added the code snippets to init supabase into the app changing the hard coded values in the example in the vue-3-supabase docs to the `import.meta.env.VITE_<thing>` as needed.
