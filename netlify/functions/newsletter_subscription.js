const mailchimp = require("@mailchimp/mailchimp_marketing");
const md5 = require("md5");
const config = require("../../config/mailchimp-ids.json");

const getInterests = (interests) => {
    const interestsObject = {};
    const allInterests = config.interests;
    Object.keys(interests).forEach((key) => {
        interestsObject[allInterests[key]] = interests[key]==true ? true : false;
    })
    return interestsObject;
}


exports.handler = async function (event) {
    if (event.httpMethod == 'POST') {
        const listId = config.listId;
        const { email, name, interests } = JSON.parse(event.body)
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
                status: "subscribed",
                interests: getInterests(interests)
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