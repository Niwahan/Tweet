require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const { twitterClient } = require("./twitterClient.js");
const { download, getRandomImage } = require("./utilities.js");
const CronJob = require("cron").CronJob;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const replyMessages = [
  "इलामको जनताको दुख, मर्म नाजिकबाट नियालेका, बुजेका व्यक्ति्व हुन डम्बर खड्का। Covid-19 जस्तो महामारिमा पनि स्वार्थहिन सेवा भाव राखि जनतालाई सहयोग गर्नका निमित्त त्तपर रहेका व्यक्ति हुन डम्बर खड्का। #Vote_Tree #Vote_DambarKhadka #Vote_SocialWorker",
  "#Vote_Tree #Vote_DambarKhadka #Vote_SocialWorker",
  "विचारहिन दल तथा व्यक्तिवलाई बहिष्कार गरौं युवा पुस्ताले सुधार्न आवश्यक छ्। #यवा_जागौँ #डम्बर_खड्कालाई_जिताआौं इलाममा परिवर्तन आवश्यक छ्। वैचारिक व्यक्ति्वलाई जिताआौं। #Vote_Tree #Vote_DambarKhadka #Vote_SocialWorker",
  "उत्पादित कच्चा पदार्थलाई प्रवर्धन तथा अनुसन्धान गरिvlv राष्ट्रिय तथा अन्तराष्ट्रिय बजारीकरण गर्ने र सोको लागि आवश्यक लगानी लगानीकर्ताहरुलाई निमत्रणाको लागि  इलाम लगानी सम्मेलन २०८२ सम्मको उदाहरणिय निति तथा दिगो द्रिष्टी बोकेका समाजसेवी व्यक्ति हुन डम्बर खड्का #Vote_DambarKhadka",
  "हाम्रो समाजलाई समृद्ध बनाउन,असमानतामुक्त र सम्पन्न बनाउन हाम्रो आत्मनिर्भरता र आत्मविश्वासको आवश्यकता छ। उनीहरूको अद्वितीयता,अनुशासन,र जनहितमा बढ्ने आत्मनिर्भरताले हामीलाई समाजको नयाँ चित्रण गर्ने सहजता प्रदान गर्दछ। हाम्रो समाजलाई उत्कृष्टताको दिशामा बडाउन #Vote_DambarKhadka",
  "इलामको जनताको दुख, मर्म नाजिकबाट नियालेका, बुजेका व्यक्ति्व हुन डम्बर खड्का। Covid-19 जस्तो महामारिमा पनि स्वार्थहिन सेवा भाव राखि जनतालाई सहयोग गर्नका निमित्त त्तपर रहेका व्यक्ति हुन डम्बर खड्का। #Vote_Tree #Vote_DambarKhadka #Vote_SocialWorker",
  // Add more reply messages as needed
];

const getRandomReply = () => {
  const randomIndex = Math.floor(Math.random() * replyMessages.length);
  return replyMessages[randomIndex];
};

const tweet = async () => {
  const replies = getRandomReply();
  const imageFile = getRandomImage();

  try {
    const mediaId = await twitterClient.v1.uploadMedia(imageFile);
    await twitterClient.v2.tweet({
      text: replies,
      media: {
        media_ids: [mediaId],
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const cronTweet = new CronJob("30 * * * * *", async () => {
  tweet();
});

cronTweet.start();

// // Route to fetch tweets from home timeline
// app.get("/tweets", async (req, res) => {
//   try {
//     const tweets = await twitterClient.tweets.statusesHomeTimeline({
//       count: 10,
//     }); // Fetch 10 tweets from home timeline
//     res.json(tweets);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch tweets" });
//   }
// });

// // Route to reply to a tweet
// app.post("/reply", async (req, res) => {
//   try {
//     const { tweetId } = req.body; // Assuming tweetId and replyText are sent in the request body
//     const replyText = getRandomReply();
//     await twitterClient.tweets.statusesUpdate({
//       status: replyText,
//       in_reply_to_status_id: tweetId, // Reply to the specified tweet
//     });
//     res.send("Reply sent successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to send reply" });
//   }
// });
