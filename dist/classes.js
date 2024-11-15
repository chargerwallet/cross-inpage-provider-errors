// https://github.com/MetaMask/rpc-errors/blob/main/src/classes.ts
import safeStringify from 'fast-safe-stringify';
/**
 * Error subclass implementing JSON RPC 2.0 errors and Web3 RPC errors
 * per EIP-1474.
 * Permits any integer error code.
 */
export class Web3RpcError extends Error {
    constructor(code, message, data) {
        if (!Number.isInteger(code)) {
            throw new Error('"code" must be an integer.');
        }
        if (!message || typeof message !== 'string') {
            throw new Error('"message" must be a nonempty string.');
        }
        super(message);
        this.code = code;
        if (data !== undefined) {
            this.data = data;
        }
    }
    /**
     * Returns a plain object with all public class properties.
     */
    serialize() {
        const serialized = {
            code: this.code,
            message: this.message,
        };
        if (this.data !== undefined) {
            serialized.data = this.data;
        }
        // TODO read error.stack cause RN hermes app crash
        // if (this.stack) {
        //   serialized.stack = this.stack;
        // }
        return serialized;
    }
    /**
     * Return a string representation of the serialized error, omitting
     * any circular references.
     */
    toString() {
        return safeStringify(this.serialize(), stringifyReplacer, 2);
    }
}
/**
 * Error subclass implementing Web3 Provider errors per EIP-1193.
 * Permits integer error codes in the [ 1000 <= 4999 ] range.
 */
export class Web3ProviderError extends Web3RpcError {
    /**
     * Create an Web3 Provider JSON-RPC error.
     * `code` must be an integer in the 1000 <= 4999 range.
     */
    constructor(code, message, data) {
        if (!isValidWeb3ProviderCode(code)) {
            throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
        }
        super(code, message, data);
    }
}
// Internal
function isValidWeb3ProviderCode(code) {
    return Number.isInteger(code) && code >= 1000 && code <= 4999;
}
function stringifyReplacer(_, value) {
    if (value === '[Circular]') {
        return undefined;
    }
    return value;
}
