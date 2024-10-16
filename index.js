const getQuestions = questionList => {
  // fisher-yates algo
  for (let i = questionList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questionList[i], questionList[j]] = [questionList[j], questionList[i]];
  }

  return questionList.slice(0, 10);
};

// // generate html template
const generateQuestions = questions => {
  const quiz = document.querySelector('.quiz-form');

  questions.forEach(question => {
    const questionEl = document.createElement('div');
    questionEl.innerHTML = `
<label>${question.question}</label>
`;
    quiz.appendChild(questionEl);
  });
};

const main = () => {
  fetch('./db.json')
    .then(response => response.json())
    .then(data => {
      const questions = getQuestions(data.data);
      generateQuestions(questions);
    });
};

main();
