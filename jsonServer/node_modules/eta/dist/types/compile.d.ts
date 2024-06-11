import type { Eta } from "./core.ts";
import type { Options } from "./config.ts";
export type TemplateFunction = (this: Eta, data?: object, options?: Partial<Options>) => string;
/**
 * Takes a template string and returns a template function that can be called with (data, config)
 *
 * @param str - The template string
 * @param config - A custom configuration object (optional)
 */
export declare function compile(this: Eta, str: string, options?: Partial<Options>): TemplateFunction;
//# sourceMappingURL=compile.d.ts.map