import 'server-only'
import { dbConnect } from './mongodb'

// function canSeeUsername(viewer: User) {
//     return true
// }

export async function getProfileDTO() {
    await dbConnect()
    // const data = await UserKurban.
}