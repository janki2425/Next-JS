"use client";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";

const categories = [
  "All",
  "Music",
  "Gaming",
  "Live",
  "Game shows",
  "Dance",
  "Web Development",
  "ReactJS",
  "Animals",
  "Ocean",
  "Recently Uploaded",
  "Most Viewed",
  "Fashion",
  "dance",
  "stock",
  "birds",
  "sports",
  "swimmig",
  "Maths",
  "JAVA",
  "GITHUB",
];

export default function CategoryNav({ onCategoryChange }) {
  const { theme } = useTheme();
  const scrollRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  

  const handleCategoryClick = (category) => {
    try {
      setActiveCategory(category);
      onCategoryChange(category);
    } catch (error) {
      console.error("Error in category change:", error);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const newScrollLeft =
        direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const updateScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", updateScrollState);
      updateScrollState();
      return () => scrollContainer.removeEventListener("scroll", updateScrollState);
    }
  }, []);

  return (
    <div
      className={`relative flex items-center w-full md:mt-[-20px] lg:pt-[15px] lg:pl-6 ${
        theme === "dark" ? "bg-[#0f0f0f] text-white" : "bg-white text-black"
      }`}
    >
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className={`absolute top-1 lg:left-4 lg:top-5 z-30 p-2 2xl:hidden rounded-full transition-opacity duration-300 ${
          canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
        } ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
      >
        <ChevronLeft
          className={`w-5 h-5 ${theme === "dark" ? "text-white" : "text-black"}`}
        />
      </button>

      {/* Left Gradient Overlay */}
      <div
        className={`absolute top-1 lg:top-5 lg:left-5 h-10 w-15 z-10 2xl:hidden pointer-events-none transition-opacity duration-300 ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        } ${
          theme === "dark"
            ? "bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent"
            : "bg-gradient-to-r from-white via-white/80 to-transparent"
        }`}
      ></div>

      {/* Category Items */}
      <div
        ref={scrollRef}
        className={`flex gap-3 overflow-x-auto h-[46px] items-center w-full scrollbar-hide ${
          theme === "dark" ? "bg-[#0f0f0f] text-white" : "bg-white text-black"
        }`}
        style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
      >
        {categories.map((category, index) => (
          <button
            key={index}
            className={`whitespace-nowrap text-[10px] lg:text-[14px] font-semibold shadow-xs cursor-pointer px-[10px] lg:px-[12px] h-[26px] lg:h-[32px] rounded-[8px] transition-colors duration-200 ${
              activeCategory === category
                ? theme === "dark"
                  ? "bg-white text-black"
                  : "bg-[#0f0f0f] text-white"
                : theme === "dark"
                ? "bg-[#242424] hover:bg-[#313131] text-white"
                : "bg-gray-100 hover:bg-gray-200 text-black"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Right Gradient Overlay */}
      <div
        className={`absolute right-13 top-1 lg:top-5 h-10 w-15 z-10 2xl:hidden pointer-events-none transition-opacity duration-300 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        } ${
          theme === "dark"
            ? "bg-gradient-to-l from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent"
            : "bg-gradient-to-l from-white via-white/80 to-transparent"
        }`}
      ></div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className={`absolute right-15 top-1 lg:top-5 z-20 p-2 2xl:hidden rounded-full transition-opacity duration-300 ${
          canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
        } ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
      >
        <ChevronRight
          className={`w-5 h-5 ${theme === "dark" ? "text-white" : "text-black"}`}
        />
      </button>
    </div>
  );
}