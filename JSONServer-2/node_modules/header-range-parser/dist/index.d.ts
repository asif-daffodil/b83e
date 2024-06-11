export interface Range {
  end: number;
  start: number;
}
export interface Options {
  /**
   * @description The "combine" option can be set to `true`
   * and overlapping & adjacent ranges
   * will be combined into a single range.
   */
  combine?: boolean;
  /**
   * @description Throw or suppress errors.
   */
  throwError?: boolean;
}
export declare type ResultUnsatisfiable = -1;
export declare type ResultInvalid = -2;
export declare type ResultWrongArgument = -3;
export declare type Result = ResultInvalid | ResultUnsatisfiable | ResultWrongArgument;
export declare const ERROR_INVALID_ARGUMENT: ResultWrongArgument;
export declare const ERROR_STRING_IS_NOT_HEADER: ResultInvalid;
export declare const ERROR_UNSATISFIABLE_RESULT: ResultUnsatisfiable;
export declare class Ranges extends Array<Range> {
  /**
   * @description Header name or type
   */
  type: string;
  /**
   * @description Return plain JavaScript array with 'type' property
   * @returns {Array<Range>}
   */
  toArray(): Array<Range>;
}
/**
 * @description Parse "Range" header `text` relative to the given file `size`.
 * @param {number} size - Size
 * @param {string} header - Header string
 * @param {Options=} options - Options
 * @returns {Ranges|Result}
 * @throws {TypeError}
 */
export declare function parseRange(size: number, header: string, options?: Options): Ranges | Result;
