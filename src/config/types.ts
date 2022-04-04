//definition des types pour inserifyJS
const TYPES = {
    ICustomStateUpdate : Symbol.for("ICustomStateUpdate"),
};

const LOAD_TYPES = {
    command : "commands",
    message: "messages",
}

const DYNAMIC_LOAD = new Map<string, Map<string,symbol>>();

export { TYPES, LOAD_TYPES, DYNAMIC_LOAD};