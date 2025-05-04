// import React , {createContext, PropsWithChildren, useContext} from 'react'
// import useApiRequest from '../CustomHooks/useApiRequest'
// import { CategoriesUrl } from '../Resources/APIURLS'

// type CategoryContext = {
//     categoryData : []
// }

// const CategoriesContext = createContext<any>(undefined)

// const CategoriesProvider: React.FC<PropsWithChildren> = ({ children }:React.PropsWithChildren) => {
//     const {GETALLCATEGORIES} = CategoriesUrl()
//     const {data , error : getCategoriesError, isLoading : isGetting } = useApiRequest<any>({url:GETALLCATEGORIES ,config:{method:"GET"} , dependencies:[refresh] })

//   return (
//     <CategoriesContext.Provider value={{}}>
//         {children}
//     </CategoriesContext.Provider>
//   )
// }

// export default CategoriesProvider