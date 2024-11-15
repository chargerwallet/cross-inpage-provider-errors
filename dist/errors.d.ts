import { Web3RpcError, Web3ProviderError } from './classes';
interface Web3ErrorOptions<T> {
    message?: string;
    data?: T;
}
interface ServerErrorOptions<T> extends Web3ErrorOptions<T> {
    code: number;
}
type CustomErrorArg<T> = ServerErrorOptions<T>;
type Web3ErrorsArg<T> = Web3ErrorOptions<T> | string;
export declare const web3Errors: {
    rpc: {
        /**
         * Get a JSON RPC 2.0 Parse (-32700) error.
         */
        parse: <T>(arg?: Web3ErrorsArg<T> | undefined) => Web3RpcError<T>;
        /**
         * Get a JSON RPC 2.0 Invalid Request (-32600) error.
         */
        invalidRequest: <T_1>(arg?: Web3ErrorsArg<T_1> | undefined) => Web3RpcError<T_1>;
        /**
         * Get a JSON RPC 2.0 Invalid Params (-32602) error.
         */
        invalidParams: <T_2>(arg?: Web3ErrorsArg<T_2> | undefined) => Web3RpcError<T_2>;
        /**
         * Get a JSON RPC 2.0 Method Not Found (-32601) error.
         */
        methodNotFound: <T_3>(arg?: Web3ErrorsArg<T_3> | undefined) => Web3RpcError<T_3>;
        /**
         * Get a JSON RPC 2.0 Internal (-32603) error.
         */
        internal: <T_4>(arg?: Web3ErrorsArg<T_4> | undefined) => Web3RpcError<T_4>;
        /**
         * Get a JSON RPC 2.0 Server error.
         * Permits integer error codes in the [ -32099 <= -32005 ] range.
         * Codes -32000 through -32004 are reserved by EIP-1474.
         */
        server: <T_5>(opts: ServerErrorOptions<T_5>) => Web3RpcError<T_5>;
        /**
         * Get an Web3 JSON RPC Invalid Input (-32000) error.
         */
        invalidInput: <T_6>(arg?: Web3ErrorsArg<T_6> | undefined) => Web3RpcError<T_6>;
        /**
         * Get an Web3 JSON RPC Resource Not Found (-32001) error.
         */
        resourceNotFound: <T_7>(arg?: Web3ErrorsArg<T_7> | undefined) => Web3RpcError<T_7>;
        /**
         * Get an Web3 JSON RPC Resource Unavailable (-32002) error.
         */
        resourceUnavailable: <T_8>(arg?: Web3ErrorsArg<T_8> | undefined) => Web3RpcError<T_8>;
        /**
         * Get an Web3 JSON RPC Transaction Rejected (-32003) error.
         */
        transactionRejected: <T_9>(arg?: Web3ErrorsArg<T_9> | undefined) => Web3RpcError<T_9>;
        /**
         * Get an Web3 JSON RPC Method Not Supported (-32004) error.
         */
        methodNotSupported: <T_10>(arg?: Web3ErrorsArg<T_10> | undefined) => Web3RpcError<T_10>;
        /**
         * Get an Web3 JSON RPC Limit Exceeded (-32005) error.
         */
        limitExceeded: <T_11>(arg?: Web3ErrorsArg<T_11> | undefined) => Web3RpcError<T_11>;
    };
    provider: {
        /**
         * Get an Web3 Provider User Rejected Request (4001) error.
         */
        userRejectedRequest: <T_12>(arg?: Web3ErrorsArg<T_12> | undefined) => Web3ProviderError<T_12>;
        /**
         * Get an Web3 Provider Unauthorized (4100) error.
         */
        unauthorized: <T_13>(arg?: Web3ErrorsArg<T_13> | undefined) => Web3ProviderError<T_13>;
        /**
         * Get an Web3 Provider Unsupported Method (4200) error.
         */
        unsupportedMethod: <T_14>(arg?: Web3ErrorsArg<T_14> | undefined) => Web3ProviderError<T_14>;
        /**
         * Get an Web3 Provider Not Connected (4900) error.
         */
        disconnected: <T_15>(arg?: Web3ErrorsArg<T_15> | undefined) => Web3ProviderError<T_15>;
        /**
         * Get an Web3 Provider Chain Not Connected (4901) error.
         */
        chainDisconnected: <T_16>(arg?: Web3ErrorsArg<T_16> | undefined) => Web3ProviderError<T_16>;
        requestTimeout: <T_17>(arg?: Web3ErrorsArg<T_17> | undefined) => Web3ProviderError<T_17>;
        /**
         * Get a custom Web3 Provider error.
         */
        custom: <T_18>(opts: CustomErrorArg<T_18>) => Web3ProviderError<T_18>;
    };
};
export {};
