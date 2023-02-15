import { sleep, unstore } from "@sveu/shared"

import { describe, expect, it } from "vitest"

import { qrcode } from "."

describe("qrcode", () => {
	it("should be defined", () => {
		expect(qrcode).toBeDefined()
	})

	it("should work", async () => {
		const { output, pending, error } = await qrcode("Hello world!")

		expect(unstore(output)).toBe("")
		expect(unstore(pending)).toBe(true)
		expect(unstore(error)).toBe(false)

		await sleep(0.2)

		expect(unstore(output)).not.toBe("")
		expect(unstore(pending)).toBe(false)
		expect(unstore(error)).toBe(false)
	})
})
