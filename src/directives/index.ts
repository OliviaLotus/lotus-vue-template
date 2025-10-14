import type { Directive } from "vue";

const modules = import.meta.glob<{ [k: string]: Directive }>("./*/index.ts", {
  eager: true
});

const directives: Record<string, Directive> = {};

Object.values(modules).forEach(mod => {
  Object.assign(directives, mod as Record<string, Directive>); // 每个 mod 默认 export 指令常量
});

export default directives;
