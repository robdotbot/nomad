#!/bin/bash
# Encrypted (AES-256) sparse bundle for IDs, insurance and medical records. hdiutil asks for the password.
source "$(dirname "$0")/lib.sh"
v="$NOMAD/NOMAD Vault.sparsebundle"
[[ -e "$v" ]] && { echo "vault already exists: $v"; exit 0; }
say "creating encrypted vault (choose a password you won't lose; it can't be recovered)"
hdiutil create -size 20g -type SPARSEBUNDLE -fs APFS -encryption AES-256 -volname "NOMAD Vault" "$v"
