import { HttpAgent } from "@dfinity/agent";
import { atomWithReset } from "jotai/utils";
import { getConfig } from "../config/config";
const {DAO_CANISTER_ID,MANAGE_CANISTER_ID,IC_HOST} = getConfig()
export const iiAgentAtom = atomWithReset<HttpAgent>(
    new HttpAgent({ host: IC_HOST })
);

export const loginLoadingAtom = atomWithReset<boolean>(false)

export const principalAtom = atomWithReset<string>("")
export const accountIdAtom = atomWithReset<string>("")
export const authAtom = atomWithReset<string>("");

export const selectCanisterIDAtom = atomWithReset<string>(DAO_CANISTER_ID)