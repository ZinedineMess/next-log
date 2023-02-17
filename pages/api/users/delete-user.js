import clientPromise from "../../../lib/mongodb";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("next-log-db");
        const { id } = req.query;

        const user = await db
            .collection("users")
            .deleteOne({
                '_id': ObjectId(id)
            })

        res.json(user);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};