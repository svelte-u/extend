import { sleep, unstore } from "@sveu/shared"

import { describe, expect, it } from "vitest"

import { async_validator, validator } from "."

describe("validator", async () => {
	it("should be defined", () => {
		expect(validator).toBeDefined()
		expect(async_validator).toBeDefined()
	})

	it("should work with the default validator", async () => {
		const { pass, finished, error_fields, errors, error } = validator(
			{ name: "test" },
			{ name: [{ required: true }] }
		)
		expect(unstore(pass)).toBe(false)

		expect(unstore(finished)).toBe(false)

		await sleep(0.3)

		expect(unstore(pass)).toBe(true)

		expect(unstore(finished)).toBe(true)

		expect(unstore(error_fields)).toBe(undefined)

		expect(unstore(errors)).toBe(undefined)

		expect(unstore(error)).toBe(null)

		const { pass: async_pass } = await async_validator(
			{ name: "test" },
			{ name: [{ required: true }] }
		)

		expect(async_pass).toBe(unstore(pass))
	})
	it("should work with the default validator with error", async () => {
		const { pass, finished, error_fields, errors, error } = validator(
			{ name: "" },
			{ name: [{ required: true }] }
		)

		expect(unstore(pass)).toBe(false)

		expect(unstore(finished)).toBe(false)

		await sleep(0.3)

		expect(unstore(pass)).toBe(false)

		expect(unstore(finished)).toBe(true)

		expect(unstore(error) instanceof Error).toBe(true)

		expect(unstore(error_fields)).toMatchInlineSnapshot(`
			{
			  "name": [
			    {
			      "field": "name",
			      "fieldValue": "",
			      "message": "name is required",
			    },
			  ],
			}
		`)

		expect(unstore(errors)).toMatchInlineSnapshot(`
			[
			  {
			    "field": "name",
			    "fieldValue": "",
			    "message": "name is required",
			  },
			]
		`)

		const {
			pass: async_pass,
			error: async_error,
			errors: async_errors,
			error_fields: async_error_fields,
		} = await async_validator({ name: "" }, { name: [{ required: true }] })

		expect(async_pass).toBe(unstore(pass))

		expect(async_error instanceof Error).toBe(true)

		expect(async_errors).toMatchInlineSnapshot(`
			[
			  {
			    "field": "name",
			    "fieldValue": "",
			    "message": "name is required",
			  },
			]
		`)

		expect(async_error_fields).toMatchInlineSnapshot(`
			{
			  "name": [
			    {
			      "field": "name",
			      "fieldValue": "",
			      "message": "name is required",
			    },
			  ],
			}
		`)
	})
})
