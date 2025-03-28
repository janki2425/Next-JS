import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";

const subCategories = [
  "All",
  "Music",
  "Gaming",
];

export default function SubCategory({ onCategoryChange }) {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (category) => {
    try {
      setActiveCategory(category);
      onCategoryChange(category);
    } catch (error) {
      console.error("Error in category change:", error);
    }
  };


  return (
    <div
      className={`flex items-center${
        theme === "dark" ? "bg-[#0f0f0f] text-white" : "bg-white text-black"
      }`}
    >

      {/* Category Items */}
      <div
        className={`flex gap-2 overflow-x-auto h-[46px] items-center w-full scrollbar-hide ${
          theme === "dark" ? "bg-[#0f0f0f] text-white" : "bg-white text-black"
        }`}
        style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
      >
        {subCategories.map((subcategory, index) => (
          <button
            key={index}
            className={`whitespace-nowrap text-[10px] lg:text-[14px] font-semibold shadow-xs cursor-pointer px-[10px] lg:px-[12px] h-[26px] lg:h-[30px] rounded-[8px] transition-colors duration-200 ${
              activeCategory === subcategory
                ? theme === "dark"
                  ? "bg-white text-black"
                  : "bg-[#0f0f0f] text-white"
                : theme === "dark"
                ? "bg-[#242424] hover:bg-[#313131] text-white"
                : "bg-gray-100 hover:bg-gray-200 text-black"
            }`}
            onClick={() => handleCategoryClick(subcategory)}
          >
            {subcategory}
          </button>
        ))}
      </div>

    </div>
  );
}