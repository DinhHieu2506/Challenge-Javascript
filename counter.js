document.addEventListener('DOMContentLoaded', function () {
  const formStep1 = document.querySelector('.step-1-form');
  const formStep2 = document.querySelector('.step-2-form');
  const formStep3 = document.querySelector('.step-3-form');
  const checkboxes = document.querySelectorAll('input[name="topic"]');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');

  const nameDisplay = document.querySelector('.step-3-form__name');
  const emailDisplay = document.querySelector('.step-3-form__email');
  const topicsList = document.querySelector('.step-3-form__list');

  const stepperValue = document.querySelector('[data-cy="stepper-value"]');
  const stepperCircles = document.querySelectorAll('.stepper_circle');

  function updateStepper(stepNumber) {
    stepperValue.textContent = stepNumber;
    
    stepperCircles.forEach((circle, index) => {
      if (index < stepNumber) {
        circle.classList.add('stepper_circle--active');
      } else {
        circle.classList.remove('stepper_circle--active');
      }

      if (index === stepNumber - 1) {
        circle.classList.add('stepper_circle--current');
      } else {
        circle.classList.remove('stepper_circle--current');
      }
    });
  }

  function loadSummaryData() {
    const name = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const topics = JSON.parse(localStorage.getItem('topics') || '[]');

    nameDisplay.innerText = name || '(No name)';
    emailDisplay.innerText = email || '(No email)';

    topicsList.innerHTML = '';
    topics.forEach(topic => {
      const li = document.createElement('li');
      li.textContent = topic;
      topicsList.appendChild(li);
    });
  }


  formStep1.addEventListener('submit', function (e) {
    e.preventDefault(); 

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (username === '') {
      alert('Vui lòng nhập tên');
      return;
    }

    if (!emailRegex.test(email)) {
      alert('Email không hợp lệ');
      return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('email', email);

    formStep1.style.display = 'none';
    formStep2.style.display = 'block';
    updateStepper(2);
  });

 
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      const label = this.closest('.step-2-form__label');
      if (this.checked) {
        label.classList.add('step-2-form__label--checker');
      } else {
        label.classList.remove('step-2-form__label--checker');
      }
    });

    console.log(`Checkbox ${checkbox.value} is ready`);
  });

  formStep2.addEventListener('submit', function (e) {
    e.preventDefault();

    const selectedTopics = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    if (selectedTopics.length === 0) {
      alert('Please select at least one topic!');
      return;
    }

    localStorage.setItem('topics', JSON.stringify(selectedTopics));

    formStep2.style.display = 'none';
    formStep3.style.display = 'block';
    updateStepper(3);
    loadSummaryData(); 
  });


  formStep3.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('✅ Success');
    // window.location.reload();
    localStorage.clear();

    formStep3.style.display = 'none';
    formStep1.style.display = 'block';
    updateStepper(1);
    
    usernameInput.value = localStorage.getItem('username') || '';
    emailInput.value = localStorage.getItem('email') || '';
  });

  
  updateStepper(1);
});
