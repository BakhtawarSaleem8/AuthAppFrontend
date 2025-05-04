import { FormEvent, useState , useRef} from "react"
import { Link } from "react-router-dom"
import AnimatedIntro from "../../Components/AnimatedIntro"
import Input from "../../Components/FormInputs/Input"
import { registerUser } from "../../utils/data"
import Button from "../../Components/Buttons/Button"
import axios from "axios"
   




   const RegisterUser = () =>{
    const [inputFields , setInputFields] = useState<Record<string, string>>({})
    const formRef = useRef<HTMLFormElement>(null);
    const onchangeHandler = (e:any)=>{
        console.log(e.target.name , e.target.value)
        setInputFields(prev=>({...prev , [e.target.name] : e.target.value}))
    }

const handleSignUp = async(e:FormEvent<HTMLFormElement>) =>{
e.preventDefault()
console.log(inputFields)

let payload = {
    name : inputFields?.Username,
    email : inputFields?.Email,
    password : inputFields?.Password
}
try {
    const res = await axios.post("http://127.0.0.1:3000/api/register" , payload)
    console.log(res)
    const allInputs = document.querySelectorAll("input")
 allInputs.forEach(i=>i.value="")
} catch (error) {
    console.log(error)
}
}
    return(
        <div className="h-full content-center py-[8%]">
        <div className="grid grid-cols-2 max-w-[500px] m-auto  max-h-[600px] my-auto gap-4">
        <form ref={formRef} onSubmit={handleSignUp} className=" my-5 flex flex-col gap-8">
            <h1 className="text-orange-500 font-extrabold text-3xl">SignUp</h1>
        {registerUser.map((item  , index)=>{
            const {label="" , type="" , regex=""} = item || {}
            return(
            <Input label={label} type={type} regex={regex} onchangeHandler={onchangeHandler} inputFields={inputFields} />
        )})}
        <Button text="Sign Up" type="submit" />
        <div>Already have an Account ? <Link className="text-blue-500" to="/login">SignIn</Link></div>
        </form>
        <div className="h-full w-full p-3">
      <AnimatedIntro/></div>
        </div></div>
    )
   }

   export default RegisterUser