import tweepy

api_key = "nmsj2Jt6KaDrjljqDpG0cMxQH"
api_secret = "Q0qc0mUxV9asc6gTxzTuuDOir4Y6k1ZumLZoMbCIGD1tIAkvpl"
bearer_token = r"AAAAAAAAAAAAAAAAAAAAAFKmtQEAAAAARHnd0FaMja7NoXOzyqU8AEvGcTc%3DAlOY9IDugiTxbBXYNe5jcjYLtTkk3qvNp8tvowVHkNU41bcPn2"
access_token = "1781215013107318785-n2e1kqKSIGaNOA4DRJYAkjprlRdULq"
access_token_secret = "mYz7tpsWFdObEciitYZsfzvEyP5RSpGuzDtpKujia9YGO"


client = tweepy.Client(bearer_token, api_key, api_secret, access_token, access_token_secret)

auth = tweepy.OAuth1UserHandler(api_key, api_secret, access_token, access_token_secret)
api = tweepy.API(auth)

#client.create_tweet(text="Test")
person = client.get_user(username="AnishaRai0").data.id

#client.get_users_tweets(id=person, max_results=10)
for tweet in client.get_users_tweets(person).data:
    print(tweet.text)
