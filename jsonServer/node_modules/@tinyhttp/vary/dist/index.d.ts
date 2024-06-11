import { ServerResponse } from 'node:http';

declare function append(header: string, field: string | string[]): string;
/**
 * Mark that a request is varied on a header field.
 */
declare function vary(res: ServerResponse, field: string | string[]): void;

export { append, vary };
