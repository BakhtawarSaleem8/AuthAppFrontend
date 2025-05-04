import  {useEffect, useState} from 'react'

type Props = {}

const IntroImages = [{
    logo :  "./assets/finance.jpg",
    heading : "Finance and bussiness",
},
{
    logo:"./assets/HealthCare.jpg",
    heading : "Global Health"
},
{
    logo:"./assets/sports.jpg",
    heading:"Sports"
},
{
    logo:"./assets/worldPolitics.jpg",
    heading:"World Politics"
}
]

const AnimatedIntro = (props: Props) => {
const [activeImage , setActiveImage] = useState(0)
useEffect(() => {
    const timeInterval = setInterval(() => {
      setActiveImage((prev) =>
        prev === IntroImages.length - 1 ? 0 : prev + 1
      );
    }, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(timeInterval);
  }, [IntroImages.length]);

  return (
    <div className='flex flex-col gap-2 max-w-[350px] min-w-[350px] h-full justify-center items-center p-4 rounded-md  bg-gradient-to-r from-blue-500 via-orange-500 to-blue-500'>
                <h1 className='text-white font-bold teat-[20px]'>You can explore all the latest posts about</h1>
        <div className='min-h-[300px] max-w-[300px] rounded-full'>
        <img src={IntroImages[activeImage].logo} className='h-fit w-fit object-contain rounded-full' />
        </div>
        <h1 className='text-white font-bold teat-[20px]'>{IntroImages[activeImage].heading}</h1>
        <div className='flex gap-2 items-center'>
            {IntroImages.map((i , index)=>(<span className={` ${(activeImage == index) ? "w-14 bg-blue-500" : "w-5 bg-white"} h-5 text-transparent rounded-full transition-all ease-in-out duration-500 `}>{index}</span>))}
        </div>
    </div>
  )
}

export default AnimatedIntro