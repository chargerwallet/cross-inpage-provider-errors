import { Web3RpcError, Web3ProviderError } from './classes';
import { getMessageFromCode } from './utils';
import { errorCodes } from './error-constants';
export const web3Errors = {
    rpc: {
        /**
         * Get a JSON RPC 2.0 Parse (-32700) error.
         */
        parse: (arg) => getWeb3JsonRpcError(errorCodes.rpc.parse, arg),
        /**
         * Get a JSON RPC 2.0 Invalid Request (-32600) error.
         */
        invalidRequest: (arg) => getWeb3JsonRpcError(errorCodes.rpc.invalidRequest, arg),
        /**
         * Get a JSON RPC 2.0 Invalid Params (-32602) error.
         */
        invalidParams: (arg) => getWeb3JsonRpcError(errorCodes.rpc.invalidParams, arg),
        /**
         * Get a JSON RPC 2.0 Method Not Found (-32601) error.
         */
        methodNotFound: (arg) => getWeb3JsonRpcError(errorCodes.rpc.methodNotFound, arg),
        /**
         * Get a JSON RPC 2.0 Internal (-32603) error.
         */
        internal: (arg) => getWeb3JsonRpcError(errorCodes.rpc.internal, arg),
        /**
         * Get a JSON RPC 2.0 Server error.
         * Permits integer error codes in the [ -32099 <= -32005 ] range.
         * Codes -32000 through -32004 are reserved by EIP-1474.
         */
        server: (opts) => {
            if (!opts || typeof opts !== 'object' || Array.isArray(opts)) {
                throw new Error('Web3 RPC Server errors must provide single object argument.');
            }
            const { code } = opts;
            if (!Number.isInteger(code) || code > -32005 || code < -32099) {
                throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
            }
            return getWeb3JsonRpcError(code, opts);
        },
        /**
         * Get an Web3 JSON RPC Invalid Input (-32000) error.
         */
        invalidInput: (arg) => getWeb3JsonRpcError(errorCodes.rpc.invalidInput, arg),
        /**
         * Get an Web3 JSON RPC Resource Not Found (-32001) error.
         */
        resourceNotFound: (arg) => getWeb3JsonRpcError(errorCodes.rpc.resourceNotFound, arg),
        /**
         * Get an Web3 JSON RPC Resource Unavailable (-32002) error.
         */
        resourceUnavailable: (arg) => getWeb3JsonRpcError(errorCodes.rpc.resourceUnavailable, arg),
        /**
         * Get an Web3 JSON RPC Transaction Rejected (-32003) error.
         */
        transactionRejected: (arg) => getWeb3JsonRpcError(errorCodes.rpc.transactionRejected, arg),
        /**
         * Get an Web3 JSON RPC Method Not Supported (-32004) error.
         */
        methodNotSupported: (arg) => getWeb3JsonRpcError(errorCodes.rpc.methodNotSupported, arg),
        /**
         * Get an Web3 JSON RPC Limit Exceeded (-32005) error.
         */
        limitExceeded: (arg) => getWeb3JsonRpcError(errorCodes.rpc.limitExceeded, arg),
    },
    provider: {
        /**
         * Get an Web3 Provider User Rejected Request (4001) error.
         */
        userRejectedRequest: (arg) => {
            return getWeb3ProviderError(errorCodes.provider.userRejectedRequest, arg);
        },
        /**
         * Get an Web3 Provider Unauthorized (4100) error.
         */
        unauthorized: (arg) => {
            return getWeb3ProviderError(errorCodes.provider.unauthorized, arg);
        },
        /**
         * Get an Web3 Provider Unsupported Method (4200) error.
         */
        unsupportedMethod: (arg) => {
            return getWeb3ProviderError(errorCodes.provider.unsupportedMethod, arg);
        },
        /**
         * Get an Web3 Provider Not Connected (4900) error.
         */
        disconnected: (arg) => {
            return getWeb3ProviderError(errorCodes.provider.disconnected, arg);
        },
        /**
         * Get an Web3 Provider Chain Not Connected (4901) error.
         */
        chainDisconnected: (arg) => {
            return getWeb3ProviderError(errorCodes.provider.chainDisconnected, arg);
        },
        requestTimeout: (arg) => {
            return getWeb3ProviderError(errorCodes.provider.requestTimeout, arg);
        },
        /**
         * Get a custom Web3 Provider error.
         */
        custom: (opts) => {
            if (!opts || typeof opts !== 'object' || Array.isArray(opts)) {
                throw new Error('Web3 Provider custom errors must provide single object argument.');
            }
            const { code, message, data } = opts;
            if (!message || typeof message !== 'string') {
                throw new Error('"message" must be a nonempty string');
            }
            return new Web3ProviderError(code, message, data);
        },
    },
};
// Internal
function getWeb3JsonRpcError(code, arg) {
    const [message, data] = parseOpts(arg);
    return new Web3RpcError(code, message || getMessageFromCode(code), data);
}
function getWeb3ProviderError(code, arg) {
    const [message, data] = parseOpts(arg);
    return new Web3ProviderError(code, message || getMessageFromCode(code), data);
}
function parseOpts(arg) {
    if (arg) {
        if (typeof arg === 'string') {
            return [arg];
        }
        else if (typeof arg === 'object' && !Array.isArray(arg)) {
            const { message, data } = arg;
            if (message && typeof message !== 'string') {
                throw new Error('Must specify string message.');
            }
            return [message || undefined, data];
        }
    }
    return [];
}
