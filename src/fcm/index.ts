import { browser, toReadable, toWritable, unstore } from "@sveu/shared"

import type { FirebaseApp } from "firebase/app"
import {
	onMessage as _onMessage,
	getMessaging,
	getToken,
} from "firebase/messaging"
import type { GetTokenOptions, Messaging } from "firebase/messaging"

interface FcmOptions {
	swPath?: string
}

/**
 * Wrapper for Firebase Messaging
 *
 * @param firebase - Firebase app
 *
 * @param vapidKey - VAPID key
 *
 * @param options - Options
 * - `swPath` - Service worker path
 *
 * @example
 * ```ts
 * const { token, error, supported, messaging, onMessage } = fcm(firebase, vapidKey)
 * ```
 * @returns
 * - `token` - Readable store that contains token
 * - `error` - Readable store that contains error if one occurred
 * - `supported` - Readable store that indicates whether FCM is supported
 * - `messaging` - Readable store with messaging instance
 * - `onMessage` - Function for handling incoming messages
 *
 */
export function fcm(
	firebase: FirebaseApp,
	vapidKey: string,
	options: FcmOptions = {}
) {
	const { swPath } = options

	const token = toWritable<string | null>(null)

	const error = toWritable<Error | null>(null)

	const supported = toWritable<boolean>(false)

	const messaging = toWritable<Messaging | null>(null)

	let sw: any

	/** Create messaging instance and get token */
	async function init() {
		if (swPath) {
			try {
				sw = await navigator.serviceWorker.register(swPath)
			} catch {
				error.set(new Error("Service worker registration failed"))
			}
		}

		const token_options: GetTokenOptions = {
			vapidKey: vapidKey,
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

	/** Handle incoming messages
	 *
	 * @param fn - Function to handle incoming messages
	 *
	 * @example
	 * ```ts
	 * const { onMessage } = fcm(firebase, vapidKey)
	 *
	 * onMessage((payload) => {
	 * 	console.log(payload)
	 * })
	 * ```
	 */
	function onMessage(fn: (payload: unknown) => void) {
		const _messaging = unstore(messaging)

		if (_messaging) _onMessage(_messaging, fn)
	}

	return {
		token: toReadable(token),
		error: toReadable(error),
		supported: toReadable(supported),
		messaging: toReadable(messaging),
		onMessage,
	}
}
