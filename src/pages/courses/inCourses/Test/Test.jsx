import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { taskLearn } from "@/Data";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import Compiler from "./Compiler";

const Test = () => {
  const { namelink } = useParams();
  const navigate = useNavigate();

  const handleDotClick = (index) => {
    setActiveDot(index);
  };

  const handleNextDot = () => {
    setActiveDot((prevDot) => (prevDot === 4 ? 0 : prevDot + 1));
  };

  const handlePrevDot = () => {
    setActiveDot((prevDot) => (prevDot === 0 ? 4 : prevDot - 1));
  };

  const [activeDot, setActiveDot] = useState(0);
  const [leftChevronClicked, setLeftChevronClicked] = useState(false);
  const [rightChevronClicked, setRightChevronClicked] = useState(false);
  const [leftChevronColor, setLeftChevronColor] = useState(
    "bg-[#F1F1F1] text-black"
  );
  const [rightChevronColor, setRightChevronColor] = useState(
    "bg-Orange_Primary text-white"
  );

  const renderRxDotFilledIcons = () => {
    const icons = [];
    const iconColor = "text-[#F1F1F1]"; // Default color
    for (let i = 0; i < 5; i++) {
      const isActive = i === activeDot;
      if (isActive) {
        icons.push(
          <RxDotFilled
            key={i}
            className={`w-6 h-6 text-Orange_Primary`}
            onClick={() => handleDotClick(i)}
          />
        );
      } else {
        icons.push(
          <RxDotFilled
            key={i}
            className={`w-6 h-6 ${iconColor}`}
            onClick={() => handleDotClick(i)}
          />
        );
      }
    }
    return icons;
  };

  const handleLeftChevronClick = () => {
    setLeftChevronClicked(true);
    setRightChevronClicked(false);
    setLeftChevronColor("bg-Orange_Primary text-white");
    setRightChevronColor("bg-[#F1F1F1] text-black");

    setActiveDot((prevDot) => (prevDot === 0 ? 4 : prevDot - 1));
    navigate("/courses/${namelink}");
  };

  const handleRightChevronClick = () => {
    setRightChevronClicked(true);
    setLeftChevronClicked(false);
    setRightChevronColor("bg-Orange_Primary text-white");
    setLeftChevronColor("bg-[#F1F1F1] text-black");

    setActiveDot((prevDot) => (prevDot === 4 ? 0 : prevDot + 1));
    navigate(`/courses/${namelink}/test`);
  };

  return (
    <div className="md:section container mx-auto pt-24 pb-24 px-6" id="test">
      <div className="text-start">
        <p className="font-semibold text-sm mb-2 md:text-sm md:mb-2 text-Orange_Primary">
          Test Pembelajaran
        </p>
        <h1 className="font-semibold text-xl md:text-3xl md:mb-2">
          Mengenal HTML CSS untuk Pemula
        </h1>
        <div className="relative flex items-center">
          <div className="justify-start">
            <p className="font-normal text-sm text-[#667085]">
              Kerjakan tugas dengan benar, ilmu yang diberikan pasti akan
              bermanfaat...
            </p>
          </div>
          <div className="flex ml-auto mx-2 -space-x-3">
            {renderRxDotFilledIcons()}
          </div>
          <div className="relative flex">
            <div
              className={`right-0 w-16 h-8 rounded-2xl flex items-center justify-start ${leftChevronColor}`}
              onClick={handleLeftChevronClick}
              onMouseDown={() => setLeftChevronClicked(true)}
              onMouseUp={() => setLeftChevronClicked(false)}
              onMouseLeave={() => setLeftChevronClicked(false)}
            >
              <BsChevronLeft className="w-5 h-5" />
            </div>
            <div
              className={`absolute right-0 w-8 h-8 rounded-2xl flex items-center justify-center ${rightChevronColor}`}
              onClick={handleRightChevronClick}
              onMouseDown={() => setRightChevronClicked(true)}
              onMouseUp={() => setRightChevronClicked(false)}
              onMouseLeave={() => setRightChevronClicked(false)}
            >
              <BsChevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

    

      <div className="flex mt-7 justify-between">
        <div className="flex-grow-0"> {/* Add this flex-grow class */}
          <h1 className="font-semibold text-xl md:text-2xl text-[#333333] ">
            Tugas Saya
          </h1>
          <div className="mt-4">
            {/* Content on the left */}
            {taskLearn.map((task) => (
              <div key={task.id}>
                {task.items.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="flex space-y-3">
                      <div
                        className={`flex items-center text-4xl ${
                          index === 0 ? "text-[#20B486]" : "text-[#FF9B26]"
                        }`}
                      >
                        {item.icons}
                      </div>
                      <div className="ml-6">
                        <h3 className="font-semibold text-[#757575]">
                          {item.title}
                        </h3>
                        <h3 className="mt-1 text-sm text-[#8C8C8C]">
                          {item.subtitle}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-grow-0"> {/* Add this flex-shrink-0 class */}
          <Compiler /> {/* Compiler component on the right */}
        </div>
      </div>
    </div>
  );
};

export default Test;