import { getPortisDappId, getFortmaticApiKey } from '../local-settings'

const FORMATIC_KEY = getFortmaticApiKey()
const PORTIS_ID = getPortisDappId()

const chainIds = [
  137, // Polygon - Mainnet
  80001, // Polygon - Mumbai Testnet
  3141, // Hyperspace Testnet
];

export const connectors = [
  {
    id: 'injected',
    properties: {
      chainId: chainIds,
    },
  },
  {
    id: 'frame',
    properties: {
      chainId: 1,
    },
  },
  FORMATIC_KEY
    ? {
        id: 'fortmatic',
        properties: {
          chainId: 1,
          apiKey: FORMATIC_KEY,
        },
      }
    : null,
  PORTIS_ID
    ? {
        id: 'portis',
        properties: {
          dAppId: PORTIS_ID,
          chainId: [1],
        },
      }
    : null,
  {
    id: 'walletconnect',
    properties: {
      chainId: chainIds,
      rpc: {
        '137': 'https://polygon-rpc.com',
        '80001': 'https://rpc-mumbai.maticvigil.com',
      },
    },
  },
].filter(p => p)

// the final data that we pass to use-wallet package.
export const useWalletConnectors = connectors.reduce((current, connector) => {
  current[connector.id] = connector.properties || {}
  return current
}, {})
