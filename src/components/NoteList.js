import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const NoteListContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const NoteItem = styled.div`
  padding: 15px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const NoteList = ({ notes }) => {
  return (
    <NoteListContainer>
      {notes.map((note) => (
        <Link href={`/notes/${note._id}`} key={note._id} passHref>
          <NoteItem>
            <h3>{note.title}</h3>
            <p>{note.content.slice(0, 50)}...</p>
          </NoteItem>
        </Link>
      ))}
    </NoteListContainer>
  );
};

export default NoteList;
