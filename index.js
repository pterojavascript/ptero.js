const PteroJS = require("./dist");
const client = new PteroJS.Client({
    host: "https://ptero.derock.dev",
    apiKey: "dFOGje73F6U1RHV8yv7dEFnGP5V75eKgz13dbXUKdY5w9Psp"
});

(async () => {
    console.log(await client.getUser())
})()

// dFOGje73F6U1RHV8yv7dEFnGP5V75eKgz13dbXUKdY5w9Psp
