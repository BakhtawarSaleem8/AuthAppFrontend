import { useState , FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import AnimatedIntro from "../../Components/AnimatedIntro"
import Input from "../../Components/FormInputs/Input"
import { loginUser } from "../../utils/data"
import Button from "../../Components/Buttons/Button"
import { AuthApi } from "../../Resources/APIURLS"
import useApiRequest from "../../CustomHooks/useApiRequest"   
import { useUser } from "../../Store/AuthUser"


   const LoginUser = () =>{
    const [inputFields , setInputFields] = useState<Record<string, string>>({})
    const navigate = useNavigate()
    const {LOGINURL} = AuthApi()
    const {setUser} = useUser()
    const {data , error , isLoading , refetch} = useApiRequest<any>({url:LOGINURL ,config:{method:"POST" , data:{email: inputFields.Email , password : inputFields.Password}} , manual:true})

    const onchangeHandler = (e:any)=>{
        console.log(e.target.name , e.target.value)
        setInputFields(prev=>({...prev , [e.target.name] : e.target.value}))
    }
console.log(data , "outside data")
const handleSignUp = async(e:FormEvent<HTMLFormElement>) =>{
e.preventDefault()
const fetchResult : Record<string,any>  = await refetch()
console.log(fetchResult , error , "fetch result")
if(fetchResult.error){
    alert("someting gone wrong")
    return 
}
console.log(fetchResult , "fetchResult")
const userInfo = {name : fetchResult?.data?.data?.name , role : Number(fetchResult?.data?.data?.role) , token : fetchResult?.data?.token , id: fetchResult?.data?.data?._id}
setUser(userInfo)
// localStorage.setItem("user",JSON.stringify(userInfo))
// const savedUser = localStorage.getItem("user"); // This will be a string or null
// setUser(savedUser ? (JSON.parse(savedUser)) : null)
    navigate("/user/home")
    const allInputs = document.querySelectorAll("input")
    allInputs.forEach(i=>i.value="")
}

    return(<div>   
         {error && <div>{error}</div>}
        <div className="h-full content-center py-[8%]">
        <div className="grid grid-cols-2 max-w-[500px] m-auto  max-h-[600px] my-auto gap-4">
        <form  onSubmit={handleSignUp} className=" my-5 flex flex-col gap-8">
            <h1 className="text-orange-500 font-extrabold text-3xl">SignIn</h1>
        {loginUser.map((item  , index)=>{
            const {label="" , type="" } = item || {}
            return(
            <Input label={label} type={type} onchangeHandler={onchangeHandler} inputFields={inputFields}  />
        )})}
        <Button text="Sign In" type="submit" />
        <div>Don't have an Account? <Link className="text-blue-500" to="/register">SignUp</Link></div>
        </form>
        <div className="h-full w-full p-3">
      <AnimatedIntro/></div>
        </div></div>
        </div>
    
    )
   }

   export default LoginUser