import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("next-log-db");
        const { name, email, password } = req.body;

        const user = await db
            .collection("users")
            .insertOne({
                name,
                email,
                password
            });

        res.json(user);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};