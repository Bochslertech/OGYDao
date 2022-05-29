import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {AuthClient} from "@dfinity/auth-client";
import {Actor, CustomIdentity, HttpAgent} from "@dfinity/agent";
import {accountIdAtom, authAtom, iiAgentAtom, principalAtom} from "../state/auth";
import {useResetAtom} from "jotai/utils";
import { atomWithLocalStorage} from "../atoms/atomWithLocalStorage";
import {IDL} from "@dfinity/candid";
import {principalToAccountIdentifier} from "../utils/principal";

const wl = [
    "ryjl3-tyaaa-aaaaa-aaaba-cai",
    "rsjp2-riaaa-aaaak-aapna-cai",
    "7fuij-vqaaa-aaaao-aabzq-cai",
    "xzxhy-oiaaa-aaaah-qclnq-cai",
]
// @ts-ignore
export const PLUG = window.ic?.plug;
export const connectWalletTypeAtom = atomWithLocalStorage("CONNECT_WALLET_TYPE", {});
export const useWalletConnect = () => {
    const [_iiAgent,setIIAgent] = useAtom(iiAgentAtom);
    const [_auth,setAuth] = useAtom(authAtom);
    const [principal,setPrincipal] = useAtom(principalAtom)
    const [accountId,setAccountId] = useAtom(accountIdAtom)
    const resetAgent = useResetAtom(iiAgentAtom);
    const resetAuth = useResetAtom(authAtom);
    const resetPrincipal = useResetAtom(principalAtom);
    const resetAccountId = useResetAtom(accountIdAtom);
    const [authClient, setAuthClient] = useState<AuthClient|null>(null);
    const [connectWT,setConnectWT] = useAtom(connectWalletTypeAtom)
    const resetWalletType = useResetAtom(connectWalletTypeAtom)

    const handleIIAuthenticated = async (authClient : AuthClient) => {
        const identity : CustomIdentity = authClient.getIdentity();
        const agent = new HttpAgent({ identity, host: "https://ic0.app" });
        setIIAgent(agent);

        const principal = await agent.getPrincipal();
        const principalId = principal.toHex().toLowerCase();
        const signature = (await identity.sign(principal.toUint8Array())).toString(
            "hex"
        );
        const publicKey = identity._inner._publicKey.rawKey.toString("hex");
        setAuth(`${principalId}.${signature}.${publicKey}`);
        setPrincipal(principal.toString());
        setAccountId(principalToAccountIdentifier(principal.toString(),0))
        setConnectWT((s:any) => ({
            ...s,
            ["wallet_type"]: "II",
        }));
    }
    const handlePLUGAuthenticated = async (whitelist:string[]) => {
        if (!PLUG) {
            window.open("https://plugwallet.ooo/", "_blank")
            throw Error("Not installed")
        }
        try {
            let isConnected = await PLUG.isConnected()
            if (!isConnected) {
                await PLUG.requestConnect({whitelist,host:"https://ic0.app"})
            }
            isConnected = await PLUG.isConnected()
            if (isConnected) {
                try {
                    await PLUG.createAgent({whitelist,host:"https://ic0.app"} )
                    if (PLUG.agent) {
                        const principal = await PLUG.getPrincipal()
                        setPrincipal(principal.toString())
                        setAccountId(principalToAccountIdentifier(principal.toString(),0))
                        setConnectWT((s:any) => ({
                            ...s,
                            ["wallet_type"]: "PLUG",
                        }));
                    }

                } catch (e) {
                    console.error(e)
                }
            }

        } catch (e) {
            throw e
        }
    }

    const handleLogin = (walletType:string,whitelist?:string[]) => {
        switch (walletType) {
            case "II":
                (async ()=>{
                    let tmpClient = authClient
                    if (!authClient) {
                        tmpClient  = await AuthClient.create();
                        setAuthClient(tmpClient)
                    }

                    tmpClient?.login({
                        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1e9), // one week
                        onSuccess: () => handleIIAuthenticated(tmpClient as AuthClient),
                    });
                })()

                return
            case "PLUG":
                (async ()=>{
                    await handlePLUGAuthenticated(wl as string[])
                })()
                return
            default:
                return;
        }

    }


    const getActor = async (idlFactory:IDL.InterfaceFactory,canisterId:string)  => {
        switch (connectWT.wallet_type) {
            case "II":
                return Actor.createActor<any>(idlFactory,{
                    agent:_iiAgent,
                    canisterId,
                })

            case "PLUG":
                return await PLUG.createActor({canisterId:canisterId,interfaceFactory:idlFactory})
        }
    }

    const handleLogout = async () => {
        switch (connectWT.wallet_type) {
            case "II":
                await authClient?.logout()
                resetAgent();
                resetAuth();
                resetPrincipal()
                resetAccountId()
                resetWalletType()
                setConnectWT((s:any) => ({

                }));
                return;
            case "PLUG":
                PLUG?.disconnect()
                resetAgent();
                resetAuth();
                resetAccountId()
                resetPrincipal()
                resetWalletType()
                setConnectWT((s:any) => ({

                }));
                return;
        }

    }


    return {getActor,handleLogin,handleLogout,principal,accountId,handlePLUGAuthenticated,handleIIAuthenticated}
}