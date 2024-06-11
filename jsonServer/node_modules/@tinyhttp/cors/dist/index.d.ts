/// <reference types="node" />
import { IncomingMessage as Request, ServerResponse as Response } from 'http';
export interface AccessControlOptions {
    origin?: string | boolean | ((req: Request, res: Response) => string) | Array<string> | RegExp;
    methods?: string[];
    allowedHeaders?: string[];
    exposedHeaders?: string[];
    credentials?: boolean;
    maxAge?: number;
    optionsSuccessStatus?: number;
    preflightContinue?: boolean;
}
/**
 * CORS Middleware
 */
export declare const cors: (opts?: AccessControlOptions) => (req: Request, res: Response, next?: () => void) => void;
