import { HttpAgent } from "@dfinity/agent";
import { atomWithReset } from "jotai/utils";

export const iiAgentAtom = atomWithReset<HttpAgent>(
    new HttpAgent({ host: "https://ic0.app" })
);

export const loginLoadingAtom = atomWithReset<boolean>(false)

export const principalAtom = atomWithReset<string>("")
export const accountIdAtom = atomWithReset<string>("")
export const authAtom = atomWithReset<string>("");
