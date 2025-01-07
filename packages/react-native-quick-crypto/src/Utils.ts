import { Buffer as CraftzdogBuffer } from '@craftzdog/react-native-buffer';
import { Buffer as SafeBuffer } from 'safe-buffer';

import type { KeyUsage } from './keys';
import { type CipherKey } from 'crypto'; // @types/node

export type BufferLike =
  | ArrayBuffer
  | CraftzdogBuffer
  | SafeBuffer
  | ArrayBufferView;
export type BinaryLike =
  | string
  | ArrayBuffer
  | CraftzdogBuffer
  | SafeBuffer
  | TypedArray
  | DataView;
export type BinaryLikeNode = CipherKey | BinaryLike;

export type BinaryToTextEncoding = 'base64' | 'base64url' | 'hex' | 'binary';
export type CharacterEncoding = 'utf8' | 'utf-8' | 'utf16le' | 'latin1';
export type LegacyCharacterEncoding = 'ascii' | 'binary' | 'ucs2' | 'ucs-2';
export type Encoding =
  | BinaryToTextEncoding
  | CharacterEncoding
  | LegacyCharacterEncoding
  | 'buffer';

// These are for shortcomings in @types/node
// Here we use "*Type" instead of "*Types" like node does.
export type CipherType =
  | 'aes128'
  | 'aes192'
  | 'aes256'
  | CipherCBCType
  | CipherCFBType
  | CipherCTRType
  | CipherDESType
  | CipherECBType
  | CipherGCMType
  | CipherOFBType;
export type CipherCBCType = 'aes-128-cbc' | 'aes-192-cbc' | 'aes-256-cbc';
export type CipherCFBType =
  | 'aes-128-cfb'
  | 'aes-192-cfb'
  | 'aes-256-cfb'
  | 'aes-128-cfb1'
  | 'aes-192-cfb1'
  | 'aes-256-cfb1'
  | 'aes-128-cfb8'
  | 'aes-192-cfb8'
  | 'aes-256-cfb8';
export type CipherCTRType = 'aes-128-ctr' | 'aes-192-ctr' | 'aes-256-ctr';
export type CipherDESType =
  | 'des'
  | 'des3'
  | 'des-cbc'
  | 'des-ecb'
  | 'des-ede'
  | 'des-ede-cbc'
  | 'des-ede3'
  | 'des-ede3-cbc';
export type CipherECBType = 'aes-128-ecb' | 'aes-192-ecb' | 'aes-256-ecb';
export type CipherGCMType = 'aes-128-gcm' | 'aes-192-gcm' | 'aes-256-gcm';
export type CipherOFBType = 'aes-128-ofb' | 'aes-192-ofb' | 'aes-256-ofb';

export type TypedArray =
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array
  | Int8Array
  | Int16Array
  | Int32Array
  | Float32Array
  | Float64Array;

export type ABV = TypedArray | DataView | ArrayBufferLike | CraftzdogBuffer;

type DOMName =
  | string
  | {
      name: string;
      cause: unknown;
    };

// Mimics node behavior for default global encoding
let defaultEncoding: Encoding = 'buffer';

export function setDefaultEncoding(encoding: Encoding) {
  defaultEncoding = encoding;
}

export function getDefaultEncoding(): Encoding {
  return defaultEncoding;
}

export const kEmptyObject = Object.freeze(Object.create(null));

// Should be used by Cipher (or any other module that requires valid encodings)
// function slowCases(enc: string) {
//   switch (enc.length) {
//     case 4:
//       if (enc === 'UTF8') return 'utf8';
//       if (enc === 'ucs2' || enc === 'UCS2') return 'utf16le';
//       enc = `${enc}`.toLowerCase();
//       if (enc === 'utf8') return 'utf8';
//       if (enc === 'ucs2') return 'utf16le';
//       break;
//     case 3:
//       if (enc === 'hex' || enc === 'HEX' || `${enc}`.toLowerCase() === 'hex')
//         return 'hex';
//       break;
//     case 5:
//       if (enc === 'ascii') return 'ascii';
//       if (enc === 'ucs-2') return 'utf16le';
//       if (enc === 'UTF-8') return 'utf8';
//       if (enc === 'ASCII') return 'ascii';
//       if (enc === 'UCS-2') return 'utf16le';
//       enc = `${enc}`.toLowerCase();
//       if (enc === 'utf-8') return 'utf8';
//       if (enc === 'ascii') return 'ascii';
//       if (enc === 'ucs-2') return 'utf16le';
//       break;
//     case 6:
//       if (enc === 'base64') return 'base64';
//       if (enc === 'latin1' || enc === 'binary') return 'latin1';
//       if (enc === 'BASE64') return 'base64';
//       if (enc === 'LATIN1' || enc === 'BINARY') return 'latin1';
//       enc = `${enc}`.toLowerCase();
//       if (enc === 'base64') return 'base64';
//       if (enc === 'latin1' || enc === 'binary') return 'latin1';
//       break;
//     case 7:
//       if (
//         enc === 'utf16le' ||
//         enc === 'UTF16LE' ||
//         `${enc}`.toLowerCase() === 'utf16le'
//       )
//         return 'utf16le';
//       break;
//     case 8:
//       if (
//         enc === 'utf-16le' ||
//         enc === 'UTF-16LE' ||
//         `${enc}`.toLowerCase() === 'utf-16le'
//       )
//         return 'utf16le';
//       break;
//     case 9:
//       if (
//         enc === 'base64url' ||
//         enc === 'BASE64URL' ||
//         `${enc}`.toLowerCase() === 'base64url'
//       )
//         return 'base64url';
//       break;
//     default:
//       if (enc === '') return 'utf8';
//   }
// }

// // Return undefined if there is no match.
// // Move the "slow cases" to a separate function to make sure this function gets
// // inlined properly. That prioritizes the common case.
// export function normalizeEncoding(enc?: string) {
//   if (enc == null || enc === 'utf8' || enc === 'utf-8') return 'utf8';
//   return slowCases(enc);
// }

/**
 * Converts supplied argument to an ArrayBuffer.  Note this does not copy the
 * data so it is faster than toArrayBuffer.  Not copying is important for
 * functions like randomFill which need to be able to write to the underlying
 * buffer.
 * @param buf
 * @returns ArrayBuffer
 */
export function abvToArrayBuffer(buffer: ABV): ArrayBuffer {
  if (CraftzdogBuffer.isBuffer(buffer) || ArrayBuffer.isView(buffer)) {
    return buffer.buffer as ArrayBuffer;
  }
  return buffer as ArrayBuffer;
}

/**
 * Converts supplied argument to an ArrayBuffer.  Note this copies data if the
 * supplied buffer has the .slice() method, so can be a bit slow.
 * @param buf
 * @returns ArrayBuffer
 */
export function toArrayBuffer(
  buf: CraftzdogBuffer | SafeBuffer | ArrayBufferView,
): ArrayBuffer {
  if (CraftzdogBuffer.isBuffer(buf) || ArrayBuffer.isView(buf)) {
    if (buf?.buffer?.slice) {
      return buf.buffer.slice(
        buf.byteOffset,
        buf.byteOffset + buf.byteLength,
      ) as ArrayBuffer;
    } else {
      throw new Error('This implementation of buffer does not implement slice');
    }
  }
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = SafeBuffer.isBuffer(buf) ? buf.readUInt8(i) : buf[i]!;
  }
  return ab;
}

export function bufferLikeToArrayBuffer(buf: BufferLike): ArrayBuffer {
  if (CraftzdogBuffer.isBuffer(buf) || SafeBuffer.isBuffer(buf)) {
    return toArrayBuffer(buf);
  }
  if (ArrayBuffer.isView(buf)) {
    return toArrayBuffer(buf);
  }
  return buf;
}

export function binaryLikeToArrayBuffer(
  input: BinaryLikeNode, // CipherKey adds compat with node types
  encoding: string = 'utf-8',
): ArrayBuffer {
  // string
  if (typeof input === 'string') {
    if (encoding === 'buffer') {
      throw new Error(
        'Cannot create a buffer from a string with a buffer encoding',
      );
    }

    const buffer = CraftzdogBuffer.from(input, encoding);

    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength,
    );
  }

  // Buffer
  if (CraftzdogBuffer.isBuffer(input) || SafeBuffer.isBuffer(input)) {
    return toArrayBuffer(input);
  }

  // ArrayBufferView
  // TODO add further binary types to BinaryLike, UInt8Array and so for have this array as property
  if (ArrayBuffer.isView(input)) {
    return toArrayBuffer(input);
  }

  // ArrayBuffer
  if (input instanceof ArrayBuffer) {
    return input;
  }

  // if (!(input instanceof ArrayBuffer)) {
  //   try {
  //     // this is a strange fallback case and input is unknown at this point
  //     const buffer = Buffer.from(input as unknown as string);
  //     return buffer.buffer.slice(
  //       buffer.byteOffset,
  //       buffer.byteOffset + buffer.byteLength
  //     );
  //   } catch(e: unknown) {
  //     console.log('throwing 1');
  //     const err = e as Error;
  //     throw new Error(err.message);
  //   }
  // }

  // TODO: handle if input is KeyObject?

  throw new Error('input could not be converted to ArrayBuffer');
}

export function ab2str(buf: ArrayBuffer, encoding: string = 'hex') {
  return CraftzdogBuffer.from(buf).toString(encoding);
}

export function validateString(str: unknown, name?: string): str is string {
  const isString = typeof str === 'string';
  if (!isString) {
    throw new Error(`${name} is not a string`);
  }
  return isString;
}

export function validateFunction(f: unknown): boolean {
  return f !== null && typeof f === 'function';
}

export function isStringOrBuffer(val: unknown): val is string | ArrayBuffer {
  return (
    typeof val === 'string' ||
    ArrayBuffer.isView(val) ||
    val instanceof ArrayBuffer
  );
}

export function validateObject<T>(
  value: unknown,
  name: string,
  options?: {
    allowArray: boolean;
    allowFunction: boolean;
    nullable: boolean;
  } | null,
): value is T {
  const useDefaultOptions = options == null;
  const allowArray = useDefaultOptions ? false : options.allowArray;
  const allowFunction = useDefaultOptions ? false : options.allowFunction;
  const nullable = useDefaultOptions ? false : options.nullable;
  if (
    (!nullable && value === null) ||
    (!allowArray && Array.isArray(value)) ||
    (typeof value !== 'object' &&
      (!allowFunction || typeof value !== 'function'))
  ) {
    throw new Error(`${name} is not a valid object $${value}`);
  }
  return true;
}

export function validateInt32(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  name: string,
  min = -2147483648,
  max = 2147483647,
) {
  // The defaults for min and max correspond to the limits of 32-bit integers.
  if (typeof value !== 'number') {
    throw new Error(`Invalid argument - ${name} is not a number: ${value}`);
  }
  if (!Number.isInteger(value)) {
    throw new Error(
      `Argument out of range - ${name} out of integer range: ${value}`,
    );
  }
  if (value < min || value > max) {
    throw new Error(
      `Invalid argument - ${name} out of range >= ${min} && <= ${max}: ${value}`,
    );
  }
}

export function validateUint32(
  value: number,
  name: string,
  positive?: boolean,
) {
  if (typeof value !== 'number') {
    // throw new ERR_INVALID_ARG_TYPE(name, 'number', value);
    throw new Error(`Invalid argument - ${name} is not a number: ${value}`);
  }
  if (!Number.isInteger(value)) {
    // throw new ERR_OUT_OF_RANGE(name, 'an integer', value);
    throw new Error(
      `Argument out of range - ${name} out of integer range: ${value}`,
    );
  }
  const min = positive ? 1 : 0;
  // 2 ** 32 === 4294967296
  const max = 4294967295;
  if (value < min || value > max) {
    // throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
    throw new Error(
      `Invalid argument - ${name} out of range >= ${min} && <= ${max}: ${value}`,
    );
  }
}

export function hasAnyNotIn(set: string[], checks: string[]) {
  for (const s of set) {
    if (!checks.includes(s)) {
      return true;
    }
  }
  return false;
}

export function lazyDOMException(message: string, domName: DOMName): Error {
  let cause = '';
  if (typeof domName !== 'string') {
    cause = `\nCaused by: ${domName.cause}`;
  }

  return new Error(`[${domName}]: ${message}${cause}`);
}

// from lib/internal/crypto/util.js

// The maximum buffer size that we'll support in the WebCrypto impl
const kMaxBufferLength = 2 ** 31 - 1;

// // The EC named curves that we currently support via the Web Crypto API.
// const kNamedCurveAliases = {
//   'P-256': 'prime256v1',
//   'P-384': 'secp384r1',
//   'P-521': 'secp521r1',
// };

// const kAesKeyLengths = [128, 192, 256];

// // These are the only hash algorithms we currently support via
// // the Web Crypto API.
// const kHashTypes = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

export const validateMaxBufferLength = (
  data: BinaryLike | BufferLike,
  name: string,
): void => {
  const length =
    typeof data === 'string' || data instanceof SafeBuffer
      ? data.length
      : data.byteLength;
  if (length > kMaxBufferLength) {
    throw lazyDOMException(
      `${name} must be less than ${kMaxBufferLength + 1} bits`,
      'OperationError',
    );
  }
};

export const validateBitLength = (
  length: number,
  name: string,
  required: boolean = false,
) => {
  if (length !== undefined || required) {
    // validateNumber(length, name);
    if (length < 0) throw new Error(`${name} > 0`);
    if (length % 8) {
      throw lazyDOMException(
        `${name}'s length (${length}) must be a multiple of 8`,
        'InvalidArgument',
      );
    }
  }
};

export const validateByteLength = (
  buf: BufferLike,
  name: string,
  target: number,
) => {
  if (
    (SafeBuffer.isBuffer(buf) && buf.length !== target) ||
    (buf as CraftzdogBuffer | ArrayBuffer | ArrayBufferView).byteLength !==
      target
  ) {
    throw lazyDOMException(
      `${name} must contain exactly ${target} bytes`,
      'OperationError',
    );
  }
};

export const getUsagesUnion = (usageSet: KeyUsage[], ...usages: KeyUsage[]) => {
  const newset: KeyUsage[] = [];
  for (let n = 0; n < usages.length; n++) {
    if (!usages[n] || usages[n] === undefined) continue;
    if (usageSet.includes(usages[n] as KeyUsage))
      newset.push(usages[n] as KeyUsage);
  }
  return newset;
};

const kKeyOps: {
  [key in KeyUsage]: number;
} = {
  sign: 1,
  verify: 2,
  encrypt: 3,
  decrypt: 4,
  wrapKey: 5,
  unwrapKey: 6,
  deriveKey: 7,
  deriveBits: 8,
};

export const validateKeyOps = (
  keyOps: KeyUsage[] | undefined,
  usagesSet: KeyUsage[],
) => {
  if (keyOps === undefined) return;
  if (!Array.isArray(keyOps)) {
    throw lazyDOMException('keyData.key_ops', 'InvalidArgument');
  }
  let flags = 0;
  for (let n = 0; n < keyOps.length; n++) {
    const op: KeyUsage = keyOps[n] as KeyUsage;
    const op_flag = kKeyOps[op];
    // Skipping unknown key ops
    if (op_flag === undefined) continue;
    // Have we seen it already? if so, error
    if (flags & (1 << op_flag))
      throw lazyDOMException('Duplicate key operation', 'DataError');
    flags |= 1 << op_flag;

    // TODO(@jasnell): RFC7517 section 4.3 strong recommends validating
    // key usage combinations. Specifically, it says that unrelated key
    // ops SHOULD NOT be used together. We're not yet validating that here.
  }

  if (usagesSet !== undefined) {
    for (const use of usagesSet) {
      if (!keyOps.includes(use)) {
        throw lazyDOMException(
          'Key operations and usage mismatch',
          'DataError',
        );
      }
    }
  }
};

// In WebCrypto, the publicExponent option in RSA is represented as a
// WebIDL "BigInteger"... that is, a Uint8Array that allows an arbitrary
// number of leading zero bits. Our conventional APIs for reading
// an unsigned int from a Buffer are not adequate. The implementation
// here is adapted from the chromium implementation here:
// https://github.com/chromium/chromium/blob/HEAD/third_party/blink/public/platform/web_crypto_algorithm_params.h, but ported to JavaScript
// Returns undefined if the conversion was unsuccessful.
export const bigIntArrayToUnsignedInt = (
  input: Uint8Array,
): number | undefined => {
  let result = 0;

  for (let n = 0; n < input.length; ++n) {
    const n_reversed = input.length - n - 1;
    if (n_reversed >= 4 && input[n]) return; // Too large
    // @ts-expect-error - input[n] is possibly undefined
    result |= input[n] << (8 * n_reversed);
  }

  return result;
};

// TODO: these used to be shipped by crypto-browserify in quickcrypto v0.6
// could instead fetch from OpenSSL if needed and handle breaking changes
export const getHashes = () => [
  'sha1',
  'sha224',
  'sha256',
  'sha384',
  'sha512',
  'md5',
  'rmd160',
  'sha224WithRSAEncryption',
  'RSA-SHA224',
  'sha256WithRSAEncryption',
  'RSA-SHA256',
  'sha384WithRSAEncryption',
  'RSA-SHA384',
  'sha512WithRSAEncryption',
  'RSA-SHA512',
  'RSA-SHA1',
  'ecdsa-with-SHA1',
  'sha256',
  'sha224',
  'sha384',
  'sha512',
  'DSA-SHA',
  'DSA-SHA1',
  'DSA',
  'DSA-WITH-SHA224',
  'DSA-SHA224',
  'DSA-WITH-SHA256',
  'DSA-SHA256',
  'DSA-WITH-SHA384',
  'DSA-SHA384',
  'DSA-WITH-SHA512',
  'DSA-SHA512',
  'DSA-RIPEMD160',
  'ripemd160WithRSA',
  'RSA-RIPEMD160',
  'md5WithRSAEncryption',
  'RSA-MD5',
];

// TODO: these used to be shipped by crypto-browserify in quickcrypto v0.6
// could instead fetch from OpenSSL if needed and handle breaking changes
export const getCiphers = () => [
  'des-ecb',
  'des',
  'des-cbc',
  'des3',
  'des-ede3-cbc',
  'des-ede3',
  'des-ede-cbc',
  'des-ede',
  'aes-128-ecb',
  'aes-192-ecb',
  'aes-256-ecb',
  'aes-128-cbc',
  'aes-192-cbc',
  'aes-256-cbc',
  'aes128',
  'aes192',
  'aes256',
  'aes-128-cfb',
  'aes-192-cfb',
  'aes-256-cfb',
  'aes-128-cfb8',
  'aes-192-cfb8',
  'aes-256-cfb8',
  'aes-128-cfb1',
  'aes-192-cfb1',
  'aes-256-cfb1',
  'aes-128-ofb',
  'aes-192-ofb',
  'aes-256-ofb',
  'aes-128-ctr',
  'aes-192-ctr',
  'aes-256-ctr',
  'aes-128-gcm',
  'aes-192-gcm',
  'aes-256-gcm',
];

export * from './Hashnames';
