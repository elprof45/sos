"use client";;
import { alertCheck } from "@/actions/actions";

export type typeData ={
    id: string,
    isCheck: boolean,
    createdAt: Date,
    UserId: string,
}

export default function AlertCard({data}:{data:typeData}) {
  
  return (
    <div className={`card lg:card-side  shadow-xl ${data.isCheck ? "bg-green-500" : "bg-red"} `}>
    <div className="card-body">
      <div>
        {data.createdAt.toUTCString()}
      </div>
      <h2 className="card-title">New Alert!</h2>
      <p>Click the button to listen on Spotiwhy app.</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary" disabled={data.isCheck} onClick={() => {
          alertCheck(data.id)
        }}>Check</button>
      </div>
    </div>
  </div>
  )
}
