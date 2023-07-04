import { browser, type, watchable } from "@sveu/shared"

import { del, get, set, update } from "idb-keyval"

export interface IDBOptions {
	/**
	 * On error callback
	 *
	 * Default log error to `console.error`
	 */
	onError?: (error: unknown) => void
}

/**
 * Wrapper around idb-keyval.
 *
 * @param key - The key to store the value under.
 *
 * @param value - The value to store. If store have already been initialized, this value will be ignored.
 *
 * @param options - Options
 * - onError - On error callback
 *
 * @example
 * ```ts
 * const store = idb("key", "value")
 *
 * const store = idb("key")
 *
 * const store = idb("key", null, {
 * 	onError: (e) => {
 * 		console.error(e)
 * 	}
 * })
 * ```
 * @returns A store of the value.
 */
export function idb(key: string, value?: any, options: IDBOptions = {}) {
	const {
		onError = (e) => {
			console.error(e)
		},
	} = options

	const data = watchable(value, async (_, n) => await write(n))

	async function read() {
		try {
			const _value = await get(key)

			if (_value === undefined) {
				if (value !== undefined && value !== null) await set(key, value)
			} else data.set(_value)
		} catch (e) {
			onError(e)
		}
	}

	if (browser) read()

	async function write(new_data: any) {
		try {
			if (new_data === null) {
				await del(key)
			} else {
				if (type(new_data) === "array")
					await update(key, () =>
						JSON.parse(JSON.stringify(new_data))
					)
				else if (type(new_data) === "object")
					await update(key, () => ({ ...new_data }))
				else await update(key, () => new_data)
			}
		} catch (e) {
			onError(e)
		}
	}
	return data
}
