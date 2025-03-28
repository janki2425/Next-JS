import CategoryNav from "@/components/CategoryNav";
import Navbar from "@/components/Navbar";
import VideoFeed from "@/components/VideoFeed";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleSidebarToggle = (isVisible, isExpanded) => {
    setIsSidebarVisible(isVisible);
    setIsSidebarExpanded(isExpanded);
  };

  return (
    <div className="bg-white dark:bg-[#0f0f0f] text-black dark:text-white min-h-screen">
      {/* Navbar */}
      <Navbar
        setSearchQuery={setSearchQuery}
        onSidebarToggle={handleSidebarToggle}
        initialSidebarExpanded={false}
        alwaysShowSidebar={true}
      />

      <div className="flex">
        {/* Category Navigation */}
        <div
          className={`hidden md:block fixed mt-16 transition-all duration-300 ${
            isSidebarExpanded ? "ml-[230px]" : "ml-[70px]"
          } w-full z-10`}
        >
          <CategoryNav onCategoryChange={(category) => setSelectedCategory(category)} />
        </div>

        {/* Video Feed */}
        <div
          className={`w-full max-w-[2500px] ml-[55px] h-screen 2xl:mx-auto overflow-y-auto scrollbar-hide pt-26 lg:pt-34 transition-all duration-300 ${
            isSidebarExpanded
              ? "lg:ml-[220px] xl:ml-[215px]"
              : "lg:ml-[80px] xl:ml-[60px]"
          }`}
        >
          <VideoFeed
            searchQuery={searchQuery}
            category={selectedCategory}
            isSidebarVisible={isSidebarExpanded}
          />
        </div>
      </div>
    </div>
  );
}