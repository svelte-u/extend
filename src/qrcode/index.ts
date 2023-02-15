import { to_readable, to_writable } from "@sveu/shared"

import QRCode from "qrcode"

/**
 * Wrapper for qrcode.
 *
 * @param text - The text to encode.
 *
 * @see options in https://github.com/soldair/node-qrcode#qr-code-options
 *
 * @returns
 * - output - Readable store of the generated QR code.
 * - error  - Error if one occurred.
 * - pending - Whether the QR code is being generated.
 */
export function qrcode(text: string, options?: QRCode.QRCodeToDataURLOptions) {
	const output = to_writable<string>("")

	const error = to_writable<boolean | unknown>(false)

	const pending = to_writable(true)

	/** Generate the QR code. */
	async function generate() {
		pending.set(true)

		error.set(false)

		try {
			output.set(await QRCode.toDataURL(text, options))
		} catch (e) {
			error.set(e)
		} finally {
			pending.set(false)
		}
	}

	generate()

	return {
		output: to_readable(output),
		error: to_readable(error),
		pending: to_readable(pending),
	}
}
