import { Eta as EtaCore } from "./core.ts";
import { readFile, resolvePath } from "./file-handling.ts";
export { EtaError, EtaParseError, EtaRuntimeError, EtaFileResolutionError, EtaNameResolutionError, } from "./err.ts";
export declare class Eta extends EtaCore {
    readFile: typeof readFile;
    resolvePath: typeof resolvePath;
}
//# sourceMappingURL=index.d.ts.map