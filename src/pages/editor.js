import React, { useState, useEffect } from 'react';
import NoteEditor from '../components/NoteEditor';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const EditorPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const EditorPage = () => {
  const router = useRouter();
  const { noteId } = router.query;

  const [note, setNote] = useState({ title: '', content: '' });

  useEffect(() => {
    if (noteId) {
      const fetchNote = async () => {
        const response = await fetch(`/api/notes/${noteId}`);
        const data = await response.json();
        setNote({
          title: data.title,
          content: data.content,
        });
      };

      fetchNote();
    }
  }, [noteId]);

  const handleSave = async (updatedNote) => {
    if (updatedNote.id) {
      await fetch(`/api/notes/${updatedNote.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });
    } else {
      await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });
    }
    router.push('/');
  };

  return (
    <EditorPageContainer>
      <NoteEditor note={note} onSave={handleSave} />
    </EditorPageContainer>
  );
};

export default EditorPage;
