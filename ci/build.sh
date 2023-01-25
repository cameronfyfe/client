#/usr/bin/env bash

set -eu

yarn install --frozen-lockfile

yarn build

echo '
export BUILD_DIR=public
' > .env_build
