import { getEnsRegistryAddress } from './local-settings'
import { useWallet } from './contexts/wallet'
import { chains } from '@eqty/aragon-use-wallet'

const localEnsRegistryAddress = getEnsRegistryAddress()
const DAI_MAINNET_TOKEN_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f'
const DAI_GOERLI_TOKEN_ADDRESS = '0xdc31ee1784292379fbb2964b3b9c4124d8f89c60'

// TODO stop exposing data object [vr 17-09-2021]
// cconnectGraphEndpoint is https://github.com/aragon/connect/tree/master/packages/connect-thegraph


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
