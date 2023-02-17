import type { Readable } from "svelte/store"

import { to_readable, to_writable } from "@sveu/shared"
import type { Dict } from "@sveu/shared"

import Schema from "async-validator"
import type { Rules, ValidateError, ValidateOption } from "async-validator"

export type AsyncValidatorError = Error & {
	errors: ValidateError[]
	fields: Record<string, ValidateError[]>
}

export interface AsyncValidatorReturn {
	pass: Readable<boolean>

	error_info: Readable<AsyncValidatorError | null>

	finished: Readable<boolean>

	errors: Readable<AsyncValidatorError["errors"] | undefined>

	error_fields: Readable<AsyncValidatorError["fields"] | undefined>
}

/**
 * Wrapper for async-validator.
 *
 * @param value - Value to validate
 *
 * @param rules - [Rules to validate.](https://github.com/yiminghe/async-validator#rules)
 *
 * @param options - [async-validator options.](https://github.com/yiminghe/async-validator#options)
 *
 * @returns
 * - `pass` - Whether the validation passed.
 * - `finished` - Whether the validation has finished.
 * - `error` - Error instance.
 * - `errors` - List of error information.
 * - `error_fields` - Key-value pairs of field names and error information.
 */

export function validator(
	value: Dict,
	rules: Rules,
	options: ValidateOption = {}
) {
	const error = to_writable<AsyncValidatorError | null>(null)

	const finished = to_writable(false)

	const pass = to_writable(false)

	const errors = to_writable<AsyncValidatorError["errors"] | undefined>(
		undefined
	)

	const error_fields = to_writable<AsyncValidatorError["fields"] | undefined>(
		undefined
	)

	async function validate() {
		finished.set(false)

		pass.set(false)

		const validator = new Schema(rules)

		try {
			await validator.validate(value, options)

			pass.set(true)

			error.set(null)

			errors.set(undefined)

			error_fields.set(undefined)
		} catch (_error) {
			const err = _error as AsyncValidatorError

			error.set(err)

			errors.set(err?.errors)

			error_fields.set(err?.fields)
		} finally {
			finished.set(true)
		}
	}

	validate()

	return {
		pass: to_readable(pass),
		finished: to_readable(finished),
		error: to_readable(error),
		errors: to_readable(errors),
		error_fields: to_readable(error_fields),
	}
}

/**
 * The async version of `validator`.
 *
 * @remarks This function is different from `validator` in that it returns a promise and doesn't return readable store.
 *
 * @param value - Value to validate
 *
 * @param rules - [Rules to validate.](https://github.com/yiminghe/async-validator#rules)
 *
 * @param options - [async-validator options.](https://github.com/yiminghe/async-validator#options)
 *
 * @returns
 * - `pass` - Whether the validation passed.
 * - `error` - Error instance.
 * - `errors` - List of error information.
 * - `error_fields` - Key-value pairs of field names and error information.
 *
 */
export async function async_validator(
	value: Dict,
	rules: Rules,
	options: ValidateOption = {}
) {
	const validator = new Schema(rules)

	try {
		await validator.validate(value, options)

		return {
			pass: true,
			error: null,
			errors: undefined,
			error_fields: undefined,
		}
	} catch (_error) {
		const error = _error as AsyncValidatorError

		return {
			pass: false,
			error,
			errors: error?.errors,
			error_fields: error?.fields,
		}
	}
}
