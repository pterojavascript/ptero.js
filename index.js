const PteroJS = require("./dist");
const client = new PteroJS.Client({
    host: "https://ptero.derock.dev",
    apiKey: "dFOGje73F6U1RHV8yv7dEFnGP5V75eKgz13dbXUKdY5w9Psp"
});

client.on("ready", async () => {
    console.log("Ready");
    console.log((await client.getServers())[0].relationships.variables);
})

// dFOGje73F6U1RHV8yv7dEFnGP5V75eKgz13dbXUKdY5w9Psp
// nH36FWe4mIB8VFjscryy6CZYyNHhrMxV7GlpxsZ65AAjvgTb
