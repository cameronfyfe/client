{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = inputs @ { self, ... }:
    (inputs.flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let

        pkgs = import inputs.nixpkgs {
          inherit system;
        };

        nodeAndYarn = nodejs: [ nodejs (pkgs.yarn.override { inherit nodejs; }) ];

        nodeAndYarn16 = nodeAndYarn pkgs.nodejs-16_x;

      in
      rec {

        devShells = {
          default = pkgs.mkShell {
            buildInputs = nodeAndYarn16 ++ (with pkgs; [
              curl
              python3
            ]);
          };
        };

      }));
}
