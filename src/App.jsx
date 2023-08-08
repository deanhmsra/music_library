import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'

function App() {
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const [message, setMessage] = useState("Search for Music!")

  const API_URL = "https://itunes.apple.com/search?term="

  useEffect(() => {
    if(search) {
    const fetchData = async () => {
      document.title = `${search} Music`
      const response = await fetch(API_URL + search)
      const resData = await response.json()
      if (resData.results.length) {
        setData(resData.results)
      } else {
        setMessage("Not found!")
      }
   }
    fetchData()
  }
  }, [search])

const handleSearch = (e, term) => {
  e.preventDefault()
  setSearch(term)
}

  return (
    <div className="App">
      {message}
        <Router>
          <Routes>
            <Route path="/" element= {
              <>
                <SearchBar handleSearch = {handleSearch}/>
                <Gallery data={data} />
              </>
            } />
              <Route path="/album/:id" element={<AlbumView />} />
              <Route path="/artist/:id" element={<ArtistView />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;

