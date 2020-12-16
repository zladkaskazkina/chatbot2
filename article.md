### Facebook Dev Panel Time
First thing you need to do is create a new application. Go to the [Facebook Developer Panel ](https://developers.facebook.com/apps/) and create a new app. Once your inside under 'Add Product' find the Messenger section and click on 'get started'.
![facebook panel when you get started.](https://i.imgur.com/G0Q3GdU.png)
After that you'll need to click on the settings tab which will pop up right after. Scroll down until you see this.
![after creating messenger addon](https://i.imgur.com/FKBbpt9.png)
There are two important sections to note here 'Token Generation' and 'Webhooks'.  The first one we are going to touch on is token generation. Select a facebook page your going to use this will be the account you send a message to.
![p](https://i.imgur.com/Xh9Rwom.png)
After you picked a page from the drop down it will generate a page access token. You can now go back and add this to your .env file. Once that is done we are going to change our focus to the webhooks.

Once you click on the button that says 'setup webhooks' you will see this. It may seem scary at first but don't worry.
![scary webooks. SPOOOKY](https://i.imgur.com/zxt1Mmg.png)
The only subscription fields you need to select are messages, messaging_postbacks, messaging_optins, and message_deliveries. Now for the verification token field. Do you remember the variable you created in your .env file under VERIFY_TOKEN? That is exactly what you want to put inside the box in this modal. For the callback url use the url from local tunnel and add '/webhook' to the end for me that would be https://noahsmessengerbog.localtunnel.me/webhook. If you filled in the fields correctly it should look something like this. 
![enter image description here](https://i.imgur.com/uF15Th3.png)
Now go back to your application and make sure that is is running and you are also fowarding the url. Double check the url and make sure it's the same thing as shown in the callback url field.

Once it is all running succesfully you can click 'verify and save' this will have facebook send a request to the callback url and expect you to return the correct item from a json object. 

At this point you should have almost all of the items you need inside of the .env file except for the App Secret. This can be easily found by going to your dashboard. 
