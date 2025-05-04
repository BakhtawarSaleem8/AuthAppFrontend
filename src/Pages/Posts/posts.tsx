import React, { useState, useEffect , useRef} from 'react'
import {usePostForm} from '../../CustomHooks/usePostorm'
import useApiRequest from '../../CustomHooks/useApiRequest'
import Modal from '../../Components/Modals/ShortForm'
import Button from '../../Components/Buttons/Button'
import Card from '../../Components/Cards/Card'
import PostList from '../../Components/PostList'
import { PostCreate } from '../../utils/data'
import { FormInput, SelectInput } from '../../Components/FormInputs/FormInput'
import { PostsUrl , CategoriesUrl } from '../../Resources/APIURLS'
import ReactToast ,{ ReactToastRef  } from '../../Components/Toasts/Toast'
import Spinner from "../../Components/Loading/Spinner"
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { MdKeyboardArrowLeft , MdKeyboardArrowRight } from "react-icons/md";
import ImageSlider from '../../Components/Slider/ImageSlider'


type Props = {}
type APIResponse<T> = { data?: T; error?: string | null };

const Posts = (props: Props) => {
  const [isEditPost , setIsEditPost] = useState(false)
  const [refresh , setRefresh] = useState(false)
  const [payload , setPayload] = useState<any>()
  const [imageUrls , setImageUrls]=useState<string[]>([])
  const [existingImages , setExistingImages]=useState<string[]>([])
  const { CREATPOST, UPDATEPOST } = PostsUrl();
  const {GETALLCATEGORIES} = CategoriesUrl()
    const toastRef = useRef<ReactToastRef>(null);
  const { data, error, isLoading, refetch } = useApiRequest<any>({
    url:  isEditPost ? UPDATEPOST : CREATPOST,
    config: { method: "POST", data: payload , headers:{"Content-Type":"multipart/form-data"} },
    manual: true,
  });
  const {data : categoriesData , error : getCategoriesError, isLoading : isGetting } = useApiRequest<any>({url:GETALLCATEGORIES ,config:{method:"GET"} , dependencies:[] })

  const defaultRefetch: <T>() => Promise<APIResponse<T>> = async() => {
    return { data: null, error: "could not perform action"} as APIResponse<any>;
  };
  let toastMsg=isEditPost ? "Post updated successfully" : "Post created successfully"
  const { isOpen, openModal, closeModal, handleSubmit, errors,  openEditModal, selectedPost } = usePostForm({ refetch: refetch || defaultRefetch, setPayload , refresh , setRefresh , toastRef, toastMsg});
useEffect(() => {
if(!isOpen){
  setImageUrls([])
}else{
  setImageUrls((prevUrls) => [...(prevUrls || []), ...(selectedPost?.images || [])])
  if(isEditPost){ 
  setExistingImages((prevUrls) => [...(prevUrls || []), ...(selectedPost?.images || [])])
  }
}
if(!isOpen && isEditPost){
  setIsEditPost(false)
  setExistingImages([])
}
}, [isOpen])

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFiles = e.target.files;
  if (selectedFiles && selectedFiles.length > 0) {
    const newUrls = Array.from(selectedFiles).map((file) => URL.createObjectURL(file));
    setImageUrls((prevUrls) => [...(prevUrls || []), ...newUrls]);
  }
};

const handleRemoveImage = (index: number) => {
  // Check if the image being removed is from existing images or newly uploaded ones
  const isExistingImage = index < existingImages.length;
  
  if (isExistingImage) {
    // Remove from existing images
    const updatedExisting = existingImages.filter((_, i) => i !== index);
    setExistingImages(updatedExisting);
    
    // Update the combined URLs (remove at the same index)
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedUrls);
  } else {
    // Handle newly uploaded files
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    
    if (fileInput && fileInput.files) {
      const dataTransfer = new DataTransfer();
      const adjustedIndex = index - existingImages.length;
      
      Array.from(fileInput.files).forEach((file, i) => {
        if (i !== adjustedIndex) {
          dataTransfer.items.add(file);
        }
      });
      
      fileInput.files = dataTransfer.files;
      
      // Update the combined URLs
      const updatedUrls = imageUrls.filter((_, i) => i !== index);
      setImageUrls(updatedUrls);
    }
  }
};


 
console.log(selectedPost , "selectedPost")
  console.log(isLoading , "isLoading")
  console.log(categoriesData , "..categoriesdata")
  return (
    
    <div className='h-screen  w-full grid grid-cols-2'>
         <ReactToast ref={toastRef} timeout={1500} />
     {/* <div className='w-full'>  */}
      <div className='h-fit' ><h1 className='font-bold text-xl'>Posts</h1>
      <p className='font-semibold'>Create All the posts , that can be seen and interacted  by all users </p>
      </div>
      <div className="justify-self-end"><Button onclick={openModal} type='button' text='Create Post' /></div> 
      {/* </div> */}
      <Modal isOpen={isOpen} onClose={closeModal} title={isEditPost ? "Edit Post" :'Create Post'} onsubmit={handleSubmit} isEditPost={isEditPost} >
        <div className='grid grid-cols-2 gap-2'>
          {
PostCreate.map((item)=>{ 
  const {type , label , options=[] , name } = item 
  if(item.label == "Post Category") return (<SelectInput type={type} label={label} error={errors[label]} options={categoriesData?.data} name={name} value={ selectedPost && selectedPost[name] && selectedPost[name]?.name} />);
  else return ( <FormInput type={type} label={label} error={errors[label]}  classname={type==="textarea" ? "col-span-2" : ""} name={name} value={selectedPost && selectedPost[name] && selectedPost[name]} />)
})
          }
           {!!imageUrls?.length && <ImageSlider handleRemoveImage={handleRemoveImage} imageUrls={imageUrls}/>}
            <label htmlFor='file-input'><MdOutlineAddPhotoAlternate className="text-blue-500 hover:text-blue-800" size={35}/></label>
            <div className='flex gap-2 items-center ml-auto  w-fit'><Button type="submit" text={isEditPost ? "Update":"Submit"} isLoading={isLoading} loadingComponent={<Spinner styling='!w-6 !h-6 border-4 !border-l-white'/>} />
            <Button type="button" text="Cancel" onclick={closeModal} classname="bg-gray-100 hover:bg-gray-300 border-gray-300 border text-black" /></div>
            </div>
            <input type="file"  hidden id='file-input' name='images' multiple onChange={(e)=>handleFileChange(e)}/>
            <input  name='existingImages' readOnly hidden value={JSON.stringify(existingImages)}/>
            {/* <input name='id' readOnly hidden value={selectedPost?._id} /> */}
      </Modal>
     <PostList onEditModal={openEditModal} setIsEditPost={setIsEditPost} refresh={refresh} setRefresh={setRefresh}/>
    </div>
  )
}


export default Posts