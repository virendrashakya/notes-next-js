import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import NoteList from '../components/NoteList';
import { useRouter } from 'next/router';

const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Expected data to be an array');
        }
        setNotes(data);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleNewNote = () => {
    router.push('/editor');
  };

  return (
    <HomeContainer>
      <Sidebar onNewNote={handleNewNote} />
      <MainContent>
        {loading && <p>Loading notes...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && <NoteList notes={notes} />}
      </MainContent>
    </HomeContainer>
  );
};

export default Home;
