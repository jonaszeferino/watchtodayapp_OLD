import client from "../../mongoConnection";
export default async function handler(req, res) {
  const collection = client.db("moviesSeriesLikes").collection("movieLikes");

  switch (req.method) {
    case "POST":
      const body = JSON.parse(req.body);
      const inPutMongo = await collection.insertOne(body); // iserir azar
      res.json({
        status: "Like Salvo",
        statusCode: 200,
        data: inPutMongo,
      });
      break;

    default:
      break;
  }
}
