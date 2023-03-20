const quizQuestions = document.getElementById('quiz-questions');
let questions = [{
  question: '',
  answers:[{
    answer: ''
  },{
    answer: ''
  },{
    answer: ''
  }]
},{
  question: '',
  answers:[{
    answer: ''
  },{
    answer: ''
  },{
    answer: ''
  }]
}];
const updateFields = () =>{
  // quizQuestions.innerHTML = '';
  let q = 1;
  for(let question of questions){
    const questionIndex = 'q' + q;

    // Create question container:
    let qDiv = document.createElement('div');
    let qDivName = 'q-container ' + questionIndex;
    qDiv.classList = qDivName;

    // Create delete btn
    let qDelBtn = document.createElement('button');
    qDelBtn.innerText = 'Delete question' + q;
    qDelBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      console.log('We want to delete: ' + questionIndex);
    })

    // Create Label for input:
    let qLabel = document.createElement('label');
    qLabel.setAttribute = ('for', questionIndex);
    qLabel.innerHTML = 'Question ' + q;

    // Create question input:
    let qInput = document.createElement('input');
    qInput.setAttribute('type','text');
    qInput.setAttribute('name','question' + q);
    qInput.setAttribute('id', questionIndex);

    // Create answers container
    const aContainer = document.createElement('div');
    aContainer.classList = 'question-answers';
    
    // Append Question elements to question container:
    qDiv.append(qDelBtn, qLabel, qInput, aContainer);

    // Append question container quesions container:
    quizQuestions.appendChild(qDiv);


    // Iterate answers
    let qa = 1;
    for(let answer of question.answers){
      let answerIndex = 'q'+ q + 'a' + qa;
      
      // Create answer container
      let aDiv = document.createElement('div');
      let aDivName = 'qa-container ' + answerIndex;
      aDiv.classList = aDivName;

      // Create Delete awswer btn
      let aBtn = document.createElement('button');
      aBtn.innerText = 'Delete this answer';
      aBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        confirm('Are you sure you want to delete?')
        e.target.parentNode.innerHTML = "";
      })

      // Create label for answer input
      let aLabel = document.createElement('label');
      aLabel.setAttribute('for', answerIndex);
      aLabel.innerHTML = 'Answer option';

      // Create input for answers
      let aInput = document.createElement('input');
      aInput.setAttribute('type', 'text');
      aInput.setAttribute('name', 'answer');
      aInput.setAttribute('id', answerIndex);

      // Create label for answer correct input:
      let acLabel = document.createElement('label');
      acLabel.setAttribute('for', 'answerOpt' + qa);
      acLabel.innerHTML = 'Correct answer';

      // Create correct answer input:
      let acInput = document.createElement('input');
      acInput.setAttribute('type', 'radio');
      acInput.setAttribute('id', 'answerOpt' + qa);
      acInput.setAttribute('name', 'q' + q + 'Correct');
      acInput.setAttribute('value', qa);

      // Append answer element to answer container
      aDiv.append(aBtn, aLabel, aInput, acLabel, acInput);

      // Append answers to answers container:
      aContainer.append(aDiv);

      qa++;
    }
    q++;
  }
}
updateFields();