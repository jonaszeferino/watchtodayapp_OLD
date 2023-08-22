import client from "../../../mongoConnection";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const collection = client.db("moviesSeriesLikes").collection("movieLikes");

  try {
    const user_id = parseInt(req.query.user_id);

    if (isNaN(user_id)) {
      res.status(400).json({ error: "user_id must be a valid number" });
      return;
    }

    const matchStage = user_id ? { user_id: user_id } : {};
    const pipeline = [{ $match: matchStage }];

    const result = await collection.aggregate(pipeline).toArray();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
