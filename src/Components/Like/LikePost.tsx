import React, { useState } from 'react'
import { AiOutlineLike , AiFillLike } from "react-icons/ai";
import { PostsUrl } from '../../Resources/APIURLS';
import useApiRequest from '../../CustomHooks/useApiRequest';
import { useUser } from '../../Store/AuthUser';

type Props = {
  postId : string,
  initialLike : boolean

}

const LikePost = ({postId , initialLike}: Props) => {
    const [isLiked , setIsLiked] = useState(initialLike)
      const {user} = useUser()
      const getPayload = () => ({
        user_id: user?.id,
        post_id: postId
      });
      const {POSTLIKE , POSTUNLIKE} = PostsUrl()
    const { refetch } = useApiRequest<any>({
      url:  initialLike ? POSTUNLIKE : POSTLIKE,
      config: { method: "POST", data: getPayload()  },
      manual: true,
    });
    const handleLike = async()=>{
      const previousState = initialLike
      const newState = !previousState
    try {
      setIsLiked(newState)
      const res = await refetch()
    } catch (error) {
      setIsLiked(previousState)
    }

        setIsLiked(!isLiked)
    }
  return (
            <button onClick={handleLike} className={`flex items-center gap-1 w-16 text-center ${isLiked ? "font-semibold" : ""}`}>{isLiked ? <AiFillLike/>  :<AiOutlineLike />} {isLiked ? "Liked" : "Like"}
            </button>
          )
}

export default LikePost