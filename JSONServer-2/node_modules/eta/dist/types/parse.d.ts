import type { Eta } from "./core.ts";
export type TagType = "r" | "e" | "i" | "";
export interface TemplateObject {
    t: TagType;
    val: string;
    lineNo?: number;
}
export type AstObject = string | TemplateObject;
export declare function parse(this: Eta, str: string): Array<AstObject>;
//# sourceMappingURL=parse.d.ts.map