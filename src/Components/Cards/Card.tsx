import React from 'react'
import { RiDeleteBinFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import AnimatedButton from '../Buttons/AnimatedButton';

type Props = {
  item : Record<string , any>
}


const Card = ({ item}: Props) => {

const {title = "" , description ="" , category={} , images=[]} = item
  return (
    <div className='flex flex-col gap-4 max-h-48 border-gray-300 border rounded-sm bg-gray-200 p-3 hover:border-yellow-500 cursor-pointer'>
        <div className='flex justify-between'><h2 className='font-bold max-w-24 truncate'>{title}</h2> <div className='flex items-center gap-2'>
          <AnimatedButton Icon={RiDeleteBinFill} text='Delete'  textColor='red' data-id={item._id} data-delete/>
          <AnimatedButton Icon={MdEdit} text='Edit'  textColor='purple'   data-id={item._id}
            data-edit/></div></div>
        <div className='font-semibold max-w-full break-words min-h-[55px]'>{description && description?.length > 75 ? description?.slice(0,75) + "..." : description }
        </div>
      <div className='w-full flex items-center justify-between'>  {category?.name &&<div className='font-semibold rounded-md px-2 py-1 bg-gray-400 text-black max-w-fit'>{category?.name}</div>}
       <div className='flex items-center'>{(!!images?.length && images?.length > 3  ? images.slice(0,3) : images).map((item:string , index:number)=>(<img src={item} key={index} className='max-w-8 min-w-8 max-h-8 min-h-8 rounded-full border border-gray-500'/>))}
      {images?.length > 3 && <div className='max-w-16 min-w-8 max-h-16 min-h-8 rounded-full border border-gray-500 bg-zinc-500 text-white font-semibold text-center'>+{images?.length-3}</div>}</div>
       </div>
    </div>
  )
}

export default Card