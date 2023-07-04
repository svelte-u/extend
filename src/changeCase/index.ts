import type { Options } from "change-case"

import * as _changeCase from "./changeCase"

export type ChangeCaseType = keyof typeof _changeCase

/**
 * Wrapper for change-case
 *
 * @param input - Input string
 *
 * @param type - Type of change case
 *
 * @param options - [Change-case options](https://github.com/blakeembrey/change-case#options)
 *
 * @example
 * ```ts
 * const output  = changeCase("Hello world!", "camelCase")
 * ```
 *
 * @returns Changed string
 */
export function changeCase(
	input: string,
	type: ChangeCaseType,
	options?: Options | undefined
) {
	return _changeCase[type](input, options)
}
