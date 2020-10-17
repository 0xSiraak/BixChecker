const Discord = require('discord.js');
const client = new Discord.Client();
const colors = require('colors');
const request = require('request');


const config = require('./config.json');
const token = config.token;
const prefix = config.prefix;

client.on("ready", function() {
    console.log("[".white + "+".cyan + "]".white + " -".cyan + " BinChecker V1.0 crée et développé par".white + " Elohîm Siraak_#1607".cyan + ".".white);
    console.log("[".white + "+".cyan + "]".white + " -".cyan + " Le checker utilise une api bincode (".white + "https://binlist.net/".cyan + ")".white + ".".white);
});

client.on("message", function(m) {
    if(m.channel.type !== "text") return;
    var args = m.content.split(/ +/);

    switch(args[0]) {

        case `${prefix}checker`:
            if(m.deletable) m.delete()
            if(!args[1]) {
                m.channel.send(":x: | Merci de bien vouloir préciser un bin valide.\n__**Exemple**__ : " + prefix + "checker 497040")
                return;
            } else {
                if(m.deletable) m.delete()
                request(`https://lookup.binlist.net/${args[1]}`, function(error, response, body) {
                    if(!error && response.statusCode === 200) {
                        let page = JSON.parse(body);
                        m.channel.send("> BIN : " + args[1] + "\n> Banque : " + page.bank.name + "\n> Marque : " + page.brand + "\n> Type : " + page.type + "\n> Pays : " + page.country.name)
                    }
                })
            }
        break;

    };

});

client.login(token);
