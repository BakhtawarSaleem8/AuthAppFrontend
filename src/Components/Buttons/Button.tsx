import React from 'react'

type Props = {
    text:string,
    onclick?:()=>void,
    type?:"button" | "submit" | "reset" | undefined,
    isLoading?:boolean,
    loadingComponent?: React.ReactNode;
    classname?:"" | String
}

const Button = (props: Props) => {
    const {text="" , onclick=()=>{} , type="button" , isLoading=false ,loadingComponent=<span>loading...</span> , classname = "" } = props || {}
  return (
    <button type={type} disabled={isLoading} className={`${classname?.includes("bg") ? classname : "bg-blue-500 text-white hover:bg-blue-800"} rounded-md  py-2 px-4 max-h-10 max-w-40 min-h-10 min-w-32 font-semibold`} onClick={onclick}>{isLoading ? loadingComponent :text}</button>
  )
}

export default Button