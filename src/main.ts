import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import pinia from "./store";

const app = createApp(App);

// 自定义指令
import directives from "@/directives";
Object.entries(directives).forEach(([name, dir]) => app.directive(name, dir));

// 注册配置
app.use(router).use(pinia).use(ElementPlus).mount("#app");
