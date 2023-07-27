import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [word, setWord] = useState<string>('');
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setWord(e.currentTarget.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const response = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
    if (response.ok) {
      const data = await response.json();
      const synonyms_data = data.map((item: { word: string }) => item.word);
      setSynonyms(synonyms_data);
      setError(false);
    } else {
      setError(true);
    }
  }

  const handleClick = async (e: React.FormEvent<HTMLLIElement>) => {
    e.preventDefault();
    setWord(e.currentTarget.innerText);
    const response = await fetch(`https://api.datamuse.com/words?rel_syn=${e.currentTarget.innerText}`);
    if (response.ok) {
      const data = await response.json();
      const synonyms_data = data.map((item: { word: string }) => item.word);
      setSynonyms(synonyms_data);
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <>
      <form>
        <label htmlFor="name">Word </label>
        <input type="text" id="name" onChange={handleChange} value={word} />
        <input type="submit" value="Search" onClick={handleSubmit} />
      </form>
      <div>
        {error ? <p>There was an error</p> : null}
        {synonyms.length === 0 ? <p>No synonyms found</p> : null}
        <ul>
          {synonyms.map((synonym, index) => (
            <li key={index} onClick={handleClick}>{synonym}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
