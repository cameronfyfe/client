#/usr/bin/env bash

set -xeu

source .env_build

CAR=ci/build.car

yarn install --frozen-lockfile

yarn ipfs-car \
    --pack $BUILD_DIR \
    --wrapWithDirectory false \
    --verbose \
    --output $CAR \
;

CID=$( \
yarn ipfs-car \
    --list-roots \
    $CAR \
)

echo "
export CID=$CID
export CAR=$CAR
" > .env_car
