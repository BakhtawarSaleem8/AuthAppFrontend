export const registerUser = [
    {
        label : "Username",
        type : "text",
        regex : /^[a-zA-Z0-9]+$/ ,
    },
    {
        label : "Email",
        type : "email",
        regex : /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ,
    },
    {
        label : "Password",
        type : "password",
        regex : /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/ ,
    }
]

export const loginUser = [
   
    {
        label : "Email",
        type : "email",
    },
    {
        label : "Password",
        type : "password",
    }
]

export const PostCreate = [
    {
        id:1,
        label : "Post Title",
        type : "text",
        name : "title",
        error:"",
    },
    {
        id:2,
        label : "Post Category",
        options:["Sports" , "Finance & Business" , "Health" , "Politics"],
        type : "text",
        name: "category",
        error:"",
    },
    {
        id:3,
        label : "Post Content",
        type : "textarea",
        name:"description",
        error:"",
    },
   
]

export const CategoryCreate = [
    {id:1,
    label : "Category Title",
    type : "text",
    name : "category_name",
    error:"",   
    }
]