const getQuestions = questionList => {
  // fisher-yates algo
  for (let i = questionList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questionList[i], questionList[j]] = [questionList[j], questionList[i]];
  }

  return questionList.slice(0, 10);
};

// generate html template
const quiz = document.querySelector('.quiz-form');

const createQuestionBox = content => {
  return `<div class="my-5">${content}</div>`;
};

const createQuestion = (question, index) => {
  return `<p class="lead font-weight-normal">${question.question}</p>`;
};

const createOptions = (question, index) => {
  return question.options
    .map((option, i) => {
      return `
      <div class="form-check my-2 text-white-50">
        <input 
          type="radio" 
          name="q${index + 1}" value="${option}" 
          ${i === 0 && 'checked'}
        >
        <label class="form-check-label">${option}</label>
      </div>
      `;
    })
    .join('');
};

const generateQuestions = questions => {
  const questionsBox = questions
    .map((question, index) => {
      const q = createQuestion(question, index);
      const options = createOptions(question, index);

      return createQuestionBox(q + options);
    })
    .join('');

  quiz.innerHTML += questionsBox;
};

const createSubmitBtn = () => {
  const submitBtn = document.createElement('input');
  submitBtn.type = 'submit';
  submitBtn.value = 'Submit';

  quiz.appendChild(submitBtn);
};

const main = () => {
  let questions = null;

  fetch('./db.json')
    .then(response => response.json())
    .then(data => {
      questions = getQuestions(data.data);
      generateQuestions(questions);
      createSubmitBtn();
    });

  quiz.addEventListener('submit', e => {
    e.preventDefault();

    const result = document.querySelector('.result');
    let score = 0;

    const answers = questions.map(question => question.answer);
    const userAnswers = questions.map((_, index) => {
      const selectedAnswers = document.querySelector(
        `input[name=q${index + 1}]:checked`
      );
      return selectedAnswers.value;
    });

    userAnswers.forEach(
      (answer, index) => answer === answers[index] && score++
    );

    scrollTo(0, 0);

    result.classList.remove('d-none');
    const resultText = result.querySelector('span');

    let output = 0;
    score = (score / questions.length) * 100;

    setTimeout(() => {
      const timer = setInterval(() => {
        resultText.innerText = `${output}%`;

        output === score ? clearInterval(timer) : output++;
      }, 25);
    }, 750);
  });
};

main();
