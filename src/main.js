import { createApp } from 'vue'
import App from './App.vue'

// Import supabase
import supabase from 'vue-3-supabase'

const app = createApp(App)

// Use supabase
app.use(supabase, {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    options: {}
})

app.mount('#app')
