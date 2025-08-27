import { useState } from 'react';
import './Qr.css';

export const Qrcode = () => {
  const [img,setImg]=  useState("");
  const[loading,setLoading]=useState(false)
  const [qrData,setQrData]=useState("https://youtube.com/")
  const [qrSize,setQrSize]=useState("150")
  
  
  async function GenerateQR(){
     
    setLoading(true);
    try{
   const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
   
   setImg(url)
    }catch(error){
        console.log("Error generating QR Code");
        
    }
    finally
{setLoading(false);
    }}
        
       
    
    function downloadQr(){
        fetch(img)
        .then((response)=>response.blob())
        .then((blob)=>{
            const link=document.createElement("a")
            link.href =URL.createObjectURL(blob);
            link.download="QR.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        }) 

    }
  return (

    <div className='App-cont'>
        <h1>Generate your QR code</h1>
        {loading && <p>Please wait..</p>}
        {img && 
        <img src={img} className='QRimg'/>}
        <div><label htmlFor='dataInput' className='input-label'>Data for QR code:</label>
        <input type="text" value={qrData} id="dataInput" placeholder="Enter data for QR code" onChange={(e)=>setQrData(e.target.value)}/>
        <label htmlFor='sizeInput' className='input-label'>
            Image size (e.g.,150):
        </label>
        <input type="text" value={qrSize} id="sizeInput" placeholder='Enter image size' onChange={(t)=>setQrSize(t.target.value)} />
        <button className='Gen-Btn' disabled={loading} onClick={GenerateQR}>Generate QR Code</button>
        <button className='DW-Btn' onClick={downloadQr}>Download QR Code</button></div>
        <footer>Designed By <a href="">Vincy</a></footer>
    </div>
  )
}
