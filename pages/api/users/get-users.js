import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("next-log-db");

        const users = await db
            .collection("users")
            .find({})
            .limit(20)
            .toArray();

        res.json(users);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};