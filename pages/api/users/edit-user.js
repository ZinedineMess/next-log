import clientPromise from "../../../lib/mongodb";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("next-log-db");
        const { id } = req.query;
        const { name, email, password } = req.body;

        const user = await db
            .collection("users")
            .updateOne(
                {
                    "_id": ObjectId(id)
                },
                {
                    $set: {
                        "name": name,
                        "email": email,
                        "password": password
                    }
                }

            );

        res.json(user);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};