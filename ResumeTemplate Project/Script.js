localStorage.setItem('Username', 'sruthi');
localStorage.setItem('Password', 'sruthi1112');

function validuser() {
  let validUsername = localStorage.getItem('Username');
  let validPassword = localStorage.getItem('Password');
  var nameinput = document.getElementById('name').value;
  var passwordinput = document.getElementById('password').value;

  if ((nameinput == validUsername) && (passwordinput == validPassword)) {
    window.location.href = "resumepage.html";
  }
  else {
    document.getElementById("loginpage").innerHTML = "invalid username/password."
    document.body.style.color = "red";
  }
}


let allResumes=[];
function getJsonData() {
  fetch("./Data (1).json")
    .then(response => response.json())
    .then(data => {
      allResumes = data.resume;
      diaplayResumes(allResumes);
    });
  }

      function diaplayResumes(elements){
        const resumeLoading = document.getElementById('resumehere');
        const noMatchesMessage = document.getElementById('no-matches-message');

        resumeLoading.innerHTML = '';
        noMatchesMessage.style.display = 'none';
        
        if(elements.length === 0){
          noMatchesMessage.style.display = 'block';
        }
        else{
      elements.forEach(element => {
        const resumeDisplay = document.createElement('div');
        resumeDisplay.classList.add('displayView');

        const keyskills = element.skills.keywords.map(skills =>
          `<span>${skills}</span><br>`).join(' ');

        const hobby = element.interests.hobbies.map(interests =>
          `<span>${interests}</span><br>`).join(' ');

        const achieve = element.achievements.Summary.map(achievements =>
          `<li>${achievements}</li>`).join(' ');

        resumeDisplay.innerHTML = `
         <header>
        <h2>${element.basics.name}</h2>
        <span>Applied for : ${element.basics.AppliedFor}</span>
        <img> ${element.basics.image}</img>
        </header>
       
        <article>
        <h2> Personal Infromation </h2>
        <span>${element.basics.email}</span><br>
        <span>${element.basics.phone}</span><br>
        <span>${element.basics.profiles.url}</span><br>
        
         <h2> Technical Skills </h2>
         <span>${keyskills}</span><br>
        
         <h2> Hobbies </h2>
         <span>${hobby}</span>
        </article>

       <div>
         <h2>Work Experience in pervious company</h2>
         <b>company name : </b> <span>${element.work["Company Name"]}</span><br><br>
         <b>Positions :</b> <span>${element.work.Position}</span><br><br>
         <b>Start date </b> <span>${element.work["Start Date"]}</span><br><br>
         <b>End date : </b> <span>${element.work["End Date"]}</span><br><br>
         <p><b> Summary : </b>${element.work.Summary}</p>

        <h2>Projects</h2>
        <p><b>${element.projects.name} : </b>${element.projects.description}</p>
   
        <h2>Education</h2>
        <ul>
        <li><p><b> UG : </b>${element.education.UG.institute},
        ${element.education.UG.course},${element.education.UG["Start Date"]},
        ${element.education.UG["End Date"]}, ${element.education.UG.cgpa}</p> </li>

        <li><p><b> PU : </b>${element.education["Senior Secondary"].institute},
        ${element.education["Senior Secondary"].cgpa}</p> </li>

        <li><p><b> High School : </b>${element.education["High School"].institute},
        ${element.education["High School"].cgpa}</p> </li>
        </p>
        </ul>

      <h2>Internship</h2>
      <ul>
        <li><b>company name : </b> <span>${element.Internship["Company Name"]}</span><br></li>
        <li> <b>Positions :</b> <span>${element.Internship.Position}</span><br></li>
        <li> <b>Start date </b> <span>${element.Internship["Start Date"]}</span><br></li>
        <li> <b>End date : </b> <span>${element.Internship["End Date"]}</span><br></li>
        <li> <span><b> Summary : </b>${element.Internship.Summary}</span></li>
      </ul>

      <h2>Achievements</h2>
      <ul> ${achieve}</ul>
</div>
        `;
        resumeLoading.appendChild(resumeDisplay);
      });
    }
}
function matchedresumes(){
  console.log("hi hello")
  const resumeLoading = document.getElementById('searching');
  const key=resumeLoading.value.toLowerCase();
  const filtered= allResumes.filter(element =>element.skills.keywords
   .some(keyskills => keyskills.toLowerCase().includes(key)));
   diaplayResumes(filtered);
}
function matchedresumes() {
    const resumeLoading = document.getElementById('searching');
    resumeLoading.addEventListener('keypress', checkingenter);
    function checkingenter(evt){
      const key=resumeLoading.value.toLowerCase();
      if(evt.keypress == 13 && key.length>1 ){
        console.log("hi from if")
        const filtered= allResumes.filter(element =>element.skills.keywords
          .some(keyskills => keyskills.toLowerCase().includes(key)));
          diaplayResumes(filtered);
      }
      if(evt.keypress == 13 && key.length<1 ){
        console.log("hi theree")
       document.getElementById('resumehere').innerHTML="enter vaild details"
       document.body.style.color='red';
      }
      }
  }
    



