const twilio = require('twilio');

const ACCOUNTSID = 'ACab3a2a421a540260c3ffb8f289f1a134'; // Your Account SID from www.twilio.com/console
const AUTHTOKEN = '0063e5a238bdab11be999bd3805422d2';   // Your Auth Token from www.twilio.com/console
const client = new twilio(ACCOUNTSID, AUTHTOKEN);

client.messages.create({
    body: 'Hello from Node',
    to: '+9176370338',  // Text this number
    from: '+9176370338' // From a valid Twilio number
})
.then((message) => console.log(message.sid));