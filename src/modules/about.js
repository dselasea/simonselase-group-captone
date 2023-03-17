const commentPopUp = document.querySelector('.popup');
export default function displayAboutPopup() {
  commentPopUp.innerHTML = `
  <div class="about-window">
  <span class="close">x</span>
  <div class="about-card clear">
  <h1>About this project</h1>
  <p>The Microverse bootcamp's JavaScript capstone project is a dynamic Pokemon deck built by <a href="https://github.com/dselasea" target="_blank">Daniel Selase</a> and <a href="https://github.com/BB-Simon" target="_blank">BB Simon</a>.Using the Pokemon API and Involvement API for comments and likes, the deck offers an engaging user experience for Pokemon fans. With their knowledge of JavaScript, the team has crafted a user-friendly interface that allows users to browse and view various Pokemon, along with the ability to like and comment on each Pokemon's information. This project showcases the developers' ability to utilize APIs and create functional web applications.
  </p>
  </div>
</div>
  `;
}