import { connectionRdsMySql } from "../../../components/connectiondb";

export default async function handler(req, res) {
  const connection = await connectionRdsMySql();

  try {
    const { movie_id, like_movie, movie_name, user_id, createdDate } = req.body;

    const query =
      "INSERT INTO movielikes (movie_id, like_movie, movie_name, user_id, createdDate) VALUES (?, ?, ?, ?, ?)";
    const values = [
      movie_id ? movie_id : null,
      like_movie ? like_movie : null,
      movie_name ? movie_name : null,
      user_id ? user_id : null,
      createdDate ? createdDate : null,
    ];

    const [result] = await connection.execute(query, values);
    connection.end();

    res.status(200).json({ message: "Dados inseridos com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
