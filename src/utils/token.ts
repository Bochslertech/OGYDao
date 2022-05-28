import { Principal } from '@dfinity/principal'
import { from32bits, to32bits } from './bit'
import { toHexString } from './hex'
import {Buffer} from "buffer";

const padding = new Buffer('\x0Atid')

export const tokenIdentifier = (principal: string, index: number): string => {
  // @ts-ignore
  const array = new Uint8Array([...padding, ...Principal.fromText(principal).toUint8Array(), ...to32bits(index)])
  return Principal.fromUint8Array(array).toText()
}

export const decodeTokenId = (tid: string) => {
  // @ts-ignore
  var p = [...Principal.fromText(tid).toUint8Array()]
  var _padding = p.splice(0, 4)
  if (toHexString(new Uint8Array(_padding)) !== toHexString(padding)) {
    return {
      tokenIndex: 0,
      canisterId: tid,
      token: tokenIdentifier(tid, 0),
    }
  } else {
    return {
      tokenIndex: from32bits(p.splice(-4)),
      canisterId: Principal.fromUint8Array(new Uint8Array(p)).toText(),
      token: tid,
    }
  }
}

export const tokenUrl = (canisterId: string, index: number): string => {
  const tid = tokenIdentifier(canisterId,index)
  return "https://"+canisterId+".raw.ic0.app/?tokenid=" + tid
}

