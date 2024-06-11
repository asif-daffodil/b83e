export type NormalizedType = {
    value: string;
    quality?: number;
    params: Record<string, string>;
    originalIndex?: number;
};
export declare const normalizeType: (type: string) => NormalizedType;
export declare function acceptParams(str: string, index?: number): NormalizedType;
export declare function normalizeTypes(types: string[]): NormalizedType[];
//# sourceMappingURL=util.d.ts.map