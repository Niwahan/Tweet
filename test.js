require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const { twitterClient } = require("./twitterClient.js");
const { getRandomImage } = require("./utilities.js");
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

  const searchAndComment = async () => {
    try {
      // Perform a search for tweets based on a specific keyword or hashtag
      const searchResults = await twitterClient.v2.search('your_search_query_here');
  
      // Iterate through each search result
      for (const tweet of searchResults) {
        // Extract tweet ID and other relevant information
        const tweetId = tweet.id;
        const tweetText = tweet.text;
  
        // Determine if you want to reply to this tweet based on certain criteria
        const shouldReply = yourConditionHere;
  
        if (shouldReply) {
          // Compose your reply message
          const replyMessage = 'Your reply message here';
  
          // Reply to the tweet
          await twitterClient.v2.reply(tweetId, {
            text: replyMessage,
          });
  
          console.log('Replied to tweet:', tweetText);
        }
      }
    } catch (error) {
      console.error('Error searching and commenting:', error);
    }
  };
  
  // Call the function to search and comment on tweets
  searchAndComment();
  
const replyToTweets = async () => {
  try {
    // Fetch tweets from the home timeline
    const tweets = await twitterClient.v2.homeTimeline();

    // Iterate through each tweet
    for (const tweet of tweets) {
      // Compose reply message and select random image
      const replyMessage = getRandomReply();
      const imagePath = getRandomImage();

      // Upload media to Twitter
      const mediaId = await twitterClient.v1.uploadMedia(imagePath);

      // Reply to the tweet with the composed message and uploaded media
      await twitterClient.v2.reply(tweet.id, {
        text: replyMessage,
        media: {
          media_ids: [mediaId],
        },
      });

      console.log("Replied to tweet:", tweet.text);
    }
  } catch (error) {
    console.error("Error replying to tweets:", error);
  }
};

// Call the function to reply to tweets
replyToTweets();
