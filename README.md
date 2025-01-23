import { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import firstCrousel from "../crousel/firstCrousel";
// Create components for each page

const Page2Component = () => <div>Content for Page 2</div>;
const Page3Component = () => <div>Content for Page 3</div>;
const Page4Component = () => <div>Content for Page 4</div>;
const Page5Component = () => <div>Content for Page 5</div>;
const Page6Component = () => <div>Content for Page 6</div>;
const Page7Component = () => <div>Content for Page 7</div>;
const Page8Component = () => <div>Content for Page 8</div>;
const Page9Component = () => <div>Content for Page 9</div>;
const Page10Component = () => <div>Content for Page 10</div>;

// You can map the page components into an array
const pages = [
  {
    Component: firstCrousel,
    bg: "bg-blue-500",
  },
  {
    Component: Page2Component,
    bg: "bg-green-500",
  },
  { Component: Page3Component, bg: "bg-red-500" },
  { Component: Page4Component, bg: "bg-purple-500" },
  {
    Component: Page5Component,
    bg: "bg-yellow-500",
  },
  {
    Component: Page6Component,
    bg: "bg-orange-500",
  },
  { Component: Page7Component, text: "Page 7: Discovery", bg: "bg-indigo-500" },
  {
    Component: Page8Component,
    bg: "bg-pink-500",
  },
  { Component: Page9Component, text: "Page 9: Resilience", bg: "bg-teal-500" },
  {
    Component: Page10Component,
    bg: "bg-cyan-500",
  },
];

const ParallaxScroll = () => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (progress) => {
      const pageIndex = Math.round(progress * (pages.length - 1));
      setCurrentPage(pageIndex);
    });
  }, [scrollYProgress]);

  const handleChangePages = (index) => {
    if (scrollRef.current) {
      const pageHeight = scrollRef.current.clientHeight;
      scrollRef.current.scrollTo({
        top: index * pageHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={scrollRef}
      className="h-screen overflow-y-scroll w-full snap-y snap-mandatory relative scrollbar-hidden"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {pages.map((page, index) => (
        <ParallaxPage key={index} Component={page.Component} bg={page.bg} />
      ))}

      {/* Navigation Dots */}
      {currentPage !== pages.length - 1 && (
        <div
          className={`${
            currentPage ? "fixed" : ""
          } top-[40%] right-12 transform -translate-x-1/2 flex flex-col gap-2`}
        >
          {pages.map((_, index) => (
            <span
              onClick={() => handleChangePages(index)}
              key={index}
              className={`w-[3px] h-8 cursor-pointer transition-all duration-300 ${
                currentPage === index ? "bg-gray-500" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

const ParallaxPage = ({ Component, bg }) => {
  return (
    <div
      className={`relative h-screen w-full flex items-center justify-center snap-center ${bg}`}
    >
      <div className="relative z-10 text-white text-4xl font-bold text-center p-8">
        <div>
          <Component /> {/* Rendering the passed component */}
        </div>
      </div>
    </div>
  );
};

export default ParallaxScroll;
