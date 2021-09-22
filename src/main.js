import { createApp } from 'vue'
import App from './App.vue'

// Import supabase
import supabase from 'vue-3-supabase'

import routes from './routes';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})


const app = createApp(App)

// Use supabase
app.use(supabase, {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    options: {
        data() {
            href: 'https://v3.vuejs.org/'
        }
    }
})

app.use(router);

app.mount('#app')
