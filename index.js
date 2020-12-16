const BootBot = require('bootbot');
const config = require('config');
// const fetch = require('node-fetch');
const yelp = require('yelp-fusion');


const clientID = 'IrBk9mynytKY7FhDJ4-G0Q';
const YELP_API = "https://api.yelp.com/v3";
const apiKey = 'pX7nmZpm_SGFIMx0lmrIc3Uter0g1tq1XPC70AymZZdxPj_GbmLCOO4TanUIKWN1d5b2KHyKV37sHcAOQyFyqa1mT3niEfTI1dw1Td2kpdvaWExa04JFvZadcHTaX3Yx';
const client = yelp.client(apiKey);


var port = process.env.PORT || config.get('PORT');


const bot = new BootBot({
  accessToken: config.get('ACCESS_TOKEN'),
  verifyToken: config.get('VERIFY_TOKEN'),
  appSecret: config.get('APP_SECRET')
});

bot.hear(['hi', 'hello', 'Hello'], (payload, chat) => {
	const text = payload.message.text;
  console.log(`The user said: ${text}`);
  chat.say('Hi human friend! I can help you search information about restaurants in Prague. Are you hungry?', {typing: true});
});

bot.hear(['Yes'], (payload, chat) => {
  console.log('The user said "I am hungry"!');
  chat.say('Please provide me with name of your favorite restaurant. Tell me "search" and the name of your restaurant', 
  {typing: true});
});

bot.hear(/search (.*)/i, (payload, chat, data) => {

  chat.conversation((conversation) => {
    const restName = data.match[1];
    console.log("Somebody asked about this restaurant: "+ restName);
    const searchRequest = {
      term: restName,
      location: 'Praha'
    };
    client.search(searchRequest)
    .then(response => {
      const firstResult = response.jsonBody.businesses[0];
      console.log(firstResult.name);
      conversation.say('I found your resturant '+ firstResult.name, {typing: true});
      setTimeout(() => {
        conversation.say(
          "This restaurant has rating "+ firstResult.rating+" and was reviewed by "+ firstResult.review_count + " people", 
          {typing: true});
      }, 1000);
      handlePlot(conversation, firstResult);    
    })
    .catch(() => {
      conversation.say("I can't find this restaurant, please try again ", {typing: true});
    });
  });
});

function handlePlot(conversation, json) {
  setTimeout(() => {
    conversation.ask({
      text: "Do you like to phone there to reserve seats for dinner?",
      quickReplies: ["Yes", "NO"],
      options: {typing: true}
    }, (payload, conversation) => {
      if (payload.message.text === "Yes") {
        conversation.say(json.phone, {typing: true});
        conversation.end();
      } else {
        conversation.say("Ok, ask me about a different restaurant then.", {typing: true});
        conversation.end();
      }});
    },  2000);
}
bot.hear(['No'], (payload, chat) => {
  console.log('The user said "I am not hungry"!');
  chat.say('Good for you! But maybe I could help you another time', {typing: true});
});
bot.hear([/thank (you)/i,], (payload, chat) => {
	chat.say('You are welcome, always at your service');
});
bot.hear([/(good)?bye/i, /see (ya|you)/i, 'adios'], (payload, chat) => {
	chat.say('Bye, human!');
});

bot.start(port);