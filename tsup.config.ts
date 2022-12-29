import type { Options } from "tsup"

export default <Options>{
	entry: ["src/**/*.ts"],

	outDir: "./",

	clean: false,

	format: ["esm"],

	dts: true,

	skipNodeModulesBundle: true,
}
