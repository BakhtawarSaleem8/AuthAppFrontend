import React from 'react'
import { IconType } from "react-icons";

type Props = {
    text:string,
    onclick?:()=>void,
    type?:"button" | "submit" | "reset" | undefined,
    classname?:"" | String,
    textColor : string,
    Icon? : IconType ,
    iconSize? : number,
}

const AnimatedButton = (props: Props) => {
    const {text="" , onclick=()=>{} , type="button" , classname = "", textColor = "" , Icon , iconSize=16 , ...prop} = props || {}
  return (
    // <button style={{color:`${textColor}`}} type={type} className={`${classname} rounded-md bg-white cursor-pointer text-[${textColor}] p-2 max-h-10 max-w-40 flex items-center gap-2 font-semibold w-16 hover:w-28 transition-all ease-in-out delay-100`} onClick={onclick}>{text}{Icon && <Icon size={iconSize} fill={textColor}/>}</button>
    <button
    style={{ color: `${textColor}` }}
    type={type}
    className={`${classname} relative group overflow-hidden rounded-md bg-white cursor-pointer px-2 py-4 max-h-14 max-w-40 flex items-center justify-center gap-2 font-semibold w-16 hover:w-24 transition-all ease-in-out delay-100`}
    onClick={onclick}
    {...prop}
  >
    {/* Text */}
    <span
      className={`absolute left-0 right-0 text-center transition-all duration-300 ease-in-out
    `}
    >
      {text}
    </span>
    
    {/* Icon */}
    {Icon && (
      <span
        className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
        style={{ right: "8px" }}
      >
        <Icon size={iconSize} fill={textColor} />
      </span>
    )}
  </button>
  )
}

export default AnimatedButton