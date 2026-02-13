import { useEffect, useState } from "react"
import Images from "./componet/images"

function App() {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY
  const [imageUrl, setImageUrl] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const storedImg = localStorage.getItem("searchImage")

    storedImg ? setImageUrl(JSON.parse(storedImg)) : []
    
  }, [])

  useEffect(() => {  
      if (imageUrl.length === 0) {
        localStorage.removeItem("searchImage")
      }else {
        localStorage.setItem("searchImage", JSON.stringify(imageUrl))
      }
  }, [imageUrl])

  const fetchData = async () => {
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setPage(prev => prev + 1)

     try {
      const resp = 
      await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=2&client_id=${ACCESS_KEY}`
      )

      const data = await resp.json()
      setImageUrl(prev => [...prev, ...data.results])
      } catch {
        setError("Faild To Fetch Data.")
      }finally {
        setLoading(false)
      }

  }

   const handleDeleteBtn = (id) => {
        setImageUrl(prev => 
          prev.filter(item => item.id !== id)
        )
    }

    const addPages = () => {
      setPage(prev => prev + 1)
      fetchData()
    }

  return (
    <>
     <Images
      imag={imageUrl}
      dltImage={handleDeleteBtn}
      setInput={setQuery}
      input={query}
      onClick={fetchData}
      loading={loading}
      errors={error}
      setPages={addPages}
    />
    </>
  )
}

export default App