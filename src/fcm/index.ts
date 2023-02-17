import { browser, to_readable, to_writable, unstore } from "@sveu/shared"

import type { FirebaseApp } from "firebase/app"
import { getMessaging, getToken, onMessage } from "firebase/messaging"
import type { GetTokenOptions, Messaging } from "firebase/messaging"

interface FcmOptions {
	vapid_key?: string

	sw_path?: string
}

/**
 * Wrapper for Firebase Messaging
 *
 * @param firebase - Firebase app
 *
 * @param options - Options
 * - `vapid_key` - VAPID key
 * - `sw_path` - Service worker path
 *
 * @returns
 * - `token` - Readable store with FCM token
 * - `error` - Readable store with error
 * - `supported` - Readable store with boolean value indicating if FCM is supported
 * - `messaging` - Readable store with messaging instance
 * - `on_message` - Function for handling incoming messages
 *
 */
export function fcm(firebase: FirebaseApp, options: FcmOptions = {}) {
	const { vapid_key, sw_path } = options

	const token = to_writable<string | null>(null)

	const error = to_writable<Error | null>(null)

	const supported = to_writable<boolean>(false)

	const messaging = to_writable<Messaging | null>(null)

	let sw: any

	/** Create messaging instance and get token */
	async function init() {
		if (sw_path) {
			try {
				sw = await navigator.serviceWorker.register(sw_path)
			} catch {
				error.set(new Error("Service worker registration failed"))
			}
		}

		const token_options: GetTokenOptions = {
			vapidKey: vapid_key,
			serviceWorkerRegistration: sw,
		}

		const _messaging = unstore(messaging)

		if (_messaging) {
			try {
				const _token = await getToken(_messaging, token_options)
				token.set(_token)
			} catch (e: any) {
				error.set(e)
			}
		}
	}

	if (browser) {
		messaging.set(getMessaging(firebase))

		if (!messaging) {
			supported.set(false)
			error.set(new Error("Firebase Messaging is not supported"))
		}

		supported.set(true)

		init()
	}

	function on_message(fn: (payload: unknown) => void) {
		const _messaging = unstore(messaging)

		if (_messaging) onMessage(_messaging, fn)
	}

	return {
		token: to_readable(token),
		error: to_readable(error),
		supported: to_readable(supported),
		messaging: to_readable(messaging),
		on_message,
	}
}
