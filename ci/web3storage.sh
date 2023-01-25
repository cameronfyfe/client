#/usr/bin/env bash

set -eu

source .env_car

curl -X POST \
    'https://api.web3.storage/car' \
    -H 'accept: application/json' \
    -H "Authorization: Bearer $WEB3Token" \
    -H 'Content-Type: application/vnd.ipld.car' \
    -o 'ci/webstorage-response.txt' \
    --data-binary '@ci/build.car' \
;

cat ci/webstorage-response.txt
