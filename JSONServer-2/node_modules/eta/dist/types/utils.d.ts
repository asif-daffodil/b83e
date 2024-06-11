import type { EtaConfig } from "./config.ts";
/**
 * Takes a string within a template and trims it, based on the preceding tag's whitespace control and `config.autoTrim`
 */
export declare function trimWS(str: string, config: EtaConfig, wsLeft: string | false, wsRight?: string | false): string;
/**
 * XML-escapes an input value after converting it to a string
 *
 * @param str - Input value (usually a string)
 * @returns XML-escaped string
 */
export declare function XMLEscape(str: unknown): string;
//# sourceMappingURL=utils.d.ts.map