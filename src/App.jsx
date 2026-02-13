import { useEffect, useState } from "react"
import Images from "./componet/images"
import PopUp from "./componet/popUp"

function App() {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY
  const [imageUrl, setImageUrl] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
    setLoading(true)
    setError(null)

     try {
      const resp = 
      await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}`
      )

      const data = await resp.json()
      setImageUrl(prev => [...prev, ...data.results])
      console.log(data)
      console.log(imageUrl.results)
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
    />
    </>
  )
}

export default App