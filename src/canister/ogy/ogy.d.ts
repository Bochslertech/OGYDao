import type { Principal } from '@dfinity/agent';
export interface Metadata {
  'fee' : bigint,
  'decimals' : number,
  'owner' : Principal,
  'logo' : string,
  'name' : string,
  'totalSupply' : bigint,
  'symbol' : string,
};
export interface TokenInfo {
  'holderNumber' : bigint,
  'deployTime' : bigint,
  'metadata' : Metadata,
  'historySize' : bigint,
  'cycles' : bigint,
  'feeTo' : Principal,
};
export type TxReceipt = { 'Ok' : bigint } |
  {
    'Err' : { 'InsufficientAllowance' : null } |
      { 'InsufficientBalance' : null } |
      { 'ErrorOperationStyle' : null } |
      { 'Unauthorized' : null } |
      { 'LedgerTrap' : null } |
      { 'ErrorTo' : null } |
      { 'Other' : string } |
      { 'BlockUsed' : null } |
      { 'AmountTooSmall' : null }
  };
export default interface _SERVICE {
  'allowance' : (arg_0: Principal, arg_1: Principal) => Promise<bigint>,
  'approve' : (arg_0: Principal, arg_1: bigint) => Promise<TxReceipt>,
  'balanceOf' : (arg_0: Principal) => Promise<bigint>,
  'cleanOutOldAllowances' : () => Promise<bigint>,
  'decimals' : () => Promise<number>,
  'filterAllowancesArray' : (arg_0: bigint) => Promise<
    Array<[Principal, Array<[Principal, [bigint, bigint]]>]>
    >,
  'getASize' : () => Promise<bigint>,
  'getAgeAllowanceLimit' : () => Promise<bigint>,
  'getAllowanceSize' : () => Promise<bigint>,
  'getAllowancesArray' : () => Promise<
    Array<[Principal, Array<[Principal, [bigint, bigint]]>]>
    >,
  'getMaxAllowances' : () => Promise<bigint>,
  'getMetadata' : () => Promise<Metadata>,
  'getResultArrayIndex' : () => Promise<bigint>,
  'getSpendersSize' : () => Promise<bigint>,
  'getTokenFee' : () => Promise<bigint>,
  'getTokenInfo' : () => Promise<TokenInfo>,
  'getUserApprovals' : (arg_0: Principal) => Promise<
    Array<[Principal, bigint]>
    >,
  'historySize' : () => Promise<bigint>,
  'logo' : () => Promise<string>,
  'name' : () => Promise<string>,
  'setAgeAllowanceLimit' : () => Promise<bigint>,
  'setFee' : (arg_0: bigint) => Promise<undefined>,
  'setLogo' : (arg_0: string) => Promise<undefined>,
  'setMaxAllowances' : (arg_0: bigint) => Promise<undefined>,
  'setName' : (arg_0: string) => Promise<undefined>,
  'setOwner' : (arg_0: Principal) => Promise<undefined>,
  'symbol' : () => Promise<string>,
  'totalSupply' : () => Promise<bigint>,
  'transfer' : (arg_0: Principal, arg_1: bigint) => Promise<TxReceipt>,
  'transferFrom' : (
    arg_0: Principal,
    arg_1: Principal,
    arg_2: bigint,
  ) => Promise<TxReceipt>,
};