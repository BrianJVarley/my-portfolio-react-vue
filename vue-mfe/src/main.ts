// Standalone entry — only used when running vue-mfe in isolation (pnpm dev)
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";


const app = createApp(App);
app.use(createPinia()); 
app.mount("#app");