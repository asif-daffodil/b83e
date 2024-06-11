import { IncomingHttpHeaders, ServerResponse } from 'node:http';

type Request = {
    headers: IncomingHttpHeaders;
};
type Response = Pick<ServerResponse, 'getHeader'>;
/**
 * Class to represent a content type.
 */
declare class ContentType {
    parameters?: Record<string, unknown>;
    type: string;
    constructor(type: string);
}
/**
 * Format object to media type.
 */
declare function format(obj: ContentType): string;
/**
 * Parse media type to object.
 */
declare function parse(string: string | Request | Response): ContentType;

export { format, parse };
