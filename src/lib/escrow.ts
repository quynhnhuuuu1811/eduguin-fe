import { ethers } from "ethers";

export const ESCROW_ABI = [
  "function feeBps() view returns (uint256)",
  "function fund(uint256 sessionId, address tutor) payable",
  "function release(uint256 sessionId)",
  "function refund(uint256 sessionId)",
] as const;

export function getProvider() {
  const { ethereum } = globalThis as any;
  if (!ethereum) throw new Error("MetaMask not found");
  return new ethers.BrowserProvider(ethereum);
}

export async function getSignerAddress() {
  const provider = getProvider();
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  return signer.getAddress();
}

export async function getEscrowContract(address: string) {
  const provider = getProvider();
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  return new ethers.Contract(address, ESCROW_ABI, signer);
}
