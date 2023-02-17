import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("next-log-db");
        const { title, content, author } = req.body;

        const note = await db
            .collection("notes")
            .insertOne({
                title,
                content,
                author
            });

        res.json(note);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};