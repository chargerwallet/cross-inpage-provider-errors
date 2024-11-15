"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3ProviderError = exports.Web3RpcError = void 0;
// https://github.com/MetaMask/rpc-errors/blob/main/src/classes.ts
const fast_safe_stringify_1 = __importDefault(require("fast-safe-stringify"));
/**
 * Error subclass implementing JSON RPC 2.0 errors and Web3 RPC errors
 * per EIP-1474.
 * Permits any integer error code.
 */
class Web3RpcError extends Error {
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
        return (0, fast_safe_stringify_1.default)(this.serialize(), stringifyReplacer, 2);
    }
}
exports.Web3RpcError = Web3RpcError;
/**
 * Error subclass implementing Web3 Provider errors per EIP-1193.
 * Permits integer error codes in the [ 1000 <= 4999 ] range.
 */
class Web3ProviderError extends Web3RpcError {
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
exports.Web3ProviderError = Web3ProviderError;
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
