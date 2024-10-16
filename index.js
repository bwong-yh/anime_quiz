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

const createSubmitBtn = () => {
  const submitBtn = document.createElement('input');
  submitBtn.type = 'submit';
  submitBtn.value = 'submit';
  quiz.appendChild(submitBtn);
};

const generateQuestions = questions => {
  questions.forEach((question, index) => {
    const questionBox = document.createElement('div');
    questionBox.setAttribute('class', 'my-5');

    const questionLabel = document.createElement('p');
    questionLabel.setAttribute('class', 'lead font-weight-normal');
    questionLabel.innerText = question.question;

    const optionsHTML = question.options
      .map(option => {
        return `
      <div class="form-check my-2 text-white-50">
        <input type="radio" name="q${index + 1}" value="${option}">
        <label class="form-check-label">${option}</label>
      </div>
      `;
      })
      .join('');

    questionBox.appendChild(questionLabel);
    questionBox.innerHTML += optionsHTML;
    quiz.appendChild(questionBox);
  });

  createSubmitBtn();
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
