const { BOT_TOKEN } = require('./config')

const fastify = require("fastify")({
    // logger: true
});

if (BOT_TOKEN) {
    const bot = require('./dpixivbot')

    fastify.post('/' + bot.token, async request => {
        await bot.handleUpdate(request.body)
        return { ok: true }
    })
}

fastify.register(require("./dpixserver"));

fastify.listen(process.env.PORT || 8080, "0.0.0.0", (err) =>
    console.error(err)
);