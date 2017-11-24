const twilio = require('twilio');

const ACCOUNTSID = 'ACab3a2a421a540260c3ffb8f289f1a134'; // Your Account SID from www.twilio.com/console
const AUTHTOKEN = '0063e5a238bdab11be999bd3805422d2';   // Your Auth Token from www.twilio.com/console
const client = new twilio(ACCOUNTSID, AUTHTOKEN);

client.messages.create({
    to: '+6466677792',  // Text this number
    from: '12017811863', // From a valid Twilio number
    body: 'Hello, sihan =。='
})
.then((message) => console.log(message.sid));