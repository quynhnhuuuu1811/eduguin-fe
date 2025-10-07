export const CHAINS = {
  anvil: {
    chainIdHex: "0x7a69", // 31337
    addParams: {
      chainId: "0x7a69",
      chainName: "Anvil Local",
      nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
      rpcUrls: ["http://127.0.0.1:8545"],
      blockExplorerUrls: [],
    },
  },
  sepolia: {
    chainIdHex: "0xaa36a7",
    addParams: {
      chainId: "0xaa36a7",
      chainName: "Sepolia",
      nativeCurrency: { name: "SepoliaETH", symbol: "ETH", decimals: 18 },
      rpcUrls: ["https://rpc.sepolia.org"],
      blockExplorerUrls: ["https://sepolia.etherscan.io"],
    },
  },
  mainnet: {
    chainIdHex: "0x1",
    addParams: {
      chainId: "0x1",
      chainName: "Ethereum Mainnet",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: ["https://rpc.ankr.com/eth"],
      blockExplorerUrls: ["https://etherscan.io"],
    },
  },
} as const;
export type NetworkKey = keyof typeof CHAINS;

export async function ensureNetwork(which: NetworkKey) {
  const ethereum = (globalThis as any).ethereum;
  if (!ethereum) throw new Error("MetaMask not found");
  const { chainIdHex, addParams } = CHAINS[which];
  try {
    const cur = await ethereum.request({ method: "eth_chainId" });
    if (cur !== chainIdHex) {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }],
      });
    }
  } catch (e: any) {
    if (e?.code === 4902 || String(e?.message || "").includes("Unrecognized")) {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [addParams],
      });
    } else {
      throw e;
    }
  }
}
