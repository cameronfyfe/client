#/usr/bin/env bash

set -xeu

yarn install --frozen-lockfile

ARAGON_IPFS_GATEWAY='https://ipfs.hypha.coop/ipfs' \
yarn build

echo '
export BUILD_DIR=public
' > .env_build
