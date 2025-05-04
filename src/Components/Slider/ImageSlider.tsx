import React, { useState, useRef , useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "./slider.css"

type sliderProp = {
    handleRemoveImage : (index:number)=>void,
    imageUrls : string[]
}
const ImageSlider = (props:sliderProp) => {
    const {handleRemoveImage=()=>{} , imageUrls=[]} = props || {}
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScroll , setCanScroll] = useState({canScrollLeft:false, canScrollRight:true})
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScroll(prev=>({...prev , canScrollLeft :(scrollLeft > 0)}));
      setCanScroll(prev=>({...prev , canScrollRight:(scrollLeft < scrollWidth - clientWidth)}))
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
    }
    return () => {
      if (slider) {
        slider.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  console.log(imageUrls , "imageurls")
  const handleActiveIndex = (index: number) => () => {
    setActiveImageIndex(index);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2; // Adjust drag speed
    sliderRef.current.scrollLeft = scrollLeft - walk;
    

  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // snapToNearestImage();
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const snapToNearestImage = () => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const imageWidth = slider.querySelector("div")?.offsetWidth || 0;
    const scrollPosition = slider.scrollLeft;
    const snappedPosition = Math.round(scrollPosition / imageWidth) * imageWidth;
    slider.scrollTo({ left: snappedPosition, behavior: "smooth" });
  };

  const handleArrowClick = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const imageWidth = slider.querySelector("div")?.offsetWidth || 0;
    const scrollAmount = direction === "left" ? -imageWidth : imageWidth;
    slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="col-span-2 h-fit my-3 flex items-center gap-2">
     {canScroll?.canScrollLeft && <div onClick={() => handleArrowClick("left")}>
        <MdKeyboardArrowLeft size={40} className="text-blue-500 hover:text-blue-800 cursor-pointer" />
      </div>}
      <div
        ref={sliderRef}
        className={`flex gap-2 items-center ${isDragging ? "scroll-auto" : "scroll-smooth"} overflow-x-auto scroll-snap-x-mandatory   hide-scrollbar`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {!!imageUrls?.length && imageUrls?.map((item, index) => (
          <div
            key={index}
            className="h-24 w-20 min-w-32 relative scroll-snap-align-start flex-shrink-0"
          >
            <div
              onMouseEnter={handleActiveIndex(index)}
              onMouseLeave={() => setActiveImageIndex(null)}
              className={`bg-yellow-500 h-full w-full absolute transition-opacity delay-75 ease-in-out ${
                activeImageIndex === index ? "opacity-90" : "opacity-0"
              }`}
            >
              <button type="button" onClick={()=>handleRemoveImage(index)}>x</button>
            </div>
            <img
              className="max-h-full max-w-full min-w-full min-h-full object-cover rounded-md border-gray-500 border"
              src={item}
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </div>
      {canScroll?.canScrollRight && <div onClick={() => handleArrowClick("right")} className="ml-auto">
        <MdKeyboardArrowRight
          size={40}
          className="text-blue-500 hover:text-blue-800 cursor-pointer"
        />
      </div>}
    </div>
  );
};

export default ImageSlider;