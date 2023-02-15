import fs from "fs-extra"
import path from "path"

import tsup from "../tsup.config"
import { DIR_ROOT, DIR_SRC, list_functions, update_package_json } from "./utils"

async function run() {
	const functions = await list_functions(DIR_SRC)

	const modules = functions["index"]

	const pkg_exports: Record<string, any> = {}

	const metadata: Record<string, any> = {
		total: modules.length,
		packages: [],
	}

	for (const module of modules) {
		metadata.packages = [...metadata.packages, module.name]
		pkg_exports[`./${module.name}`] = {
			import: `./${module.name}.js`,
		}
		// @ts-expect-error it's fine
		tsup.entry[module.name] = path.join("src", module.name, "index.ts")
	}

	await fs.writeFile(
		path.join(DIR_ROOT, "tsup.config.ts"),
		`import type { Options } from "tsup"

export default <Options>${JSON.stringify(tsup, null, 4)}`
	)

	await fs.writeFile(
		path.join(DIR_ROOT, "metadata.json"),
		JSON.stringify(metadata, null, 4)
	)

	await update_package_json(pkg_exports)
}

run()
