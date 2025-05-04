// import React , {useState , useRef , useEffect} from 'react'
// import useApiRequest from '../../CustomHooks/useApiRequest';
// import { PostsUrl } from '../../Resources/APIURLS';
// import HomePost from '../Posts/HomePost';
// import PostList from '../../Components/PostList';


// const HomePage = () => {
// const [currentPage , setCurrentPage] = useState(1)
// const {GETALLPOSTS} = PostsUrl()
// const refList = useRef<(HTMLDivElement | null)[]>([]);
// const GETPOSTSURL = `${GETALLPOSTS}?page=${currentPage}&limit=${10}`
// const {data , error , isLoading , refetch} = useApiRequest<any>({url:GETPOSTSURL ,config:{method:"GET"} , dependencies:[ currentPage] })
// const postsList = data?.data

// useEffect(() => {
//     console.log("it enters")
//     const lastElement = refList.current[refList.current.length - 1];
//   if (!lastElement) return;
//   console.log("it progress")
//   const observer = new IntersectionObserver(function(entries){
//     if(entries[0].isIntersecting){
//         setCurrentPage(prev=>(prev+1))
//         observer.unobserve(entries[0].target)
//     }

//   })

// observer.observe(lastElement)
//   return () => {
//     observer.disconnect()
//   }
// }, [postsList])

    
//   return (
//     <div className='w-[780px] m-auto flex flex-col gap-10'>
//         {!!(postsList?.length > 0) && postsList?.map((item:Record<string,any>,index:number)=>(
//                 <div ref={(el)=>(refList.current[index]= el)} className='p-4 rounded-2xl bg-[#f5f5f5] shadow-md'>
//                 <HomePost post={item} />  
//                     </div> 
//         ))}
//     </div>
//   )
// }

// export default HomePage

import React, { useState, useRef, useEffect, useCallback } from 'react';
import useApiRequest from '../../CustomHooks/useApiRequest';
import { PostsUrl } from '../../Resources/APIURLS';
import HomePost from '../Posts/HomePost';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Array<Record<string, any>>>([]);
  const [hasMore, setHasMore] = useState(true);
  const { GETALLPOSTS } = PostsUrl();
  const refList = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isLoadingRef = useRef(false);
  
  const GETPOSTSURL = `${GETALLPOSTS}?page=${currentPage}&limit=10`;
  const { data, error, isLoading } = useApiRequest<any>({
    url: GETPOSTSURL,
    config: { method: "GET" },
    dependencies: [currentPage]
  });

  // Merge new posts with existing ones and check if more data exists
  useEffect(() => {
    if (data?.data) {
      setAllPosts(prev => [...prev, ...data.data]);
      isLoadingRef.current = false;
      
      // Check if we've reached the end of data
      if (data.data.length < data?.pagination?.totalPages) {
        setHasMore(false);
      }
    }
  }, [data]);

  // Reset refs when posts change
  // useEffect(() => {
  //   refList.current = refList.current.slice(0, allPosts.length);
  // }, [allPosts]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && !isLoadingRef.current && hasMore) {
      isLoadingRef.current = true;
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore]);

  // Set up intersection observer
  useEffect(() => {
    isLoadingRef.current = isLoading;
    
    if (allPosts.length === 0 || !hasMore) {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      return;
    }

    const lastElement = refList.current[refList.current.length - 1];
    if (!lastElement) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px", // Increased margin for fast scrolling
      threshold: 0.01, // Lower threshold
    });
    
    observer.observe(lastElement);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [allPosts, handleObserver, isLoading, hasMore]);

  // Add a small delay between requests to prevent rapid firing
  useEffect(() => {
    const timer = setTimeout(() => {
      isLoadingRef.current = false;
    }, 500);

    return () => clearTimeout(timer);
  }, [allPosts]);

  return (
    <div className='w-[780px] m-auto flex flex-col gap-10'>
      {allPosts.map((item, index) => (
        <div 
          key={`${item.id}-${index}`}
          ref={el => (refList.current[index] = el)}
          className='p-4 rounded-2xl bg-[#f5f5f5] shadow-md'
        >
          <HomePost post={item} />  
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {!hasMore && !isLoading && (
        <div className="text-center py-4 text-gray-500">
          You've reached the end of the content
        </div>
      )}
      
      {error && (
        <div className="text-center py-4 text-red-500">
          Error loading posts. <button 
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="text-blue-500 underline"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;

