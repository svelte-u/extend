import type { Options } from "tsup"

export default <Options>{
    "entry": {
        "qrcode": "src/qrcode/index.ts",
        "jwt": "src/jwt/index.ts",
        "fuse": "src/fuse/index.ts",
        "fcm": "src/fcm/index.ts",
        "sortable": "src/sortable/index.ts",
        "changeCase": "src/changeCase/index.ts",
        "idbKeyval": "src/idbKeyval/index.ts"
    },
    "outDir": "./",
    "clean": false,
    "format": [
        "esm"
    ],
    "dts": true,
    "skipNodeModulesBundle": true
}