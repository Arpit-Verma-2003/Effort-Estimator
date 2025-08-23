import React, { useState } from 'react'
const App = () => {
  const [file,setFile] = useState(null)
  const [result, setResult] = useState(null) 
  const handleFileUpload = (e) =>{
    setFile(e.target.files[0])
  }
  console.log(file)
  const convertFileB64 = (file) => { 
      return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result.split(",")[1]) // strip metadata
      reader.onerror = (error) => reject(error)
    })
  }
  const handleSubmit = async () => {
    console.log("submitted")
    if(!file){
      alert('no file uploaded')
      return
    }
    const base64File = await convertFileB64(file)
    const payload = {
        estimation_technique: "used-case based",   
        project_type: "Web App",            
        time_constraint: "3 months",        
        project_scale: "Medium",           
        project_budget: "50000",            
        document_file: base64File,          
        rate_card_file: "" 
    }
    try{
      const response = await fetch("http://localhost:8000/estimate",{
        method:'POST',
        headers:{
          "content-type" : "application/json"
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      setResult(data)
      console.log(data)
    }catch(e){
      console.log(e)
    }
  }
  return (
    <>
      <h1 className='text-5xl'>Effort Estimator</h1>
      <p className=''>Turn complex project documents into clear, data-driven estimates in minutes. Upload your BRD or RFQ, choose an estimation technique, and instantly get effort and cost breakdowns — helping you plan smarter, save time, and make confident decisions.</p>
      <input type="file" onChange={handleFileUpload}/>
      <button onClick={handleSubmit}>Submit</button>
      {result && (
        <pre className="bg-gray-100 p-4 mt-4 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </>
  )
}

export default App;

