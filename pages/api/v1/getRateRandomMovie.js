import client from "../../../mongoConnection";

export default async function handler(req, res) {
  const collection = client.db("moviesSeriesLikes").collection("movieLikes");

  try {
    const { user_id } = req.body; // Agora você obtém o user_id do corpo da requisição
    const matchStage = user_id ? { user_id: user_id } : {}; // Filtro

    const pipeline = [
      { $match: matchStage },
      {
        $group: {
          _id: "$movie_id",
          movieId: { $first: "$movie_id" }, // Renomeia _id para movieId
          poster_path: { $first: "$poster_path" },
          original_title: { $first: "$original_title" },
          portuguese_title: { $first: "$portuguese_title" },
          vote_average_by_provider: { $first: "$vote_average_by_provider" },
          rating_by_user: { $first: "$rating_by_user" },
          like_date: { $first: "$like_date" },
          averageRating: { $avg: "$rating_by_user" },
          count: { $sum: 1 },
        },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
