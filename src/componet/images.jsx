import { useState } from "react"
import PopUp from "./popUp"

export default function Images({ dltImage, imag, setInput, input, onClick, loading, errors}) {

       async function handlDownload(url, id) {
        try {
            const res = await fetch(url)
            const blob = await res.blob()

            const blobUrl = window.URL.createObjectURL(blob)

            const link = document.createElement("a")
            link.href = blobUrl
            link.download = `image-${id}.jpg`

            document.body.appendChild(link)
            link.click()

            document.body.removeChild(link)
            window.URL.revokeObjectURL(blobUrl)
        } catch (error) {
            console.log("Download Feild", error)
            alert("Failed to fetch!. Has No Internet or Network Error")
        }
    }

    const [passedImg, setPassedImg] = useState({})
    const [isPass, setIsPass] = useState(false)
    const [addClass, setAddClass] = useState("")
    const passImage = (value, id, name, discribe) => {
      setIsPass(true)
      setPassedImg({id: id, img: value, name: name, alts: discribe})
      setAddClass("blurs")
    }

    const closeDisplay = () => {
      setIsPass(false)
      setPassedImg({})
      setAddClass("")
    }

    console.log(passedImg)
    return (
      <>
       <div className="image_container">
          <div className="image_inputs">
            <input type="text" name="image"
             value={input} 
             onChange={(e) => setInput(e.target.value)}
            />
            <button
             onClick={onClick}
             className="getImages"
            >Get Images</button>
          </div>
          {loading && <p>Loading...</p>}
          {errors && <p>{errors}</p>}
          <div className="images">
            {isPass && <PopUp 
            closeDis={closeDisplay}
            passedImg={passedImg}
            download={handlDownload}
            />}
            {imag.map(item => {
              return <div className={`image ${addClass}`}>
                <img 
                onClick={() => passImage(item.urls.small, item.id, item.user.first_name, item.alt_description)}
                src={item.urls.small} 
                key={item.id} 
                alt={item.alt_description} />

                <div className="containe">
                   <button 
                    onClick={() => handlDownload(item.download_url, item.id)}
                    >Download</button>
                    <span><strong>{item.user.first_name}</strong></span>
                    <button
                    className="delete"
                    onClick={() => dltImage(item.id)}
                    >X</button>
                  </div>
                </div>
            })}
          </div>
          
       </div>
      </>
    )
}