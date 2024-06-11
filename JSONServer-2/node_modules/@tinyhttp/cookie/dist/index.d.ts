/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 */
export declare function parse(str: string, options?: {
    decode: (str: string) => string;
}): Record<string, string>;
export type SerializeOptions = Partial<{
    encode: (str: string) => string;
    maxAge: number;
    domain: string;
    path: string;
    httpOnly: boolean;
    secure: boolean;
    sameSite: boolean | 'Strict' | 'strict' | 'Lax' | 'lax' | 'None' | 'none' | string;
    expires: Date;
}>;
export declare function serialize(name: string, val: string, opt?: SerializeOptions): string;
//# sourceMappingURL=index.d.ts.map