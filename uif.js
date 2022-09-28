const puppeteer = require("puppeteer");
const CronJob = require('cron').CronJob
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
require('dotenv').config()

client.login(process.env.BOT_TOKEN);
client.on('ready', () => {
    console.log('The bot is online!')
});

url = "https://forum.uifserver.net/index.php?action=recent";

var headerprev = "";
var dateprev = "";
var nameprev = "";
var contextprev = "";
var linkprev = "";

async function configureBrowser() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox','--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle0",
  });
  return page;
}

async function CompareData(page) {
  await page.reload();
  
  let header = await page.evaluate(() => {
      let headerr = document.querySelector('tr[class="titlebg2"]').innerText;
      return headerr;
  });
  let date = await page.evaluate(() => {
      let dater = document.querySelector('div[class="righttext"]').innerText;
      return dater;
  });
  let name = await page.evaluate(() => {
      let namer = document.querySelector('span[class="middletext"]').innerText;
      return namer;
  });
  let context = await page.evaluate(() => {
      let contextr = document.querySelector('div[class="post"]').innerText;
      return contextr;
  });
  let link = await page.evaluate(() => {
    let linkr = document.querySelector('strong a').href
    return linkr;
});

  if (headerprev == "" && dateprev == "" && nameprev == "" && contextprev == "" && linkprev == "") {
    headerprev = header;
    dateprev = date;
    nameprev = name;
    contextprev = context;
    linkprev = link;
  }
  else{
      if( dateprev == date && nameprev == name && contextprev == context && linkprev == link){
          console.log("No update");
      }
     // else if(titleprev != title && linkprev != link)
     else{
        var headerrr = header.replace("1 \n", "")
        const exampleEmbed = new MessageEmbed()
        .setColor('#F94E7F')
        .setThumbnail('https://imgur.com/zDbwwOs.png')
        .setTitle(name)
        .setURL(link)
        .setDescription(context)
        .setFooter(headerrr);
        client.channels.cache.get('903324755145404438').send({embeds: [exampleEmbed]});
          console.log("** UPDATE **");
          console.log(header);
          console.log(name);
          console.log(context);
          console.log(link);
          console.log("===========================");
          headerprev = header;
          dateprev = date;
          nameprev = name;
          contextprev = context;
          linkprev = link;

      }
  }
}
async function startTracking() {
    const page = await configureBrowser();
  
    let job = new CronJob("*/50 * * * * *", function() {
        console.log("Reloading..."); //runs every 30 seconds in this config
      CompareData(page);
    }, null, true, null, null, true);
    job.start();
}
startTracking();
