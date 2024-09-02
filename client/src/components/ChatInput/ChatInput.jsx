import React, { useEffect,useRef, useState } from "react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");
    const pickerRef = useRef(null);

  // const inputRef = createRef();
  // const [cursorPosition, setCursorPosition] = useState();
  const handleEmojiPickerHideShow = () => {
      setShowEmojiPicker(!showEmojiPicker);
    };

useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowEmojiPicker(false);
      }
    };

    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
}, [setShowEmojiPicker]);
    
   

  const handleEmojiClick = (emojiObject) => {
    let message = msg;
    message += emojiObject.native;
      setMsg(message);
     
    console.log(emojiObject.native);
  };

  // const handleEmojiClick = (event, { emoji }) => {
  //     const ref = inputRef.current;
  //     ref.current();
  //     const start = msg.substring(0, ref.selectionStart);
  //     const end = msg.substring(ref.selectionStart);
  //     const text = start + emoji + end;
  //     setMsg(text);
  //     setCursorPosition(start.length + emoji.length);
  //     console.log(emoji);
  //    }

  //  useEffect(() => {
  //     if (inputRef.current) {
  //       inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
  //     }
  //   }, [cursorPosition]);

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <div className="emoji-wrapper" ref={pickerRef}>
              <Picker
                //   className="emoji-picker-react"
                data={data}
                onEmojiSelect={handleEmojiClick}
                previewPosition="none"
              />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="type your message here"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};



const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

// const Container = styled.div`
//   display: grid;
//   grid-template-columns: 5% 95%;
//   align-items: center;
//   background-color: #080420;
//   padding: 0.2rem;
//   padding-bottom: 0.3rem;
//   .button-container {
//     display: flex;
//     align-items: center;
//     color: white;
//     gap: 1rem;
//     .emoji {
//       position: relative;
//       svg {
//         font-size: 1.5rem;
//         color: #ffff00c8;
//         cursor: pointer;
//         margin-left: 1rem;
//       }
//       .emoji-wrapper {
//         position: absolute;
//         top: -450px;
//         background-color: #080420;
//         box-shadow: 0 4px 7px #9a86f3;
//         border-color: 1px solid #9a86f3;
//       }
//     }
//   }
//   .input-container {
//     width: 100%;
//     height: 60%;
//     background-color: gray;
//     border-radius: 2rem;
//     gap: 2rem;
//     display: flex;
//     align-items: center;

//     input {
//       width: 90%;
//       height: 60%;
//       background-color: transparent;
//       color: white;
//       border: none;
//       padding-left: 1rem;
//       margin-left: 1rem;
//       font-size: 1.2rem;
//       &::selection {
//         background-color: #9186f3;
//       }
//       &::focus {
//         outline: none;
//       }
//     }
//     button {
//       padding: 0.3rem 2rem;
//       border-radius: 2rem;
//       display: flex;
//       align-items: center;
//       background-color: #9186f3;
//       border: none;
//       cursor: pointer;
//       svg {
//         color: white;
//         font-size: 1.5rem;
//       }
//     }
//   }
// `;
export default ChatInput;
