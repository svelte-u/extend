import type { Options } from "tsup"

export default <Options>{
    "entry": {
        "qrcode": "src/qrcode/index.ts",
        "jwt": "src/jwt/index.ts",
        "idb_keyval": "src/idb_keyval/index.ts",
        "fuse": "src/fuse/index.ts",
        "fcm": "src/fcm/index.ts",
        "change_case": "src/change_case/index.ts",
        "async_validator": "src/async_validator/index.ts"
    },
    "outDir": "./",
    "clean": false,
    "format": [
        "esm"
    ],
    "dts": true,
    "skipNodeModulesBundle": true
}