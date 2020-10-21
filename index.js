const PteroJS = require("./dist");
const client = new PteroJS.Client({
    host: "https://ptero.derock.dev",
    apiKey: "nH36FWe4mIB8VFjscryy6CZYyNHhrMxV7GlpxsZ65AAjvgTb"
});

client.on("ready", async () => {
    console.log("Ready");
    await client.user.updatePassword("123456", "1234").then(console.log).catch(console.log)
})

// dFOGje73F6U1RHV8yv7dEFnGP5V75eKgz13dbXUKdY5w9Psp
// nH36FWe4mIB8VFjscryy6CZYyNHhrMxV7GlpxsZ65AAjvgTb
