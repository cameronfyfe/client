import { getEnsRegistryAddress } from './local-settings'
import { useWallet } from './contexts/wallet'
import { chains } from '@eqty/aragon-use-wallet'

const localEnsRegistryAddress = getEnsRegistryAddress()
const DAI_MAINNET_TOKEN_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f'
const DAI_GOERLI_TOKEN_ADDRESS = '0xdc31ee1784292379fbb2964b3b9c4124d8f89c60'

// TODO stop exposing data object [vr 17-09-2021]
// cconnectGraphEndpoint is https://github.com/aragon/connect/tree/master/packages/connect-thegraph
export const networkConfigs = {
  // Polygon - Mainnet
  [chains.getChainInformation(137).type]: {
    isActive: true,
    addresses: {
      ensRegistry:
        localEnsRegistryAddress || '0x3c70a0190d09f34519e6e218364451add21b7d4b',
      governExecutorProxy: null,
      dai: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    },
    nodes: {
      defaultEth: 'wss://mainnet-polygon.aragon.network/ws',
    },
    connectGraphEndpoint: null,
    settings: {
      chainId: 137,
      testnet: false,
      ...chains.getChainInformation(137),
      live: true,
      options: {
        timeout: 30000, // ms
        clientConfig: {
          // Useful if requests are large
          maxReceivedFrameSize: 100000000, // bytes - default: 1MiB
          maxReceivedMessageSize: 100000000, // bytes - default: 8MiB
          // Useful to keep a connection alive
          keepalive: true,
          keepaliveInterval: 60000, // ms
        },
        // Enable auto reconnection
        reconnect: {
          auto: true,
          delay: 5000, // ms
          maxAttempts: 5,
          onTimeout: false,
        },
      },
    },
  },
  // Polygon - Mumbai Testnet
  [chains.getChainInformation(80001).type]: {
    isActive: true,
    addresses: {
      ensRegistry: '0xC0074B3F7C259754e06095fF53f8a5ee734CdA42',
      governExecutorProxy: null,
    },
    nodes: {
      defaultEth:
        'wss://polygon-mumbai.g.alchemy.com/v2/m5gbSveUssSvSdKza3mrYEuq-L4320XE',
    },
    connectGraphEndpoint: null,
    settings: {
      chainId: 80001,
      testnet: true,
      ...chains.getChainInformation(80001),
      live: true,
    },
  },
  // Filecoin - Hyperspace Testnet
  [chains.getChainInformation(3141).type]: {
    isActive: true,
    addresses: {
      ensRegistry: '0x3ef8C4A6F1199f5a4A9C632938B6fCAf6Fb5FC24',
      governExecutorProxy: null,
    },
    nodes: {
      defaultEth:
        'wss://wss.hyperspace.node.glif.io/apigw/lotus/rpc/v1',
    },
    connectGraphEndpoint: null,
    settings: {
      chainId: 3141,
      testnet: true,
      ...chains.getChainInformation(3141),
      live: true,
    },
  },
  unknown: {
    isActive: false,
    addresses: {
      ensRegistry: localEnsRegistryAddress,
      governExecutorProxy: null,
    },
    nodes: {
      defaultEth: 'ws://localhost:8545',
    },
    connectGraphEndpoint: null,
    settings: {
      testnet: true,
      type: 'unknown',
      live: false,
    },
  },
}

export function getNetworkConfig(type) {
  return (
    networkConfigs[type] || {
      ...networkConfigs.unknown,
      settings: {
        ...networkConfigs.unknown.settings,
        name: `Unsupported network (${type})`,
      },
    }
  )
}

export function useNetworkConfig() {
  const { networkType } = useWallet()
  return getNetworkConfig(networkType)
}
