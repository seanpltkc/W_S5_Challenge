async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.

  let mentors = [] // fix this
  let learners = [] // fix this

  async function sprintChallenge5() {
    // 👇 ==================== TASK 1 START ==================== 👇
    
    try {
      // Use Promise.all to fetch both learners and mentors concurrently
      const [learnersResponse, mentorsResponse] = await Promise.all([
        axios.get('https://api.example.com/learners'), // replace with the actual learners endpoint
        axios.get('https://api.example.com/mentors')   // replace with the actual mentors endpoint
      ]);
  
      // Store the data into the respective variables
      let learners = learnersResponse.data; // learners data from API
      let mentors = mentorsResponse.data;   // mentors data from API
  
      // You can log them for verification
      console.log('Learners:', learners);
      console.log('Mentors:', mentors);
  
      // Return the data if needed for further tasks
      return { learners, mentors };
  
    } catch (error) {
      console.error('Error fetching learners or mentors:', error);
    }
  }

  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  // 🧠 Combine learners and mentors.
  // ❗ At this point the learner objects only have the mentors' IDs.
  // ❗ Fix the `learners` array so that each learner ends up with this exact structure:
  // {
  //   id: 6,
  //   fullName: "Bob Johnson",
  //   email: "bob.johnson@example.com",
  //   mentors: [
  //     "Bill Gates",
  //     "Grace Hopper"
  //   ]`
  // }

  async function combineLearnersAndMentors() {
    const { learners, mentors } = await sprintChallenge5(); // Get the learners and mentors from Task 1
  
    // Create a map of mentor IDs to mentor names
    const mentorMap = mentors.reduce((acc, mentor) => {
      acc[mentor.id] = mentor.fullName; // Mentor IDs as keys and full names as values
      return acc;
    }, {});
  
    // Combine learners with their mentor names
    const combinedLearners = learners.map(learner => {
      return {
        id: learner.id,
        fullName: learner.fullName,
        email: learner.email,
        // Replace mentor IDs with actual mentor names using the mentorMap
        mentors: learner.mentorIds.map(mentorId => mentorMap[mentorId])
      };
    });
  
    // Log the combined learners for verification
    console.log('Combined Learners:', combinedLearners);
  
    return combinedLearners;
  
  

  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards')
  const info = document.querySelector('.info')
  info.textContent = 'No learner is selected'


  // 👇 ==================== TASK 3 START ==================== 👇
  async function renderLearners() {
  for (let learner of learners) { // looping over each learner object

    // 🧠 Flesh out the elements that describe each learner
    // ❗ Give the elements below their (initial) classes, textContent and proper nesting.
    // ❗ Do not change the variable names, as the code that follows depends on those names.
    // ❗ Also, loop over the mentors inside the learner object, creating an <li> element for each mentor.
    // ❗ Fill each <li> with a mentor name, and append it to the <ul> mentorList.
    // ❗ Inspect the mock site closely to understand what the initial texts and classes look like!

      // Select the container in the DOM where you want to append learner cards
  const container = document.getElementById('learners-container'); // Ensure this element exists in your HTML

    const card = document.createElement('div')
    const heading = document.createElement('h3')
    const email = document.createElement('div')
    const mentorsHeading = document.createElement('h4')
    const mentorsList = document.createElement('ul')


     // Set the appropriate classes based on the mock site structure
     card.className = 'learner-card';
     heading.className = 'learner-name';
     email.className = 'learner-email';
     mentorsHeading.className = 'mentors-heading';
     mentorsList.className = 'mentors-list';
 
     // Set the text content for the learner's information
     heading.textContent = learner.fullName;
     email.textContent = learner.email;
     mentorsHeading.textContent = 'Mentors:';
 
     // Loop over the learner's mentors and create a list item for each
     for (let mentor of learner.mentors) {
       const mentorItem = document.createElement('li');
       mentorItem.textContent = mentor; // Set mentor name as list item text
       mentorsList.appendChild(mentorItem); // Append each mentor to the list
     }
 
     // Append the elements in the correct order to form the learner card
     card.appendChild(heading);        // Add learner name
     card.appendChild(email);          // Add learner email
     card.appendChild(mentorsHeading); // Add 'Mentors' heading
     card.appendChild(mentorsList);    // Add the list of mentors
 
     // Append the card to the container in the DOM
     container.appendChild(card);
   }
 }
 
 // Call the function to render the learners on the page
 renderLearners();


    // 👆 ==================== TASK 3 END ====================== 👆

    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    card.appendChild(mentorsList)
    card.dataset.fullName = learner.fullName
    cardsContainer.appendChild(card)

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4')
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading
      const isCardSelected = card.classList.contains('selected')
      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected')
        crd.querySelector('h3').textContent = crd.dataset.fullName
      })
      info.textContent = 'No learner is selected'
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected')
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected')
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed')
        } else {
          mentorsHeading.classList.replace('closed', 'open')
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      }
    })
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
