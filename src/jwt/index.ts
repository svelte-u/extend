import jwt_decode from "jwt-decode"
import type { JwtDecodeOptions, JwtHeader, JwtPayload } from "jwt-decode"

export interface JwtOptions<Fallback> {
	/**
	 * Value returned when encounter error on decoding
	 *
	 * @defaultValue null
	 */
	fallback?: Fallback

	/**
	 * Error callback for decoding
	 */
	on_error?: (error: unknown) => void
}

/**
 * Decode JWT
 *
 * @param value - JWT string
 *
 * @param options - Options
 * - `fallback` - Value returned when encounter error on decoding. Default: `null`
 * - `on_error` - Error callback for decoding.
 *
 * @returns JWT header and payload
 */
export function jwt<
	Payload extends object = JwtPayload,
	Header extends object = JwtHeader,
	Fallback = null
>(value: string, options: JwtOptions<Fallback> = {}) {
	const { on_error, fallback = null } = options

	function decode_with_fallback<T extends object>(
		value: string,
		options?: JwtDecodeOptions
	) {
		try {
			return jwt_decode<T>(value, options)
		} catch (err) {
			on_error?.(err)
			return fallback as Fallback
		}
	}

	const header = decode_with_fallback<Header>(value, { header: true })

	const payload = decode_with_fallback<Payload>(value)

	return {
		header,
		payload,
	}
}
