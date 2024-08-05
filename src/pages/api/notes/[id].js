import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('mydatabase');
  const notesCollection = db.collection('notes');
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      // Get a single note by id
      const note = await notesCollection.findOne({ _id: new ObjectId(id) });
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ message: 'Note not found' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
