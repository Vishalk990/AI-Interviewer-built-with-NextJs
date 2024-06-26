import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech");
    }
  };

  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion?.map((question, index) => (
          <h2
            key={index}
            className={`p-2  rounded-full text-xs md:text-sm text-center cursor-pointer
                    ${activeQuestionIndex === index && `bg-black text-white`}`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>
      <h2 className="my-5 text-sm md:text-md">
        {mockInterviewQuestion?.[activeQuestionIndex]?.Question}
      </h2>
      <Volume2
        className="curson-pointer"
        onClick={() =>
          textToSpeech(mockInterviewQuestion?.[activeQuestionIndex]?.Question)
        }
      />

      <div className="p-5 border rounded-lg bg-blue-100 mt-20">
        <h2 className="flex gap-2 items-center text-blue-500">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-blue-500 my-2">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </h2>
      </div>
    </div>
  );
}

export default QuestionsSection;
