import { useState , useEffect} from "react";

type MyObject = {
  [key: string]: any;
};
type Props = {
  type:string,
  classname?:string,
  regex?:string | RegExp,
  label: string,
  error:string,
  options?:Record<string,any>[],
  name : string,
  value? : string
}



export const FormInput = (props:Props) => {
    const {label = "" , type = "" , classname = "" , error = "" , name="" , value=""}  = props || {}
    const [input , setInput] = useState(value ?? "")

    // useEffect(() => {
    //  setInput(value)
    // }, [value])
    
  
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setInput(e.target.value)
    }
    return(
  //     <div className={`flex flex-col gap-1 justify-start ${classname}`}>
  // <label className="text-[#525357] font-semibold">{label}</label>
  // <input id={label} type={type} name={name} value={input} onChange={(e)=>handleInputChange(e)}  className={`border-gray-300 border rounded-md p-2 bg-gray-100 focus:border-blue-400 focus:outline-none  ${type==="textarea" ? "h-28 leading-[112px] !align-top !text-start break-words resize-none overflow-y-auto box-border whitespace-pre-wrap m-0 " : ""}`} />
  //     {  error && <p className="text-red-500 text-sm">{error}</p> }
  //     </div>
  <div className={`flex flex-col gap-1 justify-start ${classname}`}>
  <label className="text-[#525357] font-semibold">{label}</label>
  {type === "textarea" ? <textarea
  id={label} 
  name={name} 
  value={input} 
  onChange={(e) => handleInputChange(e)}  
  className={`border-gray-300 border rounded-md p-2 bg-gray-100 focus:border-blue-400 focus:outline-none h-28 align-top text-start break-words resize-none overflow-y-auto box-border whitespace-pre-wrap overflow-wrap-break-word `}
  /> :
   <input 
   id={label} 
   type={type} 
   name={name} 
   value={input} 
   onChange={(e) => handleInputChange(e)}  
   className={`border-gray-300 border rounded-md p-2 bg-gray-100 focus:border-blue-400 focus:outline-none`} 
 />
  }
 
  {error && <p className="text-red-500 text-sm">{error}</p>}
</div>
    )
  }

  export const SelectInput =  (props:Props) => {
    const [showOptions , setShowOptions] = useState(false)
    const {label = "" , type = "" , classname = "" , error = "" , options=[] , name , value=""}  = props || {}
console.log("options.." , options)
    const [selectedCategory , setSelectedCategory] = useState(value || "Select Category")
  
    const handleSelection = (event: React.MouseEvent<HTMLDivElement>) => {
      const selectedValue = (event.target as HTMLDivElement).innerText;
      setSelectedCategory(selectedValue);
      setShowOptions(false); // Close dropdown after selection
    };
    const category = options.find(item => item.categoryName === selectedCategory)
    return(
      <div className="flex flex-col gap-1 relative cursor-pointer">
  <label className="text-[#525357] font-semibold">{label}</label>
  <div onClick={()=>(setShowOptions(!showOptions))} className={`border-gray-300 border rounded-md  p-2 bg-gray-100 focus:border-blue-400 focus:outline-none ${classname}`}>{selectedCategory}</div>
  {showOptions && <div onClick={handleSelection} className={`absolute top-20 w-full  border-gray-300 border rounded-md p-2 bg-gray-100 focus:border-blue-400 focus:outline-none ${classname}`}>
    {options?.map((item, index)=>(
      <div className={`border-gray-300 border rounded-md p-2 bg-gray-100 focus:border-blue-400 focus:outline-none ${classname}`}>{item?.categoryName}</div>
    ))}
    </div>}
  <input className="hidden" id={label} type={type} name={name} readOnly  value={category?._id} />
  {  error && <p className="text-red-500 text-sm">{error}</p> }
      </div>
    )

  }