document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    {
      question: "What is the smallest planet in our solar system?",
      choices: ["Mars", "Mercury", "Venus", "Earth"],
      answers: "Mercury",
    },
    {
      question: "Who invented the light bulb?",
      choices: [
        "Nikola Tesla",
        "Albert Einstein",
        "Thomas Edison",
        "Isaac Newton",
      ],
      answers: "Thomas Edison",
    },
    {
      question: "Which Surah is the longest in the Quran?",
      choices: ["Al-Kahf", "Al-Baqarah", "Al-Imran", "Yaseen"],
      answers: "Al-Baqarah",
    },
    {
      question: "Which data type is NOT primitive in JavaScript?",
      choices: ["String", "Number", "Object", "Boolean"],
      answers: "Object",
    },
    {
      question: "What is the boiling point of water in Celsius?",
      choices: ["90°C", "100°C", "110°C", "120°C"],
      answers: "100°C",
    },
    {
      question: "Which continent has the most countries?",
      choices: ["Asia", "Africa", "Europe", "South America"],
      answers: "Africa",
    },
    {
      question: "Who was the first Caliph of Islam?",
      choices: ["Umar (RA)", "Ali (RA)", "Abu Bakr (RA)", "Usman (RA)"],
      answers: "Abu Bakr (RA)",
    },
    {
      question: "What is the output of: `typeof null` in JavaScript?",
      choices: ["null", "object", "undefined", "boolean"],
      answers: "object",
    },
    {
      question: "Which famous scientist developed the theory of relativity?",
      choices: ["Newton", "Darwin", "Einstein", "Hawking"],
      answers: "Einstein",
    },
    {
      question: "Which day is considered the weekly holiday in Pakistan?",
      choices: ["Saturday", "Sunday", "Friday", "Monday"],
      answers: "Sunday",
    },
  ];
  // buttons
  const startBtn = document.getElementById("starter-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  // Questions and Choices
  const questionContainer = document.getElementById("questions-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  // Result
  const resultContainer = document.getElementById("result-container");
  const displayScore = document.getElementById("score");

  let currentQuestonIndex = 0;
  let score = 0;
  let isAnswerSelected = false;

  startBtn.addEventListener("click", startQuiz);
  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestions();
  }

  nextBtn.addEventListener("click", nextQuestion);
  function nextQuestion() {
    currentQuestonIndex++;
    if (currentQuestonIndex < questions.length) {
      showQuestions();
    } else {
      showResult();
    }
  }

  restartBtn.addEventListener("click", () => {
    currentQuestonIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  function showQuestions() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestonIndex].question;
    choicesList.innerHTML = "";
    isAnswerSelected = false;
    questions[currentQuestonIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.classList.add(
        "bg-gray-300",
        "hover:bg-gray-400",
        "min-w-[80%]",
        "rounded-md",
        "py-1",
        "sm:py-3",
        "mt-2",
        "font-bold",
        "flex",
        "justify-center",
        "gap-3", 
        "items-center",
        "text-black"
      );
      li.innerHTML = `${choice}`;
      li.addEventListener("click", () => selectAnswer(choice, li));
      choicesList.appendChild(li);
    });
  }

  function selectAnswer(choice, li) {
    if (isAnswerSelected) return;
    isAnswerSelected = true;
    const correctAnswer = questions[currentQuestonIndex].answers;

    // Create icon span
    const icon = document.createElement("span");
    icon.classList.add("ml-2", "text-xl");

    if (choice === correctAnswer) {
      nextBtn.classList.remove("hidden");
      li.classList.add("border", "border-green-800", "bg-green-500");
      li.classList.remove("bg-gray-300", "hover:bg-gray-400");
      score++;
      icon.textContent = "✓"; // Correct icon
      icon.classList.add("text-white");
    } else {
      nextBtn.classList.remove("hidden");
      li.classList.add("border", "border-red-800", "bg-red-500");
      li.classList.remove("bg-gray-300", "hover:bg-gray-400");
      icon.textContent = "✗"; // Wrong icon
      icon.classList.add("text-white");
    }

    li.appendChild(icon);

    // Disable other options
    const allOptions = choicesList.querySelectorAll("li");
    allOptions.forEach((option) => {
      if (option !== li) {
        option.classList.add(
          "pointer-events-none",
          "opacity-50",
          "cursor-not-allowed"
        );
        option.classList.remove("hover:bg-gray-400");
      }
    });
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    displayScore.textContent = `${score} out of ${questions.length}`;
    restartBtn.classList.remove("hidden");
  }
});
