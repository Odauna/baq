import React from "react"
// import { getUser } from "../dal"

// const user = await getUser()
export const SessionContext = React.createContext({name: '', email: '', avatar: ''})
// export default SessionContext