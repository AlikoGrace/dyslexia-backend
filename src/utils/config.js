const {AUTH_EMAIL, AUTH_PASS}= process.env;
const nodeMailerConfig = {
    host:"smtp-mail.outlook.com",

    auth: {
        user:AUTH_EMAIL,
        pass:AUTH_PASS,
    },
}
module.exports = nodeMailerConfig