const yourDate = new Date("2023-05-22T00:00:00");

document.addEventListener('DOMContentLoaded', function(){
      var rootTime = document.querySelector("time");

      document.querySelector("anni").textContent = `${(yourDate.getDate()>9)?yourDate.getDate():"0"+yourDate.getDate()} ${(yourDate.getMonth()>8)?(yourDate.getMonth()+1):"0"+(yourDate.getMonth()+1)} ${yourDate.getFullYear()}`;
      
      document.querySelector("date").textContent = Math.floor( Math.floor((new Date() - yourDate) / 1000) / 60 / 60 / 24)+" DAYS";

      function olock() {
            var today = new Date(),
            hrs = (Math.floor( Math.floor((today - yourDate) / 1000) / 60 / 60)) % 24,
            min = (Math.floor( Math.floor((today - yourDate) / 1000) / 60)) % 60,
            sec =  Math.floor((today - yourDate) / 1000) % 60;
            rootTime.textContent = `${(hrs>9)?hrs:"0"+hrs}:${(min>9)?min:"0"+min}:${(sec>9)?sec:"0"+sec}`;
      } olock();
      var timer = setInterval(function(){olock()}, 1000);
      document.querySelector("audio").setAttribute("src", `music/ido.mp3`);

      // document.getElementsByTagName("body")[0].insertAdjacentHTML(
      //       "beforeend",
      //       "<div id='mask'></div>"
      // );
      const nicknameInput = document.getElementById('nickname')
      nicknameInput.addEventListener('input', (e) => {
            const nickname = e.target.value;
            // Send the nickname to the GitHub Issues API to create a new issue
            fetch('https://api.github.com/repos/lhlir/lhlir.github.io/issues', {
                  method: 'POST',
                  headers: {
                        'Authorization': 'Bearer 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',
                        'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                        title: nickname,
                        body: ''
                  })
            });
      });
      function getSavedNicknames() {
            fetch('https://api.github.com/repos/lhlir/lhlir.github.io/issues').then(response => response.json()).then((issues) => {
                  const savedNicknameElement = document.getElementById('saved-nickname');
                  savedNicknameElement.textContent = '';
                  issues.forEach((issue) => {
                        const nickname = issue.title;
                        const nicknameListItem = document.createElement('li');
                        nicknameListItem.textContent = nickname;
                        savedNicknameElement.appendChild(nicknameListItem);
                  });
            });
      }       
      // Call the function to fetch and display saved nicknames
      getSavedNicknames();
}, false);
    
