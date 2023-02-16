import type { Options } from "tsup"

export default <Options>{
    "entry": {
        "qrcode": "src/qrcode/index.ts",
        "jwt": "src/jwt/index.ts",
        "idb_keyval": "src/idb_keyval/index.ts"
    },
    "outDir": "./",
    "clean": false,
    "format": [
        "esm"
    ],
    "dts": true,
    "skipNodeModulesBundle": true
}