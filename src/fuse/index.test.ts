import { describe, expect, it } from "vitest"

import { fuse } from "."

describe("fuse", () => {
	it("should be defined", () => {
		expect(fuse).toBeDefined()
	})

	it("basic", () => {
		const data = [{ name: "foo" }, { name: "bar" }, { name: "baz" }]

		const { results } = fuse("foo", data, {
			fuseOptions: {
				keys: ["name"],
			},
		})

		expect(results).toEqual([
			{
				item: { name: "foo" },
				refIndex: 0,
			},
		])
	})

	it("limit", () => {
		const data = [{ name: "foo" }, { name: "bar" }, { name: "baz" }]

		const { results } = fuse("bar", data, {
			fuseOptions: {
				keys: ["name"],
			},
			limit: 2,
		})
		expect(results).toEqual([
			{
				item: { name: "bar" },
				refIndex: 1,
			},
			{
				item: { name: "baz" },
				refIndex: 2,
			},
		])
	})

	it("match_when_empty", () => {
		const data = [{ name: "foo" }, { name: "bar" }, { name: "baz" }]

		const { results } = fuse("", data, {
			fuseOptions: {
				keys: ["name"],
			},
			matchWhenEmpty: true,
		})

		expect(results).toEqual([
			{
				item: { name: "foo" },
				refIndex: 0,
			},
			{
				item: { name: "bar" },
				refIndex: 1,
			},
			{
				item: { name: "baz" },
				refIndex: 2,
			},
		])
	})
})
