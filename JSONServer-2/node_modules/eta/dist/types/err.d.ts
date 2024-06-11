export declare class EtaError extends Error {
    constructor(message: string);
}
export declare class EtaParseError extends EtaError {
    constructor(message: string);
}
export declare class EtaRuntimeError extends EtaError {
    constructor(message: string);
}
export declare class EtaFileResolutionError extends EtaError {
    constructor(message: string);
}
export declare class EtaNameResolutionError extends EtaError {
    constructor(message: string);
}
/**
 * Throws an EtaError with a nicely formatted error and message showing where in the template the error occurred.
 */
export declare function ParseErr(message: string, str: string, indx: number): never;
export declare function RuntimeErr(originalError: Error, str: string, lineNo: number, path: string): never;
//# sourceMappingURL=err.d.ts.map