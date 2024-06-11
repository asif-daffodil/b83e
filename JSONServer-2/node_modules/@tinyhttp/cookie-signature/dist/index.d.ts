/**
 * Sign the given `val` with `secret`.
 */
export declare const sign: (val: string, secret: string) => string;
/**
 * Unsign and decode the given `val` with `secret`,
 * returning `false` if the signature is invalid.
 */
export declare const unsign: (val: string, secret: string) => string | false;
//# sourceMappingURL=index.d.ts.map