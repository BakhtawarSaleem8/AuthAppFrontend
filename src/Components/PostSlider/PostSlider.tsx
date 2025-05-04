

import { useState, useEffect } from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";

export default function PostSlider({
  slides,
}: {
  slides: string[];
}) {
  const [curr, setCurr] = useState(0);

  const imageArray = ["/assets/Cricket.jpg", "/assets/finance.jpg","/assets/HealthCare.jpg","/assets/sports.jpg"]


  const prev = () =>
    setCurr((curr) => (curr === 0 ? imageArray.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === imageArray.length - 1 ? 0 : curr + 1));


  return (
    <div className="overflow-hidden relative w-[80%] border border-b-2 rounded-sm">
      <div
        className="flex transition-transform ease-out duration-500 w-full h-full"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {imageArray.map((img) => (
          <img src={img} alt="" className="w-full h-full object-cover flex-shrink-0" />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between w-full">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <IoIosArrowDropleftCircle size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <IoIosArrowDroprightCircle size={40} />
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2 bg-black bg-opacity-15">
          {imageArray.map((_, i) => (
            <div
              className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-70"}
            `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}