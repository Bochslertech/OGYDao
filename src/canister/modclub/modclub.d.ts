import type { Principal } from '@dfinity/agent';
export interface ChallengeResponse {
  'status' : PohChallengeStatus,
  'completedOn' : [] | [bigint],
  'challengeId' : string,
};
export type CheckStatusError = { 'principalBlacklisted' : null } |
  { 'pending' : null } |
  { 'whitelistIsFull' : null } |
  { 'alreadyWhitelisted' : null } |
  { 'noTokenFound' : null } |
  { 'notFirstAssociation' : null } |
  { 'pohNotCompleted' : null } |
  { 'pohRejected' : null };
export type PohChallengeStatus = { 'notSubmitted' : null } |
  { 'verified' : null } |
  { 'expired' : null } |
  { 'pending' : null } |
  { 'rejected' : null };
export interface PohVerificationResponsePlus {
  'status' : PohVerificationStatus,
  'completedAt' : [] | [bigint],
  'token' : [] | [string],
  'rejectionReasons' : Array<string>,
  'submittedAt' : [] | [bigint],
  'isFirstAssociation' : boolean,
  'providerId' : Principal,
  'challenges' : Array<ChallengeResponse>,
  'requestedAt' : [] | [bigint],
  'providerUserId' : string,
};
export type PohVerificationStatus = { 'notSubmitted' : null } |
  { 'verified' : null } |
  { 'expired' : null } |
  { 'pending' : null } |
  { 'startPoh' : null } |
  { 'rejected' : null };
export type Result = { 'ok' : null } |
  { 'err' : CheckStatusError };
export default interface _SERVICE {
  'callback' : (arg_0: PohVerificationResponsePlus) => Promise<undefined>,
  'checkStatus' : () => Promise<Result>,
  'getBlacklist' : () => Promise<Array<Principal>>,
  'getPending' : () => Promise<Array<Principal>>,
  'getPendingQuery' : () => Promise<Array<Principal>>,
  'getQueue' : () => Promise<Array<[Principal, string]>>,
  'getQueueQuery' : () => Promise<Array<[Principal, string]>>,
  'getToken' : () => Promise<[] | [string]>,
  'getWhitelist' : () => Promise<Array<Principal>>,
  'isBlacklistedQuery' : (arg_0: Principal) => Promise<boolean>,
  'isPending' : (arg_0: Principal) => Promise<boolean>,
  'isPendingQuery' : (arg_0: Principal) => Promise<boolean>,
  'isQueued' : (arg_0: Principal) => Promise<boolean>,
  'isQueuedQuery' : (arg_0: Principal) => Promise<boolean>,
  'isWhitelisted' : (arg_0: Principal) => Promise<boolean>,
  'isWhitelistedQuery' : (arg_0: Principal) => Promise<boolean>,
  'registryCallback' : () => Promise<undefined>,
  'whitelistIsFull' : () => Promise<boolean>,
};