import React, { useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const NoteEditorContainer = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  font-size: 1.5em;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-bottom: 1px solid #ddd;
`;

const SaveButton = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

const NoteEditor = ({ note, onSave }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  const handleSave = () => {
    onSave({ ...note, title, content });
  };

  return (
    <NoteEditorContainer>
      <TitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
      />
      <ReactQuill value={content} onChange={setContent} />
      <SaveButton onClick={handleSave}>Save Note</SaveButton>
    </NoteEditorContainer>
  );
};

export default NoteEditor;
