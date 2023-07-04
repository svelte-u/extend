import Sortable from "sortablejs"
import type { Options } from "sortablejs"

/**
 * Move an element from one index to another in the same list.
 *
 * @param list - The list to move the element in.
 *
 * @param from - The index to move the element from.
 *
 * @param to - The index to move the element to.
 *
 */
export function move_list<T>(list: T[], from: number, to: number) {
	const _list = list

	const element = _list[from]

	_list.splice(from, 1)

	_list.splice(to, 0, element)

	return _list
}

/**
 * Wrapper for the SortableJS.
 *
 * @param target - The element to make sortable.
 *
 * @param options - The options to pass to SortableJS. [See SortableJS docs](https://github.com/SortableJS/Sortable#options)
 *
 * @example
 * ```ts
 *
 * <ul use:sortable>
 * 	<li>Item 1</li>
 * 	<li>Item 2</li>
 * 	<li>Item 3</li>
 * </ul>
 * ```
 *
 */
export function sortable(target: HTMLElement, options: Options = {}) {
	const _sortable = new Sortable(target, { ...options })

	return {
		destroy() {
			_sortable.destroy()
		},
	}
}
