"use client";
export default function ButtomClick({alert}:{alert:()=>{}}) {
    
  return (
    <div className="flex justify-center px-4">
    <button id="sendSOS" className="bg-blue-500 text-white  font-semibold py-2 px-4 rounded-lg w-full" onClick={()=>
      alert()
    }>
      Envoi Alerte SOS
    </button>
  </div>
  )
}
