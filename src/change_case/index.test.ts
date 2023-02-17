import type { Options } from "change-case"
import { describe, expect, it } from "vitest"

import { change_case } from "."
import type { ChangeCaseType } from "."

describe("change_case", () => {
	interface objectValue {
		helloWorld: string
		svelteaction: string
	}

	type ObjectTypes = Omit<Record<ChangeCaseType, objectValue>, "camelCase">

	const helloWorld = "helloWorld"

	const svelteaction = "svelte action"

	it("should be defined", () => {
		expect(change_case).toBeDefined()
	})

	it("base", () => {
		const obj: ObjectTypes = {
			capitalCase: {
				helloWorld: "Hello World",
				svelteaction: "Svelte Action",
			},
			constantCase: {
				helloWorld: "HELLO_WORLD",
				svelteaction: "SVELTE_ACTION",
			},
			dotCase: {
				helloWorld: "hello.world",
				svelteaction: "svelte.action",
			},
			headerCase: {
				helloWorld: "Hello-World",
				svelteaction: "Svelte-Action",
			},
			noCase: {
				helloWorld: "hello world",
				svelteaction: "svelte action",
			},
			paramCase: {
				helloWorld: "hello-world",
				svelteaction: "svelte-action",
			},
			pascalCase: {
				helloWorld: "HelloWorld",
				svelteaction: "SvelteAction",
			},
			pathCase: {
				helloWorld: "hello/world",
				svelteaction: "svelte/action",
			},
			sentenceCase: {
				helloWorld: "Hello world",
				svelteaction: "Svelte action",
			},
			snakeCase: {
				helloWorld: "hello_world",
				svelteaction: "svelte_action",
			},
		}
		const arr = Object.keys(obj) as Array<keyof ObjectTypes>
		arr.forEach((key) => {
			const hResult = change_case(helloWorld, key)
			expect(hResult).toBe(obj[key].helloWorld)
			const sResult = change_case(svelteaction, key)
			expect(sResult).toBe(obj[key].svelteaction)
		})
	})

	it("options", () => {
		const options: Options = {
			delimiter: "-",
		}
		const hResult = change_case(helloWorld, "camelCase", options)
		expect(hResult).toBe("hello-World")
		const sResult = change_case(svelteaction, "camelCase", options)
		expect(sResult).toBe("svelte-Action")
	})
})
