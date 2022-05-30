import { HttpAgent } from "@dfinity/agent";
import { atomWithReset } from "jotai/utils";

export const iiAgentAtom = atomWithReset<HttpAgent>(
    new HttpAgent({ host: "http://127.0.0.1:8000" })
);

export const loginLoadingAtom = atomWithReset<boolean>(false)

export const principalAtom = atomWithReset<string>("")
export const accountIdAtom = atomWithReset<string>("")
export const authAtom = atomWithReset<string>("");

export const selectCanisterIDAtom = atomWithReset<string>("r7inp-6aaaa-aaaaa-aaabq-cai")