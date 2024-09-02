import React, { useState,useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts/Contacts";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Welcome from "../components/Welcome/Welcome";
import ChatContainer from "../components/ChatContainer/ChatContainer";
import { io } from "socket.io-client";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const socket = useRef();

  useEffect(() => {
    const getUsers = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    };
    getUsers();
  }, [navigate]);

    // useEffect(() => {
    //     if (currentUser) {
    //       socket.current = io(host, {
    //           withCredentials: true,
    //         });
    //         socket.current.emit("add-user", currentUser.id)
    //     }
  // }, [currentUser]);
  
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host, {
        withCredentials: true,
      });
      socket.current.emit("add-user", currentUser.id);
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [currentUser]);
    
    
  useEffect(() => {
    const getCurrentUser = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data.data);
          } catch (err) {
            console.log(err);
          }
        }
      }
    };
    getCurrentUser();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  
     useEffect(() => {
  if (currentUser && currentUser._id) {
    socket.current.emit("add-user", currentUser._id);
    console.log("User added:", currentUser._id);
  } else {
    console.log("Current user is null or undefined");
  }
    }, [socket, currentUser]);
    
    useEffect(() => {
  const fetchUserData = async () => {
    const data = await JSON.parse(localStorage.getItem("chat-app-user"));
    if (data && data._id) {
      setCurrentUser(data);
    } else {
      console.log("User data not found in local storage");
    }
  };
  fetchUserData();
    }, []);
    
  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
        <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #000000;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
