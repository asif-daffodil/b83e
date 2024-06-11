import type { TemplateFunction } from "./compile.ts";
import type { Eta } from "./core.ts";
export declare function render<T extends object>(this: Eta, template: string | TemplateFunction, // template name or template function
data: T, meta?: {
    filepath: string;
}): string;
export declare function renderAsync<T extends object>(this: Eta, template: string | TemplateFunction, // template name or template function
data: T, meta?: {
    filepath: string;
}): Promise<string>;
export declare function renderString<T extends object>(this: Eta, template: string, data: T): string;
export declare function renderStringAsync<T extends object>(this: Eta, template: string, data: T): Promise<string>;
//# sourceMappingURL=render.d.ts.map