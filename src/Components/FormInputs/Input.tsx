import React , {ReactElement, useState} from 'react'
import { useEffect } from 'react'
import "./input.css"

type MyObject = {
  [key: string]: any;
};
type Props = {
  type:string,
  classname?:string,
  regex?:string | RegExp,
  label: string,
  onchangeHandler:(event: React.ChangeEvent<HTMLInputElement>)=>void,
  inputFields : MyObject
}



const Input = (props: Props) => {
 const {label = "" , type = "" , classname = "" ,  regex = "" , onchangeHandler=()=>{} , inputFields={}}  = props || {}
 console.log(inputFields, "inputfield obj")
    // useEffect(() => {
    //     const lables = document.querySelectorAll("#formControl label")
    //     lables.forEach((label)=>{
    //         const labelElement = label as HTMLLabelElement;

    //         labelElement.innerHTML = labelElement.innerText.split("")
    //        .map((item:String , index:number)=>  (`<span style={{transitionDelay: '${index * 300}ms'}}>${item}</span>`)).join("")
    //     })
    //    }, [])
    useEffect(() => {
         requestAnimationFrame(animate);
      function animate(){
      const labels = document.querySelectorAll("#formControl label");
      
      labels.forEach((label) => {
        const labelElement = label as HTMLLabelElement;
  
        // Split text into spans and append them
        labelElement.innerHTML = labelElement.innerText.split("")
          .map((item: string, index: number) => (
            `<span style={{transitionDelay: '${index * 300}ms'}}>${item}</span>`
          ))
          .join("");
  
        // Use requestAnimationFrame to animate spans
      
      });
    }
    }, []);
  return (
    <div id='formControl' className='flex flex-col relative'>
<input id={label} type={type} name={label} onChange={(e)=>onchangeHandler(e)} value={inputFields[label]}  className={`border-b-2 border-b-blue-800 !focus:border-b-red-600 outline-none ${classname}`} />
<label htmlFor={label} className={`${inputFields[label]?.length > 0 ? "above" : "absolute bottom-1" } text-blue-800 `}>{label}</label>
{ type == "password" && <span className='absolute right-2 bottom-0'>eye</span> }
    </div>
  )
}

export default Input


