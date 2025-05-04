import React , {useEffect, useState , useRef} from 'react'
import Card from './Cards/Card'
import { PostsUrl  } from '../Resources/APIURLS'
import useApiRequest from '../CustomHooks/useApiRequest'
import DeleteModal from './Modals/DeleteModal'
import Pagination from './Pagination/Pagination'
import ReactToast , { ReactToastRef } from './Toasts/Toast'
type Props = {
  onEditModal: (arg: Record<string, any>) => void,
  setIsEditPost : React.Dispatch<React.SetStateAction<boolean>>,
  refresh : boolean,
  setRefresh : React.Dispatch<React.SetStateAction<boolean>>
}
interface ApiResponse {
  success: boolean;
  message?: string;
}
type res = {
  data? : ApiResponse
}

const PostList = ({onEditModal , setIsEditPost , refresh , setRefresh}: Props) => {
      const [deletePost , setDeletePost] = useState(false)
     const [currentPage , setCurrentPage] = useState(1)
     const [totalPages , setTotalPages] = useState(1)
      const [deletePostPayload , setDeletePostPayload] = useState<Record<string , string>>({})
          const toastRef = useRef<ReactToastRef>(null);
      const {GETALLPOSTS , DELETEPOST} = PostsUrl()
      const GETPOSTSURL = `${GETALLPOSTS}?page=${currentPage}&limit=${5}`
      const {data , error , isLoading , refetch} = useApiRequest<any>({url:GETPOSTSURL ,config:{method:"GET"} , dependencies:[refresh , currentPage] })
      // let deletePostPayload:Record<string , string = {};
      console.log(data)
      const { isLoading: isDeleting, refetch: handleDeletePost } = useApiRequest<any>({
        url: DELETEPOST,
        config: { method: "POST" , data: deletePostPayload },
        manual: true, // Ensure it doesn’t run on mount
      });
      const postsList = data?.data
     
      useEffect(() => {
        let numberOfPages = data?.pagination?.totalPages
        console.log(numberOfPages , "numberofpages")
       setTotalPages(numberOfPages)
      }, [data?.pagination?.totalPages])
      
      console.log(data)
      const handleDeletePostClick = async()=>{
        const res : res  = await  handleDeletePost()
        const delResponse  = res?.data
        console.log(delResponse , "delresponse")
        if (delResponse?.success){
          console.log("if block code")
         setRefresh(!refresh)
         setDeletePost(false)
         if (toastRef?.current) {
          toastRef?.current.showToast("Post Deleted Successfully" ,"success");}
        }else{
          if (toastRef?.current) {
            toastRef?.current.showToast("Something went wrong" ,"error");}
        }
       }
      const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
    
        // Find closest button with `data-edit` or `data-delete`
        const editButton = target.closest<HTMLButtonElement>("[data-edit]");
        const deleteButton = target.closest<HTMLButtonElement>("[data-delete]");
    console.log(editButton)
        if (editButton) {
          setIsEditPost(true)
          const itemId = editButton.getAttribute("data-id");
          const item = postsList.find((post: Record<string,any>) => post._id.toString() === itemId);
          console.log(itemId , item)
          if (item) {
            onEditModal(item); // Call edit function with the item
          }
        }
        console.log(deleteButton , "deleteButton")
    
        if (deleteButton) {
          const itemId = deleteButton.getAttribute("data-id");
          // const item = postsList.find((post) => post.id.toString() === itemId);
          if (itemId) {
            // onDeletePost(item.id); // Call delete function with item ID
            setDeletePostPayload({id:`${itemId}`})
          // deletePostPayload["id"]=
          console.log(deletePostPayload , "deletepostpayload") 
          setDeletePost(true)
          }
        }
      };
     
      const handlePageChange = (page: number) => {
        setCurrentPage(page);
        console.log(`Fetching posts for page ${page}`);
        // Fetch new posts from API based on the selected page
      };
    
  return (<>
           <ReactToast ref={toastRef} timeout={1500} />
  {deletePost && <DeleteModal isOpen={deletePost} onClose={()=>setDeletePost(false)} onConfirm={handleDeletePostClick}/>}
    <div className='grid grid-cols-3 col-span-2 gap-3' onClick={(event)=>handleClick(event)}>
    {!!postsList?.length && postsList?.map((item:Record<string,any>)=>(
      <Card item={item} key={item._id}/>
    ))}
  </div>
  {!!postsList?.length &&
  <div className='w-full col-span-2'> <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /></div>}
 

  </>
  )
}

export default PostList