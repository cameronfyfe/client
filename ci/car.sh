#/usr/bin/env bash

set -eu

source .env_build

CAR=ci/build.car

npm i --global ipfs-car

npx ipfs-car \
    --pack $BUILD_DIR \
    --wrapWithDirectory false \
    --verbose \
    --output $CAR \
;

CID=$( \
npx ipfs-car \
    --list-roots \
    $CAR \
)

echo "
export CID=$CID
export CAR=$CAR
" > .env_car
