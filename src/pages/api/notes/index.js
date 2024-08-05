import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('mydatabase');
  const notesCollection = db.collection('notes');

  if (req.method === 'GET') {
    // Get all notes
    const notes = await notesCollection.find({}).toArray();
    res.status(200).json(notes);
  } else if (req.method === 'POST') {
    // Create a new note
    const { title, content } = req.body;
    const result = await notesCollection.insertOne({ title, content });
    res.status(201).json(result.ops[0]);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
