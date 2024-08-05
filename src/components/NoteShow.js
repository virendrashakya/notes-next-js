import React from 'react';
import styled from 'styled-components';

const NoteShowContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 15px;
  color: #333;
`;

const Content = styled.div`
  font-size: 1.2em;
  color: #666;
`;

const NoteShow = ({ note }) => {
  return (
    <NoteShowContainer>
      <Title>{note.title}</Title>
      <Content dangerouslySetInnerHTML={{ __html: note.content }} />
    </NoteShowContainer>
  );
};

export default NoteShow;
