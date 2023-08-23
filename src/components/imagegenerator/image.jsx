import './image.css'
import default_image from '../assets/default_image.svg'
import { useRef, useState } from 'react'

const Image = () => {

const [imageUrl, setImageUrl] = useState('/')
let inputRef = useRef(null)
const[loading, setLoading] = useState(false);

const imageGenerator = async()=>{
  if(inputRef.current.value === ""){
    return 0;
  }
  setLoading(true)
  const response = await fetch('https://api.openai.com/v1/images/generations',{
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      Authorization:"Bearer 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",
      "User-Agent":"Chrome",
    },
    body:JSON.stringify({
      prompt: `${inputRef.current.value}`,
      n:1,
      size:"512x512",
    }),
  })
  let data = await response.json();
  let data_array = data.data;
  setImageUrl(data_array[0].url)
  setLoading(false)
}

  return (
    <div className='ai-img-generator'>
      <div className='header'>
       AI- Image <span>Generator</span>     </div>
       <div className="img_loading">
        <div className="img">
          <img src={imageUrl === "/"?default_image : imageUrl} alt="" />
          <div className="loadng">
            <div className={loading ? "loadingbarfull" : "loadingbar"}></div>
              <div className={loading ?"loadingtext" : "display-none"}>Loading...
            </div>
          </div>
        </div>
       
       </div>
      <div className="searchbox">
        <input type="text" ref= {inputRef}className='search'  placeholder='Describe what you want to see..'/>
        <div className="generate" onClick={()=>{imageGenerator()}}>Generate</div>
      </div>
      <footer className='footer'>
      ~~ Dhara ~~
    </footer>
    </div>
      
    
  )
}

export default Image
