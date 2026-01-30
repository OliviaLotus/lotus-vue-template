import { createApp, type Directive } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import pinia from "./store";

const app = createApp(App);

// 自定义指令
import * as directives from "@/directives";

Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});
// 注册配置
app.use(router).use(pinia).use(ElementPlus).mount("#app");
