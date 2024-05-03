const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

app.post("B7R on top", (req, res) => {
 console.log("uptime")
  res.send({
    msg: "B7R",
    access: "B7R",
  })
})


const {
  Discord,
  Permissions,
  Intents,
  Client,
  MessageEmbed,
  MessageAttachment,
  Collection,
  Collector,
  MessageCollector,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  WebhookClient
} = require('discord.js'),
  fs = require("fs");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
  partials: ['CHANNEL', 'MESSAGE', 'USER', 'GUILD_MEMBER'],
  allowedMentions: {
    parse: ['users'],
    repliedUser: false
  }
});

const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { DisTube } = require("distube");
const ms = require("ms")
import("node-fetch").then(fetch => {
    // يمكنك استخدام مكتبة node-fetch هنا
}).catch(err => {
    console.error("حدث خطأ في تحميل مكتبة node-fetch:", err);
});
const tempData = new Collection();
tempData.set("bots", []);


 // -----------------------------------------------------------

const ownersArray = ['899332615558008912', '908137518732574730', ''];
        const adminsRole = [""]; // ايدي رول السبورت .
   const serverID = "1220358016818348042"; // ايدي سيرفر البُوتات .

 // -----------------------------------------------------------

 client.login("") // توكن بوت الكنترول .
.catch(console.log);

 // -----------------------------------------------------------

client.setMaxListeners(999999);
client.on("ready", () => {
  client.user.setPresence({
    status: 'dnd', //idle|online|dnd
    activities: [{
      name: `Nieve`,
      type: "dnd", url: ""
    }]
  })
})

client.on('ready', async() => {
  console.log(`${client.user.tag} Connected`)
})

client.on("messageCreate", async (message) => {
  if (
    message.author.bot ||
    !message.guild ||
    !ownersArray.includes(message.author.id)
  ) return;
  let args = message.content.split(" ");
  if (args[0] === "create") {
    let number = parseInt(args[1]);
    if (!number) return;
    let name = args.slice(2).join(" ");
    if (!name) return;
    let num = 0;
    let time = 0;
    let done = 0;
    for (let i = 0; i < number; i++) {
      await wait(time);
      let bot = await create_bots(name, done + 1);
      if (bot?.cooldown) {
        message.reply({
          content: `i created ${done} bots but there is now cooldown: ${bot?.cooldown}`,
        });
        break;
      }
      if (bot?.message) {
        message.reply({
          content: `error: ${bot?.message}`,
        });
        break;
      }
      await client.channels.cache.get("1121229605060218941")?.send({
        content: `${bot?.name}\n\`\`\`Bot ID = ${bot?.id}\nBot Token = ${bot.token}\nInvite URL = https://discord.com/oauth2/authorize?client_id=${bot?.id}&permissions=8&scope=bot%20applications.commands\`\`\``,
      });
      time += 30000;
      done += 1;
      var data = fs.readFileSync("./tokens.json");
      data = JSON.parse(data);
      data.push({
        token: bot.token,
        id: bot?.id,
        registered: false,
        owner: null,
        server: null,
        channel: null,
        expireDate: null,
      });
      runBotSystem(bot?.token);
      fs.writeFile("./tokens.json", JSON.stringify(data), (err) => {
        if (err) throw err;
      });
    }

    // return message.reply({ content: `${number}` });
  } else if (args[0] === "add") {
    let number = parseInt(args[1]);
    if (!number) return;
    var data = fs.readFileSync("./tokens.json");
    data = JSON.parse(data);
    if (number > data.length)
      return message.reply(`there is just ${data.length}`);
    for (let i = 0; i < number; i++) {
      let bot = data[i];
      setTimeout(() => {
        message.author.send({
          content: `|| https://discord.com/oauth2/authorize?client_id=${bot?.id}&permissions=8&scope=bot%20applications.commands ||`,
        });
      }, 3000 + i * 6000);
    }
  } else if(args[0] === "avatarall") {
    let args = message.content.split(' ');
    let bots = tempData.get("bots");
    let url = args[1];
    if(!url) return;      
    
    bots.forEach(bot => {
     bot.user.setAvatar(url).then(async() => {
      let channel = bot.channels.cache.get(message.channel.id)
      let msg = await channel.messages.fetch(message.id).catch(console.log)
      msg.react("✅").catch(console.log)
     }).catch(console.log)
    })
  } else if (args[0] === "comeall") {
     var data = fs.readFileSync('./tokens.json', "utf8");
     if(data == "" || !data) return;
     data = JSON.parse(data);
     if(!data) return;
    
     let member_voice = message.member?.voice?.channel
     if(!member_voice) return;
     let tokenObjs = data.filter((tokenBot) => !tokenBot.channel);
     if(!tokenObjs[0]) return message.reply(`**مافي بوت فاضي.**`);
     for(let i = 0; i < tokenObjs.length; i++) {
      data = data.filter((tk) => tk.token != tokenObjs[i].token)
      tokenObjs[i].channel = member_voice.id;
      data.push(tokenObjs[i]);
  };

     fs.writeFile('./tokens.json', JSON.stringify(data, null, 4), "utf8", (err) => { if (err) throw err; message.react('✅')}); 
   } else if (args[0] === "adminrole") {
     var data = fs.readFileSync('./config.json', "utf8");
     if(data == "" || !data) return;
     data = JSON.parse(data);
     if(!data) return;

     let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
     if(!role) return message.react('❌');
     if(role.id == data.adminRole) {
       data.adminRole = null;
     };
     data.adminRole = role.id;
     fs.writeFile('./config.json', JSON.stringify(data, null, 4), "utf8", (err) => { if (err) throw err; message.react('✅').catch(console.log)}); 
   }
});

setTimeout(async () => {
  var data = fs.readFileSync('./tokens.json');
  var parsedData = JSON.parse(data);
  var tokens_data = parsedData;
  if (!tokens_data[0]) return;
 
    tokens_data.forEach(token => {
      runBotSystem(token.token);
    });
}, 3000);

async function convert(harinder) {
  const temperance = await fetch(harinder).catch(deari => {
    return 0;
  });
  const myrtte = temperance.url;
  if (myrtte) {
    return `${""}${myrtte}${""}`;
  } else {
    return null;
  }
}

async function runBotSystem(token) {
  const client83883 = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES
    ],
    partials: ['CHANNEL', 'GUILD_MEMBER'],
    allowedMentions: {
      parse: ['users'],
      repliedUser: false
    }
  });
  
client83883.music = new DisTube(client83883, {
  leaveOnStop: false,
  leaveOnEmpty: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [ 
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
    new SoundCloudPlugin(),
  ],
  youtubeDL: false
});
client83883.lastVolume = 50;
client83883.music
  .on('playSong', (queue, song) => {
    song.metadata.msg.edit(
      `> 🎵 *Started:* **${song.name}** (\`${song.formattedDuration}\`) - ${song.user}`
    ).catch(() => 0);
    if(queue?.volume !== client83883.lastVolume) {
      queue.setVolume(client83883.lastVolume);
    };
  })
  .on('addSong', (queue, song) =>
    song.metadata.msg.edit(
      `> 🔂 *Adding to queue:* **${song.name}** (\`${song.formattedDuration}\`) - ${song.user}`
    ).catch(() => 0)
  )
  .on('addList', (queue, playlist) =>
    song.metadata.msg.edit(
      `🔂 **أُضيفت قائمة الآغاني** *${playlist.name}* (\`${
        playlist.songs.length
      }\` آغنية) **إلى طابور الأغاني**`
    ).catch(() => 0)
  )
  .on('error', (channel, e) => {
    console.log(e)
    if (channel) channel.send(`♨️ **تم إستقبال خطأ:** ${e.toString().slice(0, 1974)}`).catch(() => 0)
    else console.error(e)
  })
  .on('searchNoResult', (message, query) =>
    message.reply(`> ♨️ **لم يتم إيجاد نتائج بحث لـ** *${query}*`).catch(() => 0)
  )
  
 client83883.on('ready', async () => {
  let newData = tempData.get("bots")
   newData.push(client83883)
   tempData.set(`bots`, newData)
   console.log('Bot: ' + client83883.user.username);
    let int = setInterval(async () => {
      var data = fs.readFileSync('./tokens.json', 'utf8');
      if(!data || data == '') return;
      data = JSON.parse(data);
      tokenObj = data.find((tokenBot) => tokenBot.token == token)
     // console.log(tokenObj.status?.toLowerCase())
      if (!tokenObj) {
        client83883.destroy()?.catch(() => 0);
        return clearInterval(int);
      };
        
      if(tokenObj.channel) {
        let guild = client83883.guilds.cache.get(serverID)
        if(guild) {
         let voiceChannel = guild?.me.voice.channel;
         if(!voiceChannel) {
          client83883.user.setPresence({status: /*tokenObj.status?.toUpperCase()*/4})
         };
         if(voiceChannel) {
          if(voiceChannel.id !== tokenObj.channel) {
            let musicChannel = guild.channels.cache.get(tokenObj?.channel)
            if(musicChannel && musicChannel.joinable) {
              client83883.music.voices.join(musicChannel).catch(() => 0)
            }
          }
         } else {
           let musicChannel = guild.channels.cache.get(tokenObj?.channel)
            if(musicChannel && musicChannel.joinable) {
              client83883.music.voices.join(musicChannel).catch(() => 0)
            }
         }
        }
      } else {
        client83883.user.setPresence({status: /*tokenObj.status?.toUpperCase()*/ 4})
        let guild = client83883.guilds.cache.get(serverID)
        if(guild) {
         let voiceChannel = guild?.me.voice.channel;
         if(voiceChannel) {
           client83883.music.voices.leave(guild.id)
         }
        }
      }
    }, 5000);
  });

  client83883.on('messageCreate', message => {
    if (message.content === 'pingall') {
      message.channel.send(`Pong! Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
  });

   client83883.on('messageCreate', async(message) => {
    if(message.author.bot || !message.guild) return;
    var data = fs.readFileSync('./tokens.json', 'utf8');
    if(data == '' || !data) return;
    data = JSON.parse(data);
    let tokenObj = data.find((t) => t.token == token);
    if(!data || !tokenObj) return;
    let args = message.content?.trim().split(' ');
     if(args) {
       if(args[0] == `<@!${client83883.user.id}>` || args[0] == `<@${client83883.user.id}>`) {
         args = args.slice(1);
         if(!args[0]) return;
         if (args[0] == 'help') {
          const embed = new MessageEmbed()
            .setTitle("Music commands : 🎶")
            .setDescription(`> play - search and play song or url.\n> skip - skip the currently song.\n> vol - set the volume of the song.\n> stop - stop play music.\n> skipto - skip to the selected queue number.\n> pause - pause the currently playing music.\n> np - show now playing song.\n> queue - show the music queue and now playing..\n> \n> **Control bot : 🎶**\n> pingall - show bots ping.\n> comeall - comeall all bots.\n> avatarall - Change the avatars of all bots.\n> \n> **Owner commands : 🎶**\n> <@bot> - **setavatar** Change bot image\n> <@bot> - **setname** Change bot name\n> <@bot> - **setchannel** make the bot stay in the room.\n> <@bot> - **setchat **Set chat to receive commands\n> <@bot> - **restart** Restart the bot\n> \n> كل الاوامر تدعم الاختصارات الانكليزية والعربية ،\n> ويمكن كتابتها بدون البرفكس.\n> Youtube & playlist and  spotify & playlist and soundcloud\n> made by ( ;سانتوب ) reseved 2023 7lm store.\n**[الإنتقال إلي الدعم الفنِي](https://discord.gg/qT5Y9Pdx)**`)
            .setFooter({text: `${client83883.user.username}` ,  iconURL: `${client83883.user.displayAvatarURL({dynamic: true})}` })
            .setTimestamp()
             .setThumbnail(client83883.user.displayAvatarURL({ dynamic: true }))
            .setColor('#886161');
          message.author.send({ embeds: [embed] })
            .then(async () => {
              message.react("✅").catch(() => 0);
            }).catch(() => {
              message.react("🔒").catch(() => 0);
            })
          };

            var config = fs.readFileSync('./config.json', "utf8");
         if(config == "" || !config) return;
         config = JSON.parse(config);
         if(!config) return;
         if(config.adminsRole && !message.member?.roles?.cache?.hasAny(...config.adminsRole)) return;
         if(args[0] == 'restart') {
            await client83883.destroy()
            setTimeout(async() => {
              client83883.login(token).then(() => {
                message.reply(`> **Restarted Succesfully ❕**`).catch(() => 0)
            }).catch(() => { console.log(`${client83883.user.tag} (${client83883.user.id}) has an error with restarting.`) })
          }, 5000)
             
          } else if(args[0] == 'setname') {
            let name = args[1];
            if(!name) return;
            
            client83883.user.setUsername(name).then(async() => {
              message.reply(`> ***Name has been changed:*** \`${name}\``).catch(() => 0)
            }).catch((error) => {
              message.reply(`Error: \`${error.message}\``).catch(() => 0)
            })
          } else if(args[0] == 'setavatar') {
            let url = args[1];
            if(!url) return;
            
            client83883.user.setAvatar(url).then(async() => {
              message.reply(`> ***Avatar has been changed***`).catch(() => 0)
            }).catch((error) => {
              message.reply(`> **Error:** \`${error.message}\``).catch(() => 0)
            })
          } else if(args[0] == 'join' || args[0] == 'leave' || args[0] == 'setchannel ') {            
            let data = fs.readFileSync('./tokens.json');
            data = JSON.parse(data);
            tokenObj = data.find((tokenBot) => tokenBot.token == token)
            let channel = await message.guild.channels.fetch(args[1]).catch(() => 0);
            if(!channel) return;
            data = data.map((tokenBot) => {
              if(tokenBot.token == token) tokenBot.channel = channel.id      
              return tokenBot
            });
            fs.writeFile('./tokens.json', JSON.stringify(data), err => { if(err) throw err });
       message.reply(`${channel} *has been selected* \`Switching channel...\``)

         } else if(args[0] == 'setchat' || args[0] == 'chat') {
          let data = fs.readFileSync('./tokens.json');
          data = JSON.parse(data);
          tokenObj = data.find((tokenBot) => tokenBot.token == token)
          let channel = await message.guild.channels.fetch(args[1]).catch(() => 0);
          if(!channel) return;
          data = data.map((tokenBot) => {
            if(tokenBot.token == token) tokenBot.chat = channel.id      
            return tokenBot
          });
          fs.writeFile('./tokens.json', JSON.stringify(data), err => { if(err) throw err });
          message.reply(`${channel} *has been selected* \`Bot will not work in this channel!\``)   


         } else if(args[0] == 'disablechannel') {
            data.channel = null;
            client.database.set(`bot_${client83883.user.id}`, data);
            message.reply(`**Bot** disabled, i will leave the channel in 3 secs.*`).catch(() => 0)         
          } else if(args[0] == 'setstatus') {
            let status = args[1];
            if(!status) return message.react('❌');
            if(!['dnd', 'idle', 'online'].some((st) => st == status.toLowerCase())) return message.react('❌');
            data.status = status.toLowerCase();
            client.database.set(`bot_${client83883.user.id}`, data);
            client83883.user.setStatus(tokenObj.status?.toLowerCase())
            message.react('✅').catch(() => 0)
         }
       }
     }
   });



client83883.on("ready", () => {
  client83883.user.setPresence({
    status: 'dnd', //idle|online|dnd
    activities: [{
      name: `Nieve`,
      type: "STREAMING", url: "https://www.twitch.tv/ghaith_25"
    }]
  })
})


    

    
    
client83883.on("messageCreate", async (message) => {
  if(message.author.bot || !message.guild) return;
  let member_voice = message.member?.voice?.channel
  if(!member_voice) return;
    
  let client_voice = message.guild.me?.voice?.channel
  if(!client_voice) return;
  if(member_voice.id !== client_voice.id) return;
  
  var data = fs.readFileSync('./tokens.json', 'utf8');
  if(!data || data == '') return;
  data = JSON.parse(data);
  if(!data) return;
  
  data = data.find((tok) => tok.token == token);
  if(!data) return;
  
  if(data?.chat && data?.chat !== message.channel.id) return;
  let cmdsArray = {
    play: ["شغل", "ش", "p", "play", "P",],
    stop: ["stop", "وقف"],
    skip: ["skip", "سكب", "تخطي", "s",],
    volume: ["volume", "vol", "صوت", "v"],
    nowplaying: ["nowplaying", "np"],
    loop: ["loop", "تكرار"],
    pause: ["pause", "توقيف", "كمل"],
    queue: ["queue", "قائمة", "اغاني"]
  };
  if(cmdsArray.play.some((cmd) => message.content.split(' ')[0] == cmd)) {
  let song = message.content.split(' ').slice(1).join(' ')
    if(song) {
   message.reply(`**Searching...** \🔎`).then(async(msg) => {
        await client83883.music.play(message.member.voice.channel, String(await convert(song) || song), {
          member: message.member,
          textChannel: message.channel,
          metadata: {msg},
          message
        });
      }).catch(() => 0)
  } else {
    return message.reply(`***🎵 Play command usage:***
- *\`play [ title ] :\` plays first result from YouTube*.
- *\`play [URL]:\` searches* **[YouTube][Spotify]**, **[SoundCloud]**.`).catch(() => 0);
   }
  } else if(cmdsArray.stop.some((cmd) => message.content.split(' ')[0] == cmd)) {
    const queue = client83883.music.getQueue(message)
    if (!queue) return message.channel.send(`🚫 There must be music playing to use that!`).catch(() => 0);
    queue.stop()
    message.react("📻").catch(() => 0);
  } else if(cmdsArray.loop.some((cmd) => message.content.split(' ')[0] == cmd)) {
    const queue = client83883.music.getQueue(message)
    if (!queue) return message.channel.send(`🚫 There must be music playing to use that!`).catch(() => 0);
    const autoplay = queue.setRepeatMode(queue.repeatMode == 1 ? 0 : 1);
    message.reply(` 🎶 Repeat Mode: ${autoplay == 1 ? "**ON**" : "**OFF**"}`).catch(() => 0);
  } else if(cmdsArray.pause.some((cmd) => message.content.split(' ')[0] == cmd)) {
    const queue = client83883.music.getQueue(message)
    if (!queue) return message.channel.send(`🚫 There must be music playing to use that!`).catch(() => 0);
    if (queue.paused) {
      queue.resume()
      return message.react("▶️").catch(() => 0)
    }
    queue.pause()
    return message.react("⏸️").catch(() => 0)
  } else if(cmdsArray.nowplaying.some((cmd) => message.content.split(' ')[0] == cmd)) {
    const queue = client83883.music.getQueue(message)
    if (!queue) return message.channel.send(`🚫 There must be music playing to use that!`).catch(() => 0);
    const song = queue.songs[0];
    let embed = new MessageEmbed()
    .setTitle(`💿 **الآغنية الحالية:**`)
    .setDescription(`[${song.name}](${song.url})`)
    return message.channel.send({embeds: [embed]}).catch(() => 0);
  } else if(cmdsArray.volume.some((cmd) => message.content.split(' ')[0] == cmd)) {
    let args = message.content.split(' ')
    const queue = client83883.music.getQueue(message)
    if (!queue) return message.reply(`🚫 There must be music playing to use that!`).catch(() => 0);
    if(!args[1]) return message.reply(`🔊 Current volume is : **${queue?.volume}%**`).catch(() => 0)
    const volume = parseInt(args[1])
    if (isNaN(volume) || volume > 150 || volume < 0) return message.channel.send(`🚫 Volume must be a valid integer between 0 and 150!`).catch(() => 0);
    client83883.lastVolume = volume;
    queue.setVolume(volume)
    message.reply(`🔈 Volume changed from : \`%${queue?.volume}\` to \`%${volume}\``).catch(() => 0);
  } else if(cmdsArray.skip.some((cmd) => message.content.split(' ')[0] == cmd)) {
    const queue = client83883.music.getQueue(message)
    if (!queue) return message.reply(`🚫 There must be music playing to use that!`).catch(() => 0);
    try {
      const song = await queue.skip()
      message.channel.send(`> ⏩ **تم التخطي! بدء تشغيل** *${song.name} - ${song.user}*`).catch(() => 0);
    } catch (e) {
      if(`${e}`.includes("NO_UP_NEXT")) {
        await queue.stop().catch(() => 0)
        message.react(`✅`).catch(() => 0)
      } else {
        message.channel.send(`> ♨️ **خطأ:** ${e}`).catch(() => 0)
      }
    }
  } else if(cmdsArray.queue.some((cmd) => message.content.split(' ')[0] == cmd)) {
    const queue = client83883.music.getQueue(message)
    if (!queue) return message.reply(`🚫 There must be music playing to use that!`).catch(() => 0);
    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'قيد التشغيل:' : `${i}.`} *${song.name}* (\`${song.formattedDuration}\`)`)
      .join('\n')
    let embed = new MessageEmbed()
    .setTitle(`List songs: 📻 `)
    .setThumbnail("https://cdn.discordapp.com/attachments/1091536665912299530/1145056252393689200/emoji.png")
    .setColor('#886161')
    .setDescription(`${q}`)
    .setTimestamp()
    .setFooter({text: `${client83883.user.username}` ,  iconURL: `${client83883.user.displayAvatarURL({dynamic: true})}` });
    return message.channel.send({embeds: [embed]}).catch(() => 0);
  }
});

  await client83883.login(token).catch(console.log)
};


process.on("uncaughtException", console.log);
process.on("unhandledRejection", console.log);
process.on("rejectionHandled", console.log);
