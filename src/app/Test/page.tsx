"use client"
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Define types for question options and questions
interface QuestionOption {
  text: string;
  isCorrect: boolean;
}

interface Question {
  actualQuestion: string;
  questionOptions: QuestionOption[];
}

interface QuestionData {
  data: {
    questionPaperFontTemplate: {
      bodyTemplate: {
        templateBuilderInfo: {
          templateParts: {
            questionInfo: Question;
          }[];
        };
      };
    };
  };
}

const Test = () => {
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [startTime, setStartTime] = useState<number | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes timer (600 seconds)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/questionpaper/9763');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setQuestionData(data);
        setStartTime(Date.now());
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prevTime => prevTime - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (questionData?.data.questionPaperFontTemplate.bodyTemplate.templateBuilderInfo.templateParts.length ?? 0) - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleSelectQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmit = () => {
    if (startTime === null) return;

    const endTime = Date.now();
    const elapsedTime = Math.round((endTime - startTime) / 1000); // in seconds
    setTimeElapsed(elapsedTime);

    const totalScore = questionData?.data.questionPaperFontTemplate.bodyTemplate.templateBuilderInfo.templateParts.reduce((acc, part, index) => {
      const selectedOptionIndex = userAnswers[index];
      const isCorrect = part.questionInfo.questionOptions[selectedOptionIndex]?.isCorrect ?? false; // Check if the selected option is correct
      return acc + (isCorrect ? 1 : 0);
    }, 0) ?? 0;

    setScore(totalScore);
    setCompleted(true);
  };

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  if (!questionData) {
    return <p className="text-center mx-auto text-3xl font-bold text-green-600 py-20">Loading...</p>;
  }

  if (completed) {
    return (
      <div className="h-screen  w-screen flex flex-col bg-white">
  <div className="flex-1 flex flex-col justify-center items-center p-6">
    <div className="w-full h-full max-w-6xl max-h-8xl bg-white shadow-lg rounded-md p-6">
      <h1 className="text-4xl text-green-600 font-bold mb-4">Test Completed</h1>
      <div className="flex items-center mb-4">
        {score > (questionData.data.questionPaperFontTemplate.bodyTemplate.templateBuilderInfo.templateParts.length / 2) ? (
          <FaCheckCircle className="text-green-500 text-4xl mr-2" />
        ) : (
          <FaTimesCircle className="text-red-500 text-4xl mr-2" />
        )}
        <p className="text-2xl font-semibold">
          Your Score: {score}/{questionData.data.questionPaperFontTemplate.bodyTemplate.templateBuilderInfo.templateParts.length}
        </p>
      </div>
      <p className="text-xl mb-8">Time Elapsed: {timeElapsed} seconds</p>

      <div className="bg-white p-4 rounded-md shadow-inner">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Suggested Courses for Improvement</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Course 1: Advanced Mathematics</h3>
            <p className="text-gray-700">Deep dive into complex mathematical concepts and improve your problem-solving skills.</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Course 2: Logical Reasoning</h3>
            <p className="text-gray-700">Enhance your logical thinking and analytical abilities with this comprehensive course.</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Course 3: Data Interpretation</h3>
            <p className="text-gray-700">Learn to analyze data effectively and make informed decisions in any field.</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Course 4: Data Interpretation</h3>
            <p className="text-gray-700">Learn to analyze data effectively and make informed decisions in any field.</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Course 5: Data Interpretation</h3>
            <p className="text-gray-700">Learn to analyze data effectively and make informed decisions in any field.</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Course 6: Data Interpretation</h3>
            <p className="text-gray-700">Learn to analyze data effectively and make informed decisions in any field.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    );
  }

  const questions = questionData.data.questionPaperFontTemplate.bodyTemplate.templateBuilderInfo.templateParts;
  const question = questions[currentQuestionIndex].questionInfo;

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="flex items-center justify-between bg-white border-b-2 p-4 text-white">
        <img src="1s.png" alt="Logo" className="h-20" />
        <div className="text-xl font-bold text-green-500">
          Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60} minutes
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center p-6">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl text-green-600 font-bold">Question {currentQuestionIndex + 1}</h1>
          </div>
          <h3 className="text-2xl mb-4">{question.actualQuestion.replace(/<[^>]*>?/gm, '')}</h3>
          <ul className="mb-6">
            {question.questionOptions.map((option, index) => (
              <li key={index} className="mb-2">
                <div
                  onClick={() => handleAnswerChange(currentQuestionIndex, index)}
                  className={`cursor-pointer p-4 rounded-md border-2 ${userAnswers[currentQuestionIndex] === index ? 'border-green-600 bg-blue-100' : 'border-gray-300 hover:border-green-600'} transition duration-300`}
                >
                  {option.text.replace(/<[^>]*>?/gm, '')}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-between p-4 bg-white shadow-md">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 bg-green-600 text-white rounded-md disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
          className="px-4 py-2 bg-green-600 text-white rounded-md disabled:bg-gray-300"
        >
          Next
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Submit
        </button>
      </div>
      <div className="flex justify-center mb-4 bg-white shadow-md px-5 p-4">
  {questions.map((_, index) => (
    <button
      key={index}
      onClick={() => handleSelectQuestion(index)}
      className={`w-8 h-8 rounded-full ${currentQuestionIndex === index ? 'bg-green-600 text-white' : 'bg-gray-200'} mr-2`}
    >
      {index + 1}
    </button>
  ))}
</div>

    </div>
  );
};

export default Test;
