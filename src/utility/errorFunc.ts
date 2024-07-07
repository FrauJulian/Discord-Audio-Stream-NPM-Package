export function ERR(err?: unknown) {
    console.error(" ")
    console.error("  ______ _____  _____   ____  _____  \r\n |  ____|  __ \\|  __ \\ \/ __ \\|  __ \\ \r\n | |__  | |__) | |__) | |  | | |__) |\r\n |  __| |  _  \/|  _  \/| |  | |  _  \/ \r\n | |____| | \\ \\| | \\ \\| |__| | | \\ \\ \r\n |______|_|  \\_\\_|  \\_\\\\____\/|_|  \\_\\")
    console.error(" ")
    console.error("This error comes from the discord-audio-stream package!")
    console.error("This error occurs if you are not using the package correctly, sometimes it can also be bugs in the package.")
    console.error(" ")
    console.error("See the docs or open a issue post on github.")
    console.error(" ")
    if (err) {
        console.error(err)
    }
}