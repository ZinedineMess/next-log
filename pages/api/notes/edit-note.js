import clientPromise from "../../../lib/mongodb";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("next-log-db");
        const { id } = req.query;
        const { title, content, author } = req.body;

        const note = await db
            .collection("notes")
            .updateOne(
                {
                    "_id": ObjectId(id)
                },
                {
                    $set: {
                        "title": title,
                        "content": content,
                        "author": author
                    }
                }

            );

        res.json(note);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};