const mailchimp = require("@mailchimp/mailchimp_marketing");
const md5 = require("md5");

exports.handler = async function (event) {
    if (event.httpMethod == 'POST') {
        const listId = "d5aaf678de";
        const { email, name } = JSON.parse(event.body)
        const subscriberHash = md5(email.toLowerCase());
        try {
            mailchimp.setConfig({
                apiKey: process.env.MAILCHIMP_API_KEY,
                server: process.env.MAILCHIMP_API_SERVER
            });

            const response = await mailchimp.lists.setListMember(listId, subscriberHash, {
                email_address: email,
                merge_fields: {
                    FNAME: name
                },
                status: "subscribed"
            });

            return {
                statusCode: 200,
                body: JSON.stringify(response)
            }
        } catch (err) {
            console.log(err);
            return {
                statusCode: err.status,
                body: JSON.stringify(err)
            }
        }
    } else {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "The specified HTTP method is not allowed."
            })
        }
    }
}