import Fuse from "fuse.js"

export type _FuseOptions<T> = Fuse.IFuseOptions<T>

export interface FuseOptions<T> {
	/**
	 * Fuse.js options
	 */
	fuseOptions?: _FuseOptions<T>
	/**
	 * Number of results to return
	 */
	limit?: number
	/**
	 * Match all results when search term is empty
	 */
	matchWhenEmpty?: boolean
}

/**
 * Wrapper for Fuse.js
 *
 * @param search - The search term
 *
 * @param data - The data to search
 *
 * @param options - Options
 * - `limit` - The maximum number of results to return.
 * - `matchWhenEmpty` - Match all results when search term is empty
 * - `fuseOptions` - [Fuse.js options](https://fusejs.io/api/options.html)
 *
 * @example
 * ```ts
 * const { results, ifuse } = fuse("Hello world!", data, {
 * 	limit: 10,
 * 	matchWhenEmpty: true,
 * 	fuseOptions: {
 * 		threshold: 0.3,
 * 	},
 * })
 * ```
 *
 * @returns
 * - `results` - The search results
 * - `ifuse` - The Fuse.js instance
 */
export function fuse<T>(search: string, data: T[], options: FuseOptions<T>) {
	const { fuseOptions, limit, matchWhenEmpty } = options

	const fuse_instance = new Fuse(data ?? [], fuseOptions)

	let results

	if (matchWhenEmpty && !search)
		results = data.map((item, index) => ({ item, refIndex: index }))
	else results = fuse_instance.search(search, limit ? { limit } : undefined)

	return {
		results,
		ifuse: fuse_instance,
	}
}
