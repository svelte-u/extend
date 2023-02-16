import { sleep, unstore } from "@sveu/shared"

import { get, set } from "idb-keyval"
import { beforeEach, describe, expect, it, vitest } from "vitest"

import { idb } from "."

const cache = {} as any

vitest.mock("idb-keyval", () => ({
	get: (key: string) => Promise.resolve(cache[key]),

	set: (key: string, value: any) =>
		new Promise((resolve, reject) => {
			if (value === "error") {
				reject(new Error("set error"))
				return
			}

			cache[key] = value

			resolve(undefined)
		}),

	update: (key: string, updater: () => any) =>
		new Promise((resolve, reject) => {
			const value = updater()
			if (value === "error") {
				reject(new Error("update error"))
				return
			}

			cache[key] = value

			resolve(undefined)
		}),
	del: (key: string) => {
		delete cache[key]
	},
}))

const KEY1 = "idb-keyval-1"
const KEY2 = "idb-keyval-2"
const KEY3 = "idb-keyval-3"

describe("idb_keyval", () => {
	beforeEach(() => {
		console.error = vitest.fn()
	})

	set(KEY3, "hello")

	const data1 = idb(KEY1, { count: 0 })
	const data2 = idb(KEY2, ["foo", "bar"])
	const data3 = idb(KEY3, "world")

	it("should be defined", () => {
		expect(idb).toBeDefined()
	})
	it("get/set", async () => {
		expect(unstore(data1)).toEqual({ count: 0 })

		expect(unstore(data2)).toEqual(["foo", "bar"])

		expect(unstore(data3)).toEqual("hello")

		await sleep(0.05)

		expect(await get(KEY1)).toEqual(unstore(data1))

		expect(await get(KEY2)).toEqual(unstore(data2))

		expect(await get(KEY3)).toEqual(unstore(data3))
	})

	it("update", async () => {
		data1.set({ count: 1 })

		data2.set(["foo", "bar", "baz"])

		data3.set("world")

		await sleep(0.05)

		expect(await get(KEY1)).toEqual(unstore(data1))

		expect(await get(KEY2)).toEqual(unstore(data2))

		expect(await get(KEY3)).toEqual(unstore(data3))
	})

	it("update error", async () => {
		data1.set("error")

		data2.set("error")

		data3.set("error")

		await sleep(0.05)

		expect(console.error).toHaveBeenCalledTimes(3)
	})

	it("delete", async () => {
		data1.set(null)

		data2.set(null)

		data3.set(null)

		await sleep(0.05)

		expect(await get(KEY1)).toBeUndefined()

		expect(await get(KEY2)).toBeUndefined()

		expect(await get(KEY3)).toBeUndefined()
	})

	it("on_error", async () => {
		const data = idb(
			KEY1,
			{ count: 0 },
			{
				on_error: (e) => {
					expect(e).toBeInstanceOf(Error)
				},
			}
		)

		data.set("error")

		await sleep(0.05)

		expect(console.error).toHaveBeenCalledTimes(0)
	})
})
