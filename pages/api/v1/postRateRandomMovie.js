import client from "../../../mongoConnection";
import moment from "moment-timezone";

export default async function handler(req, res) {
  const {
    movie_id,
    poster_path,
    original_title,
    vote_average_by_provider,
    rating_by_user,
    portuguese_title,
    user_id
  } = req.body;

  let date = moment().tz("UTC-03:00").toDate();
  const collection = client.db("moviesSeriesLikes").collection("movieLikes");

  try {
    const result = await collection.insertOne({
      movie_id: movie_id ? movie_id : null,
      poster_path: poster_path ? poster_path : "/callback_gray.png",
      original_title: original_title ? original_title : null,
      portuguese_title: portuguese_title ? portuguese_title : null,
      vote_average_by_provider: vote_average_by_provider
        ? vote_average_by_provider
        : null,
      rating_by_user: rating_by_user ? rating_by_user : null,
      like_date: date ? date : null,
      user_id: user_id ? user_id : 9999999999
    });

    console.log(result);
    //
    

    res.status(200).json({ message: "Insert Like", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
