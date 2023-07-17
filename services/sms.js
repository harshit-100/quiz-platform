const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const smsService = (phoneNumber, res) => {
  try {
    const otp = Math.floor(Math.random() * 900000) + 90000;
    client.messages
      .create({
        from: "+16187452786",
        to: `+91${phoneNumber}`,
        body: `Your OTP:${otp} \n Thank You.`,
      })
      .then(() => {
        return otp;
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    return 1;
  }
};

module.exports = smsService;
