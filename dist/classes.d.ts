export interface SerializedWeb3RpcError {
    code: number;
    message: string;
    data?: unknown;
    stack?: string;
}
/**
 * Error subclass implementing JSON RPC 2.0 errors and Web3 RPC errors
 * per EIP-1474.
 * Permits any integer error code.
 */
export declare class Web3RpcError<T> extends Error {
    code: number;
    data?: T;
    constructor(code: number, message: string, data?: T);
    /**
     * Returns a plain object with all public class properties.
     */
    serialize(): SerializedWeb3RpcError;
    /**
     * Return a string representation of the serialized error, omitting
     * any circular references.
     */
    toString(): string;
}
/**
 * Error subclass implementing Web3 Provider errors per EIP-1193.
 * Permits integer error codes in the [ 1000 <= 4999 ] range.
 */
export declare class Web3ProviderError<T> extends Web3RpcError<T> {
    /**
     * Create an Web3 Provider JSON-RPC error.
     * `code` must be an integer in the 1000 <= 4999 range.
     */
    constructor(code: number, message: string, data?: T);
}
