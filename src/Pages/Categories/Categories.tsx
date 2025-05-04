import React , {useState , useEffect , useRef} from 'react'
import Button from '../../Components/Buttons/Button'
import Table from '../../Components/Table/Table';
import { ColumnDefinition } from '../../types/Category.types';
import { usePostForm } from '../../CustomHooks/usePostorm';
import Modal from '../../Components/Modals/ShortForm';
import { FormInput } from '../../Components/FormInputs/FormInput';
import { CategoriesUrl } from '../../Resources/APIURLS';
import useApiRequest from '../../CustomHooks/useApiRequest';
import { CategoryCreate } from '../../utils/data';
import DeleteModal from '../../Components/Modals/DeleteModal';
import ReactToast, { ReactToastRef } from '../../Components/Toasts/Toast';
import Spinner from '../../Components/Loading/Spinner';

interface Category {
  _id: string | number,
  categoryName: string,
  numberOfPosts: number
}

type Props = {}
type APIResponse<T> = { data?: T; error?: string | null };
interface ApiResponse {
  success: boolean;
  message?: string;
}
type res = {
  data? : ApiResponse
}

const Categories = () => {
   const [isEditCategory , setIsEditCategory] = useState(false)
    const [refresh , setRefresh] = useState(false)
    const [deleteModal , setDeleteModal] = useState(false)
          const [payload , setPayload] = useState<Record<string , string | number>>({})
  const [categories, setCategories] = useState<Category[]>([
    {_id: 12345 , categoryName: 'Technology', numberOfPosts: 120 },
    {_id: 123444 , categoryName: 'Lifestyle', numberOfPosts: 90 },
    { _id: 1234556, categoryName: 'Travel', numberOfPosts: 75 },
  ]);
  const toastRef = useRef<ReactToastRef>(null);


  const categoryColumns: ColumnDefinition<Category>[] = [
    { key: 'categoryName', header: 'Category Name' },
    { key: 'numberOfPosts', header: 'Number of Posts' },
  ]
  const {CREATECATEGORY , UPDATECATEGORY , GETALLCATEGORIES , DELETECATEGORY} = CategoriesUrl()
  const {  error, isLoading, refetch } = useApiRequest<any>({
    url:  isEditCategory ? UPDATECATEGORY : CREATECATEGORY,
    config: { method: "POST", data: payload },
    manual: true,
  });
  const {data , error : getCategoriesError, isLoading : isGetting } = useApiRequest<any>({url:GETALLCATEGORIES ,config:{method:"GET"} , dependencies:[refresh] })
  const { isLoading: isDeleting, refetch: deleteCategory } = useApiRequest<any>({
    url: DELETECATEGORY,
    config: { method: "POST" , data: payload },
    manual: true, // Ensure it doesn’t run on mount
  });
  const defaultRefetch: <T>() => Promise<APIResponse<T>> = async() => {
    return { data: null, error: "could not perform action"} as APIResponse<any>;
  };
  let toastMsg = isEditCategory ? "Category updated successfully" : "Category posted successfully"
 const { isOpen, openModal, closeModal, handleSubmit, errors,  openEditModal, selectedPost } = usePostForm({ refetch: refetch || defaultRefetch, setPayload , refresh , setRefresh , toastRef , toastMsg});
useEffect(() => {
if(!isOpen && isEditCategory){
  setIsEditCategory(false)
}
}, [isOpen])
useEffect(() => {
  if(data?.data){
    setCategories(data?.data)
  }
}, [data?.data])

console.log(selectedPost , "selected Category")
  const handleEditCategory = (category: Category) => {
    console.log(category , "at handleEditCayrgory..")
    setIsEditCategory(true)
    openEditModal(category)
  };

  const handleDeleteCategory = (category: Category) => {
    // setCategories((prev) => prev.filter((c) => c.categoryName !== category.categoryName));
    console.log(category , "handleDeleteCategory")
    setPayload({id : `${category?._id}`})
    setDeleteModal(true)
  };
  const handleDeleteClick = async()=>{
    const res : res  = await  deleteCategory()
    const delResponse  = res?.data
    console.log(delResponse)
    if (delResponse?.success){
      console.log("if block code")
      setDeleteModal(false)
      if (toastRef.current) {
        toastRef.current.showToast("Category has been deleted successfully!");
      }
     setRefresh(!refresh)
    }else{
      if (toastRef.current) {
        toastRef.current.showToast("Something went wrong!");
      }
    }
  }
   
  return (
    <>
    <ReactToast ref={toastRef} timeout={1500} />
      {deleteModal && <DeleteModal isOpen={deleteModal} onClose={()=>setDeleteModal(false)} onConfirm={handleDeleteClick}/>}
    <div className='  w-full grid grid-cols-2 gap-7 '>
 <div className='h-fit' ><h1 className='font-bold text-xl'>Categories</h1>
      <p className='font-semibold'>Create All the Categories , that will categorized the posts. </p>
      </div>
      <div className="justify-self-end"><Button onclick={openModal} type='button' text='Create Category' /></div> 
      <Modal isOpen={isOpen} onClose={closeModal} title={isEditCategory ? "Edit Category" :'Create Category'} onsubmit={handleSubmit} isEditPost={isEditCategory} >
        <div className='grid grid-cols-2 gap-2'>
          {
CategoryCreate.map((item)=>{ 
  const {type , label  , name } = item 
   return ( <FormInput key={label} type={type} label={label} error={errors[label]}  classname={type==="textarea" ? "col-span-3" : ""} name={name} value={selectedPost && selectedPost["categoryName"] && selectedPost["categoryName"]} />)
})
          }
            </div>
            <div className='flex gap-2 items-center ml-auto mt-4 w-fit'><Button type="submit" text={isEditCategory ? "Update":"Submit"} isLoading={isLoading} loadingComponent={<Spinner styling='!w-6 !h-6 border-4 !border-l-white' />} />
            <Button type="button" text="Cancel"  onclick={closeModal} classname="bg-gray-100 hover:bg-gray-300 border-gray-300 border text-black" /></div>
      </Modal>
     <div className='w-full col-span-2 '>
      <Table
        data={categories}
        columns={categoryColumns}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
      />
      </div>
</div>
</>
  )
}

export default Categories