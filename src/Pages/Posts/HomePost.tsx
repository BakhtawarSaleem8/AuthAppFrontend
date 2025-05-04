import React , {useState , forwardRef} from 'react';
import LikePost from '../../Components/Like/LikePost';
import CommentPost from '../../Components/Comment/CommentPost';
import SharePost from '../../Components/Share/SharePost';
import PostSlider from '../../Components/PostSlider/PostSlider';

type HomePostProps = {
    post : Record<string,any>,
    // onCommentsToggle? : ()=>void
}

function HomePost({post }:HomePostProps) {
    // const {post={}  , onCommentsToggle=()=>{}} = props
    // console.log(props , "props..")
    // const post = props
    console.log(post , "post")
    const [isComment , setIsComment] = useState(false)

  return (
    <>
         <div className=' flex  h-60'>
        <PostSlider slides={[]}/>
            <div className='bg-[#f5f5f5] w-[95%] p-2'>
            <p className='bg-[#4CAF50] rounded-lg px-3 py-1 text-white font-medium ml-auto w-fit '>Category</p>
            <h2 className='font-bold text-2xl'>{post?.title}</h2>
            <div className='text-lg font-semibold w-full break-words min-h-40'>description .................... .................... ............
                ............................................................................
                ...........................................................................
                ............................................................
            </div></div>
        </div>
        <div className='flex gap-5 items-center justify-evenly w-full'>
            <LikePost initialLike={post?.isLiked} postId={post?._id}/>
            <CommentPost setIsComment={setIsComment} isComment={isComment}/>
            <SharePost/>
        </div>
        <div>{isComment && <div>Comment</div>}</div>
    </>
  )
}

export default HomePost