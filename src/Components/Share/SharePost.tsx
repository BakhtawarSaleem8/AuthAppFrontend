import React from 'react'
import { IoShareSocialOutline } from "react-icons/io5";

type Props = {}

const SharePost = (props: Props) => {
  return (
    <div className='flex items-center gap-1 w-16 text-center'><IoShareSocialOutline/> Share</div>
)
}

export default SharePost