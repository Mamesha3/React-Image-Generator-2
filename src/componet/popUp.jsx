import { useState } from "react"

export default function PopUp({ closeDis, passedImg, download }) {
    const [isDescribe, setIsDescribe] = useState(false)
    const [text, setText] = useState('')

    const getDiscribe = (value) => {
        setIsDescribe(true)
        setText(value)
    }
    return (
        <div className="display_container">
            <div className="display_image">
                {isDescribe ? 
                 <div className="discribe" onClick={() => setIsDescribe(false)}>
                    <p>{text}</p>
                 </div>
                :
                <img 
                onClick={() => getDiscribe(passedImg.alts)}
                src={passedImg.img} 
                alt={passedImg.alts} 
                key={passedImg.id}/>}
            </div>
            <div className="buttons">
                {!isDescribe ? <button className="downlod"
                onClick={() => download(passedImg.img, passedImg.id)}
                >Download
                </button> : null}
                <span><strong>{passedImg.name}</strong></span>
                <button
                onClick={closeDis}
                >close
                </button>
            </div>
        </div>
    )
}