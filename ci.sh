#!/usr/bin/env bash

ci/build.sh

source .env_build

ci/car.sh

source .env_car

# ci/dns_he.sh

ci/web3storage.sh