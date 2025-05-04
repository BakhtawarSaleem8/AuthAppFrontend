import React from 'react'
import { FaRegComment } from "react-icons/fa";

type Props = {
  setIsComment : React.Dispatch<React.SetStateAction<boolean>>,
  isComment : boolean,
  // onCommentsToggle : ()=>void
}

const CommentPost = ({setIsComment , isComment = false}: Props) => {
 const handleCommentClick = ()=>{
  setIsComment(!isComment)
  // onCommentsToggle()
 }
  return (
        <button onClick={handleCommentClick} className='flex items-center gap-1 w-16 text-center'><FaRegComment/> Comment</button>
  )
}

export default CommentPost