const quizQuestions = document.getElementById('quiz-questions');


let questionsList = [{
  question: 'Question one',
  answers: [{
    answer: 'Answer 1',
    correct: false
  },{
    answer: 'Answer 2',
    correct: true
  },{
    answer: 'Answer 3',
    correct: false
  }]
},{
  question: 'Question two',
  answers: [{
    answer: '1',
    correct: true
  },{
    answer: '2',
    correct: false
  },{
    answer: '3',
    correct: false
  }]
}];

// Questions
// Initiate questions
function initiateQuestions(){
  createNewQuestion();
  updateFields();
}
// Create a new question
function createNewQuestion(){
  questionsList.push({
    question: '',
    answers: [{
      answer: '',
      correct: false
    }]
  })
  updateFields();
}
// Create question text input
function createQuestionTextInput(name, id, value = '', qIndex){
  const textInput = document.createElement('input');
  textInput.setAttribute('type','text');
  textInput.setAttribute('name', name);
  textInput.setAttribute('id', id);
  textInput.value = value;
  
  // Upon writing
  textInput.addEventListener('keyup', ()=>{
    questionsList[qIndex].question = textInput.value;
  })
  return textInput;
}
// Create delete question button
function deleteQuestionBtn(qIndex){
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(confirm('Are you sure you want to delete question?' + qIndex) == true){
      deleteQuestion(qIndex);
    }
  })
  return deleteBtn;
}
// Delete a question
function deleteQuestion(id){
  questionsList.splice(id, 1);
  updateFields();
}

// Answers
// Create new answer
function createNewAnswer(qid){
  questionsList[qid].answers.push({answer: '', correct: false})
}
// Create answer text input
function createAnswerTextInput(name, id, value = '', qIndex, aIndex){
  const textInput = document.createElement('input');
  textInput.setAttribute('type','text');
  textInput.setAttribute('name', name);
  textInput.setAttribute('id', id);
  textInput.value = value;
  
  textInput.addEventListener('keyup', ()=>{
    questionsList[qIndex].answers[aIndex].answer = textInput.value;
  })
  return textInput;
}
// Create delete question button
function deleteAnswerBtn(qIndex, aIndex){
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(confirm('Are you sure you want to delete answer? ' + aIndex) == true){
      deleteAnswer(qIndex, aIndex);
    }
  })
  return deleteBtn;
}
// Delete a answer
function deleteAnswer(qid, aid){
  questionsList[qid].answers.splice(aid, 1);
  updateFields();
}
// Set correct answer
function setCorrectAnswer(qid, aid){
  // Iterate answers in the questionanswers:
  for(let answer of questionsList[qid].answers){
    if(answer.correct == true) answer.correct = false;
  }
  questionsList[qid].answers[aid].correct = true;
}

// Common elements
// Create container
function createContainer(className){
  const container = document.createElement('div');
  container.classList = className;
  return container
}
// Create a label
function createLabel(forEl, text){
  const label = document.createElement('label');
  label.setAttribute = ('for', forEl);
  label.innerHTML = text;
  return label;
}


const updateFields = () =>{
  quizQuestions.innerHTML = '';
  let q = 0;
  for(let question of questionsList){
    const qIndex = q;
    const qName = 'q' + qIndex;
    // Create question container:
    let qDiv = createContainer('q-container ' + 'q' + qIndex);
    // Delete question btn
    let qDelBtn = deleteQuestionBtn(qIndex);
    // Create Label for input:
    let qLabel = createLabel(qName, 'Question:');
    // Create question input:
    let qInput = createQuestionTextInput('questions' + qIndex + '.question', qName , question.question, qIndex);
    // Create answers container
    const aContainer = createContainer('question-answers');
    // Append question container quesions container:
    quizQuestions.appendChild(qDiv);

    // Iterate answers
    let qa = 0;
    for(let answer of question.answers){
      const aIndex = qa;
      let className = 'q'+ qIndex + 'a' + aIndex;
      // Create answer container
      let aDiv = createContainer('qa-container ' + className);
      // Create Delete awswer btn
      let aBtn = deleteAnswerBtn(qIndex, aIndex);
      // Create label for answer input
      let aLabel = createLabel(className, 'Answer option');
      // Create input for answers
      let aInput = createAnswerTextInput('questions' + qIndex + '.answers', className, question.answers[qa].answer, qIndex, aIndex);
      // Create label for answer correct input:
      let acLabel = createLabel('answerOpt' + qa, 'Correct answer')
      // Create correct answer input:
      let acInput = document.createElement('input');
      acInput.setAttribute('type', 'radio');
      acInput.setAttribute('id', 'answerOpt' + aIndex);
      acInput.setAttribute('name', 'questions' + qIndex + '.correct');
      acInput.setAttribute('value', aIndex);
      if(answer.correct == true) acInput.setAttribute('checked', 'checked');
      acInput.addEventListener('click', (e)=>{
        e.preventDefault();
        setCorrectAnswer(qIndex, aIndex);
        updateFields();
      })

      // Append answer element to answer container
      aDiv.append(aBtn, aLabel, aInput, acLabel, acInput);

      // Append answers to answers container:
      aContainer.append(aDiv);

      qa++;
    }
    // Create a add answer btn:
    let addAnswerBtn = document.createElement('button');
    addAnswerBtn.innerText = 'New answer'
    addAnswerBtn.addEventListener('click', (e) =>{
      e.preventDefault();
      createNewAnswer(qIndex);
      updateFields();
    })
        
    // Append Question elements to question container:
    qDiv.append(qDelBtn, qLabel, qInput, aContainer, addAnswerBtn);
    q++;
  }
}

// Create new question
const createNewQBtn = document.getElementById('createNewQBtn');
createNewQBtn.innerText = "New question";
createNewQBtn.addEventListener('click', (e) => {
  e.preventDefault();
  createNewQuestion();
})

updateFields();