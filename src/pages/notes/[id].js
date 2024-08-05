import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import NoteEditor from '../../components/NoteEditor';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f4f4f4;
  padding: 20px;
`;

const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const NoteTitle = styled.h1`
  margin: 0;
  font-size: 2.5em;
`;

const NoteActions = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
`;

const NoteContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const NoteShowPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        try {
          const response = await fetch(`/api/notes/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setNote(data);
        } catch (error) {
          console.error('Failed to fetch note:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchNote();
    }
  }, [id]);

  const handleSave = async (updatedNote) => {
    try {
      const response = await fetch(`/api/notes/${updatedNote._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });
      if (!response.ok) {
        throw new Error('Failed to save note');
      }
      router.push('/');
    } catch (error) {
      console.error('Failed to save note:', error);
      setError('Failed to save note');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
      router.push('/');
    } catch (error) {
      console.error('Failed to delete note:', error);
      setError('Failed to delete note');
    }
  };

  if (loading) return <p>Loading note...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!note) return <p>Note not found</p>;

  return (
    <Container>
      <NoteHeader>
        <NoteTitle>{note.title || 'Untitled'}</NoteTitle>
        <NoteActions>
          <Button onClick={() => handleSave(note)}>Save</Button>
          <Button onClick={handleDelete} style={{ backgroundColor: '#dc3545' }}>Delete</Button>
        </NoteActions>
      </NoteHeader>
      <NoteContent>
        <NoteEditor note={note} onSave={handleSave} />
      </NoteContent>
    </Container>
  );
};

export default NoteShowPage;
