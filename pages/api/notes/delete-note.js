import clientPromise from "../../../lib/mongodb";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("next-log-db");
        const { id } = req.query;

        const note = await db
            .collection("notes")
            .deleteOne({
                '_id': ObjectId(id)
            })

        res.json(note);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};