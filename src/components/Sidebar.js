import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faTag, faFolder, faCog } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #2d2d2d;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const UserImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const UserName = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #fff;
`;

const UserEmail = styled.p`
  margin: 0;
  font-size: 14px;
  color: #b0b0b0;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
  background-color: #3e3e3e;
  color: #fff;
  font-size: 14px;
  &:focus {
    outline: none;
    background-color: #4a4a4a;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonIcon = styled.div`
  font-size: 16px;
  margin-right: 10px;
`;

const ButtonText = styled.span`
  font-size: 16px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${props => (props.active ? '#444' : 'transparent')};
  &:hover {
    background-color: #333;
  }
`;

const ListIcon = styled.div`
  font-size: 16px;
  margin-right: 10px;
`;

const ListText = styled.span`
  font-size: 14px;
`;

const Sidebar = ({ onNewNote }) => {
  const router = useRouter();
  const { pathname } = router;

  const isActive = (path) => pathname === path;

  return (
    <SidebarContainer>
      <UserSection>
        <UserImage src="/path/to/user-image.jpg" alt="User" />
        <UserName>John Doe</UserName>
        <UserEmail>john.doe@example.com</UserEmail>
      </UserSection>
      <SearchInput type="text" placeholder="Search notes..." />
      <Button onClick={onNewNote}>
        <ButtonIcon>
          <FontAwesomeIcon icon={faPlus} />
        </ButtonIcon>
        <ButtonText>New Note</ButtonText>
      </Button>
      <ListItem active={isActive('/tags')}>
        <ListIcon>
          <FontAwesomeIcon icon={faTag} />
        </ListIcon>
        <ListText>Tags</ListText>
      </ListItem>
      <ListItem active={isActive('/notebooks')}>
        <ListIcon>
          <FontAwesomeIcon icon={faFolder} />
        </ListIcon>
        <ListText>Notebooks</ListText>
      </ListItem>
      <ListItem active={isActive('/settings')}>
        <ListIcon>
          <FontAwesomeIcon icon={faCog} />
        </ListIcon>
        <ListText>Settings</ListText>
      </ListItem>
    </SidebarContainer>
  );
};

export default Sidebar;
