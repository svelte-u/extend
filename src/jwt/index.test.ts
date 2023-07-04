import type { JwtHeader, JwtPayload } from "jwt-decode"
import { describe, expect, it, vitest } from "vitest"

import { jwt } from "."

interface CustomJwtHeader extends JwtHeader {
	foo: string
}

interface CustomJwtPayload extends JwtPayload {
	foo: string
}

describe("jwt", () => {
	const value =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.L8i6g3PfcHlioHCCPURC9pmXT7gdJpx3kOoyAfNUwCc"

	it("should be defined", () => {
		expect(jwt).toBeDefined()
	})

	it("should return header and payload", () => {
		const { header, payload } = jwt(value)

		expect(header?.alg).toBe("HS256")

		expect(payload?.sub).toBe("1234567890")

		expect(payload?.iat).toBe(1516239022)
	})

	it("decode jwt with error", () => {
		const spy = vitest.fn()

		const { header, payload } = jwt("bad-token", { onError: spy })

		expect(header).toBe(null)

		expect(payload).toBe(null)

		expect(spy).toHaveBeenCalled()
	})

	it("decode jwt with fallback", () => {
		const { header, payload } = jwt("bad-token", { fallback: "sorry" })

		expect(header).toBe("sorry")

		expect(payload).toBe("sorry")
	})

	it("should return header and payload with custom fields", () => {
		const encodedCustomJwt =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImZvbyI6ImJhciJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJmb28iOiJiYXIifQ.S5QwvREUfgEdpB1ljG_xN6NI3HubQ79xx6J1J4dsJmg"

		const { header, payload } = jwt<CustomJwtPayload, CustomJwtHeader>(
			encodedCustomJwt
		)
		expect(header?.foo).toBe("bar")
		expect(payload?.foo).toBe("bar")
	})
})
