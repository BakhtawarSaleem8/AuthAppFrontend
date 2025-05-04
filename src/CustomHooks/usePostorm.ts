import { useState, useCallback, FormEvent , useEffect } from "react";
import { ReactToastRef } from "../Components/Toasts/Toast";
// const usePostForm = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const { CREATPOST } = PostsUrl();
//   let payload: Record<string, any> = {};

//   const { data, error, isLoading, refetch } = useApiRequest<any>({
//     url: CREATPOST,
//     config: { method: "POST", data: payload },
//     manual: true,
//   });

//   // Open & Close Modal
//   const openModal = useCallback(() => setIsOpen(true), []);
//   const closeModal = useCallback(() => {
//     setIsOpen(false);
//     setErrors({});
//     setSuccessMessage(null);
//   }, []);

//   // ✅ Optimize `handleSubmit` with `useCallback`
//   const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     let hasEmptyField = false;
//     let newErrors: Record<string, string> = {};

//     for (const [key, value] of formData.entries()) {
//       if (!value) {
//         hasEmptyField = true;
//         newErrors[key] = `${key} is required`;
//       } else {
//         payload[key] = key === "categories" ? [value] : value;
//       }
//     }

//     if (hasEmptyField) {
//       setErrors(newErrors);
//       return;
//     }

//     const res = await refetch();
//     if (res?.data) {
//       setSuccessMessage("Post created successfully!");
//       setTimeout(() => {
//         closeModal();
//         e.currentTarget.reset();
//       }, 2000);
//     }
//   }, [closeModal, refetch]);

//   return {
//     isOpen,
//     openModal,
//     closeModal,
//     handleSubmit, 
//     errors,
//     isLoading,
//     error,
//     successMessage,
//   };
// };

// export default usePostForm;
type APIResponse<T> = { data?: T; error?: string | null };


interface usePostFormOptions {
  refetch: <T>() => Promise<APIResponse<T>>,
  // setPayload : React.Dispatch<React.SetStateAction<Record<string, string | number>>>,
  setPayload : any,
   refresh : boolean,
    setRefresh : React.Dispatch<React.SetStateAction<boolean>>,
    toastRef : ReactToastRef | any,
    toastMsg : string
}

interface ApiResponse {
  success: boolean;
  message?: string;
}
type res = {
  data? : ApiResponse
}
// export const usePostForm = ({refetch , setPayload , refresh , setRefresh , toastRef} :usePostFormOptions ) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [errors, setErrors] = useState<Record<string, string>>({});
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const [selectedPost, setSelectedPost] = useState<any>(null); // Store the post being edited
  
  
  
//     const openModal = useCallback(() => setIsOpen(true), []);
//     const closeModal = useCallback(() => {
//       setIsOpen(false);
//       setSelectedPost(null); // Reset selected post
//       setErrors({});
//       setSuccessMessage(null);
//     }, []);
  
//     const openEditModal = useCallback((post: any) => {
//       setSelectedPost(post);
//       setIsOpen(true);
//     }, []);
  
//     const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       const formData = new FormData(e.currentTarget);
//       let newErrors: Record<string, string> = {};
//       let hasEmptyField = false;
//       let payload:Record<string , any> = {}
  
//       for (const [key, value] of formData.entries()) {
//         if (!value) {
//           hasEmptyField = true;
//           newErrors[key] = "This field is required";
//         } else {
//           payload[key] = key === "categories" ? ['67cf6350b28924429317ecd3'] : value;
//           setPayload(payload)
//         }
//       }
//       if(selectedPost){
//         payload["id"] = selectedPost?._id;
//         // payload["categories"]=["67cf6350b28924429317ecd3"]
//         setPayload(payload)
//       }
  
//       if (hasEmptyField) {
//         setErrors(newErrors);
//         return;
//       }
//   console.log(payload , "payload")
//       const res: res = await refetch();
//       console.log(res , "ress")
//       if (res?.data?.success) {
//         setSuccessMessage(selectedPost ? "Post updated successfully!" : "Post created successfully!");
//         if (toastRef?.current) {
//           toastRef?.current.showToast("This is a warning message!", "warning");
//           setPayload({})
//         }
//         setRefresh(!refresh)
//         setTimeout(() => {
//           closeModal();
//           // e.currentTarget.reset();
//         }, 2000);
//       }
//     }, [closeModal, refetch, selectedPost]);
  
//     return {
//       isOpen,
//       openModal,
//       closeModal,
//       openEditModal, // ✅ Function to open modal for editing
//       handleSubmit,
//       errors,
//       successMessage,
//       selectedPost, // ✅ Provide selected post for pre-filling the form
//     };
//   };
  

export const usePostForm = ({ refetch, setPayload, refresh, setRefresh, toastRef , toastMsg }: usePostFormOptions) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [shouldFetch, setShouldFetch] = useState(false); // New state to trigger refetch

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedPost(null);
    setErrors({});
  }, []);

  const openEditModal = useCallback((post: any) => {
    setSelectedPost(post);
    setIsOpen(true);
  }, []);

//   const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     let newErrors: Record<string, string> = {};
//     let hasEmptyField = false;
//     let payload :Record<string , any> | FormData;

// console.log(formData.entries())
// // return
// if(formData.has("images")){
//    payload = new FormData()
//   for (const [key, value] of formData.entries()) {
//     console.log(key , value , "imagesss")
//     if (!value  && (key !== "images" || "existingImages" || "id") ) {
//       hasEmptyField = true;
//       newErrors[key] = "This field is required";
//     }   else if (value) {
//       // payload.append(key, key === 'existingImages' 
//       //   ? JSON.stringify(value) 
//       //   : value
//       // );   
//       payload.append(key,value)
//      }
//   }
// }else{
//   payload = {}
//   for (const [key, value] of formData.entries()) {
//     if (!value) {
//       hasEmptyField = true;
//       newErrors[key] = "This field is required";
//     } else {
//       payload[key] = value;
//     }
//   }
//   if (selectedPost) {
//     payload["id"] = selectedPost?._id;
//   }
// }
   

   

//     if (hasEmptyField) {
//       setErrors(newErrors);
//       return;
//     }

//     setPayload(payload); // Update payload
//     setShouldFetch(true); // Trigger refetch
//   }, [selectedPost, setPayload]);

const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  let newErrors: Record<string, string> = {};
  let hasEmptyField = false;
  let payload: Record<string, any> | FormData;

  // Check if we have any actual files (size > 0) or existing images
  const existingImagesStr = formData.get("existingImages") as string;
  const existingImages = existingImagesStr ? JSON.parse(existingImagesStr) : [];

  // Check if we have any actual files (size > 0) or existing images
  const hasImages = formData.has("images") && 
    Array.from(formData.getAll("images")).some((file: any) => file.size > 0);
  const hasExistingImages = existingImages.length > 0;

  if (hasImages || hasExistingImages) {
    payload = new FormData();
    
    for (const [key, value] of formData.entries()) {
      // Skip validation for these fields (they're handled separately)
      console.log(key , value , "payyload..")
      if (key === "images" || key === "existingImages" ) {
        continue; // Skip special fields
      }

      if (!value) {
        hasEmptyField = true;
        newErrors[key] = "This field is required";
      } else {
        payload.append(key, value);
      }
    }



    // Handle images only if we have valid files
    if (hasImages) {
      const files = Array.from(formData.getAll("images"))
        .filter((file: any) => file.size > 0);
      files.forEach(file => payload.append("images", file));
    }

    // Handle existingImages only if array isn't empty
    if (hasExistingImages) {
      payload.append("existingImages", JSON.stringify(existingImages));
    }
    
    if(selectedPost){
      payload.append("id", selectedPost?._id)
    }
    

    
  } else {
    // No images case
    payload = {};
    for (const [key, value] of formData.entries()) {
      if (!value && key !== "id") { // Skip validation for ID field
        hasEmptyField = true;
        newErrors[key] = "This field is required";
      } else {
        payload[key] = value;
      }
    }
    if (selectedPost) {
      console.log("selectPost id")
      payload["id"] = selectedPost?._id;
    }
  }

  if (hasEmptyField) {
    setErrors(newErrors);
    return;
  }
//   for (const [key, value] of payload.entries()) {
//  console.log(key , value , "final")
//   }
console.log(payload , "payyload")
  setPayload(payload);
  setShouldFetch(true);
}, [selectedPost]);
  useEffect(() => {
    if (shouldFetch) {
      const fetchData = async () => {
        const res: res = await refetch();
        console.log(res , "handlepost res ...")
        if (res?.data?.success) {
          if (toastRef?.current) {
            toastRef?.current.showToast(toastMsg ,"success");
            setPayload({});
          }
          setRefresh(!refresh);
          setTimeout(() => {
            closeModal();
          }, 2000);
        }
        setShouldFetch(false); // Reset the flag
      };

      fetchData();
    }
  }, [shouldFetch]);

  return {
    isOpen,
    openModal,
    closeModal,
    openEditModal,
    handleSubmit,
    errors,
    selectedPost,
  };
};