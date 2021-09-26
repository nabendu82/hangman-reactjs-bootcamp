import './App.css';
import Figure from './components/Figure';
import Header from './components/Header';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { useEffect, useState } from 'react';
import { notificationPopup } from './components/Helpers'

const words = ['application', 'programming', 'interface', 'wizard', 'javascript', 'design'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetter, setCorrectLetter] = useState([]);
  const [wrongLetter, setWrongLetter] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if(playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if(selectedWord.includes(letter)){
          if(!correctLetter.includes(letter)){
            setCorrectLetter(curr => [...curr, letter]);
          } else {
            notificationPopup(setShowNotification);
          }
        } else {
          if(!wrongLetter.includes(letter)){
            setWrongLetter(curr => [...curr, letter]);
          } else {
            notificationPopup(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetter, wrongLetter, playable])

  function playAgain(){
    setPlayable(true);
    setCorrectLetter([])
    setWrongLetter([])
    selectedWord = words[Math.floor(Math.random() * words.length)];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetter={wrongLetter} />
        <WrongLetters wrongLetter={wrongLetter} />
        <Word selectedWord={selectedWord} correctLetter={correctLetter} />
      </div>
      <Popup correctLetter={correctLetter} wrongLetter={wrongLetter} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
