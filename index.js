//Connect to twitter
const Twitter = require("twitter");
const Sheet = require("./sheet");
//Connect to Google Sheet

(async function () {
  const client = new Twitter({
    consumer_key: "ks6rF8qciuufHAShae5u5AF0f",
    consumer_secret: "O1v6HUUKvN5sgKDfSThxUeBaRt6WxOQ1hHL3CE5yAvjolqM6oQ",
    access_token_key: "1302301973472063488-oF16sx5PwqknNylCOjBpyOKQ08FzlB",
    access_token_secret: "a9geKkCe5E198NQwxWXLTGi19jtBDerddTM4eki7ve1UQ",
  });
  //   const client = new Twitter({
  //     consumer_key: process.env.TWITTER_CONSUMER_KEY,
  //     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  //     access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  //     access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  //   });

  const sheet = new Sheet();
  await sheet.load();
  //   console.log(sheet);
  const quotes = await sheet.getRows();

  //   const quotes = rows.map((chunk) => chunk._rawData).flat();
  const status = quotes[0].quote;
  //   console.log("quotes:", quotes);

  //Send the tweet

  console.log(status);

  if (status && status.length < 281) {
    client.post(
      "statuses/update",
      { status: `${status} #samharris` },
      function (error, tweet, response) {
        if (error) throw error;
      }
    );

    //remove quote from spreadsheet
    await quotes[0].delete();
    console.log("Tweet Successful");
    return;
  }

  //quote too long or doesn't exist
  console.error("quote empty or too long");
  await quotes[0].delete();
})();
