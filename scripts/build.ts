import fs from "fs-extra"
import path from "path"

import {
	DIR_SRC,
	DIR_ROOT,
	gitignore,
	list_functions,
	update_package_json,
} from "./utils"

async function run() {
	const functions = await list_functions(DIR_SRC)

	const modules = functions["index"]

	const pkg_exports: Record<string, any> = {}

	const metadata: Record<string, any> = {
		total: modules.length,
		packages: {},
	}

	for (const module of modules) {
		metadata.packages["index"] = modules.map((f) => f.name)
		pkg_exports[`./${module.name}`] = {
			import: `./${module.name}/index.js`,
		}
	}

	await fs.writeFile(
		path.join(DIR_ROOT, "metadata.json"),
		JSON.stringify(metadata, null, 4)
	)

	await update_package_json(pkg_exports)

	await gitignore(metadata.packages["index"])
}

run()
