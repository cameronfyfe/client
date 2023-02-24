#!/usr/bin/env bash

set -xeu

source .env_car

curl \
    -4 \
    "https://_dnslink.$HOSTNAME:$HEPASSWORD@dyn.dns.he.net/nic/update" \
    -d "hostname=_dnslink.$HOSTNAME" \
    -d "txt=dnslink=/ipfs/$CID" \
;
