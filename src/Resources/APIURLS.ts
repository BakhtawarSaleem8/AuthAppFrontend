const BASEURL = "http://127.0.0.1:3000/api"

export const AuthApi = () =>{
return {
    SIGNUPURL : `${BASEURL}/register`,
    LOGINURL : `${BASEURL}/login`
}
}

export const PostsUrl = () =>{
    return{
    CREATPOST : `${BASEURL}/createpost`,
    GETALLPOSTS : `${BASEURL}/getposts`,
    DELETEPOST : `${BASEURL}/deletepost`,
    UPDATEPOST : `${BASEURL}/updatepost`,
    POSTLIKE : `${BASEURL}/like`,
    POSTUNLIKE : `${BASEURL}/unlike`
    }
}

export const CategoriesUrl = () =>{
    return{
    CREATECATEGORY : `${BASEURL}/addcategory`,
    GETALLCATEGORIES : `${BASEURL}/getcategory`,
    DELETECATEGORY : `${BASEURL}/deletecategory`,
    UPDATECATEGORY : `${BASEURL}/updatecategory`
    }
}