import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { StyledButton } from "@/components/buttons";
import { styledAddress } from "./crypto"


export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })
  const walletAddress = address && ensName ? ensName : address;
  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      <StyledButton onClick={() => disconnect()} >{styledAddress(walletAddress)} <span style={{border:'1px solid white', borderRadius:'5px', padding:'0px 2px'}}>Disconnect</span></StyledButton>
    </div>
  )
}