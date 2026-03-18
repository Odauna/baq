import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action'

class MyCustomError extends Error {}

export const actionClient = createSafeActionClient({
    handleServerError(e) {
        console.error("Action error: ", e.message)

        if (e instanceof MyCustomError) {
            return e.message
        }
        // return "Oh tidak, terjadi kesalahan :( !"

        return DEFAULT_SERVER_ERROR_MESSAGE
    }
})