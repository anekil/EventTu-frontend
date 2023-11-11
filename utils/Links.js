const AUTH_API = "http://localhost:8080/api/"
//const AVAIL_ACTION = ["login", "register"]

export function sendTo(action) {
    // if(!AVAIL_ACTION.includes(action)) return "Wrong action"
    return AUTH_API + action
}