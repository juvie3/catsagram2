export const createMainContent = () => {
  let toggle = false;
  let popScore = 0;
  const commentArray = [];
  if (localStorage.getItem("comArr")) {
    let comArrItems = JSON.parse(localStorage.getItem("comArr"));
    comArrItems.forEach ( ele => commentArray.push(ele));
  }

  // Create h1
  const h1 = document.createElement("h1");
  h1.innerText = "Catsagram";
  h1.style.fontSize = "50px";

  // Create img
  const container = document.querySelector(".container");
  container.appendChild(h1);

  h1.addEventListener("click", async () => {
    const img = document.createElement("img");
    img.style.margin = "20px";
    img.style.maxWidth = "750px";
    img.className = "y cats";

    if (localStorage.getItem('urlTarget')) {
      img.src = localStorage.getItem('urlTarget');
    } else {
        const kittenResponse = await fetch(
          // "https://dog.ceo/api/breeds/image/random"

          "https://api.thecatapi.com/v1/images/search?size=small"
        );
        const kittenData = await kittenResponse.json();
        img.src = kittenData[0].url;
      };

    const imgHolder = document.createElement("div");
    imgHolder.className = "x";
    imgHolder.appendChild(img);
    const body = document.querySelector("body");
    body.appendChild(imgHolder);
    body.appendChild(container);
    container.style.position = "absolute";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.transform = "translate(-50%, -50%)";

    img.addEventListener("click", () => {

      img.classList.remove('cats');

      let targetUrl = event.target.src;

      localStorage.setItem('urlTarget', targetUrl);

      const catList = document.getElementsByClassName('cats');
              while (catList[0]) {
                catList[0].parentNode.removeChild(catList[0]);
              };
      // const ele = document.querySelector(".y");
      // if (ele.src !== targetUrl) ele.remove();

      if (toggle === false) {
        h1.style.boxShadow = "0 4px 10px -4px rgb(245, 10, 10)";

        const scoreHolder = document.createElement('div');
        const popScoreContainer = document.createElement("div");

        // popScoreContainer.style.boxShadow = "0 4px 5px -2px rgb(245, 10, 10)"
        scoreHolder.className = "score";

        if(localStorage.getItem("score")) {
          popScore = localStorage.getItem("score");
        }

        scoreHolder.innerText = `${popScore}`;
        popScoreContainer.innerText = `Popularity Score`;

        const voteContainer = document.createElement("div");
        voteContainer.style.display = "grid";
        voteContainer.style.gridTemplateColumns = "1fr 1fr";
        const upVoteBttn = document.createElement("button");
        const downVoteBttn = document.createElement("button");
        downVoteBttn.className = "downBttn";
        upVoteBttn.className = "downBttn";
        upVoteBttn.innerText = "Upvote";
        downVoteBttn.innerText = "Downvote";
        upVoteBttn.style.margin = "10px 5px";
        downVoteBttn.style.margin = "10px 5px";

        upVoteBttn.addEventListener("click", () => {
          popScore++;
          scoreHolder.innerText = `${popScore}`;

          localStorage.setItem("score", popScore);
        });

        downVoteBttn.addEventListener("click", () => {
          popScore--;
          scoreHolder.innerText = `${popScore}`;

          localStorage.setItem("score", popScore);
        });

        voteContainer.appendChild(upVoteBttn);
        voteContainer.appendChild(downVoteBttn);

        const submitComForm = document.createElement("form");
        // const comSpan = document.createElement("spam");
        // comSpan.style.marginRight = "10px";
        // comSpan.innerText = "Comment:";
        submitComForm.style.margin = "5px 5px";
        const comInput = document.createElement("input");
        comInput.className = "inPut";
        comInput.setAttribute("id", "input");
        comInput.setAttribute("type", "text");
        comInput.setAttribute("placeholder", "Add a comment...");
        // comInput.style.margin = "5px 5px";
        const submitBttn = document.createElement("button");
        submitBttn.className = "downBttn";
        submitBttn.setAttribute("id", "submit");
        submitBttn.innerText = "Submit";
        submitBttn.style.marginLeft = "10px";
        submitBttn.style.fontSize = "15px";

        // submitComForm.appendChild(comSpan);
        submitComForm.appendChild(comInput);
        submitComForm.appendChild(submitBttn);

        const displayComContainer = document.createElement("div");
        displayComContainer.style.fontSize = "23px"
        displayComContainer.className = "display";
        displayComContainer.style.borderRadius = "10px";
        displayComContainer.style.width = "800px";
        displayComContainer.style.height = "350px";
        displayComContainer.style.margin = "20px 0px";
        displayComContainer.style.overflowWrap = "break-word";
        displayComContainer.style.overflow = "auto";
        displayComContainer.style.zIndex = "2";


        const ul = document.createElement("ul");

        if (commentArray) {
          for (let ele of commentArray) {
            const newLi2 = document.createElement("li");
            newLi2.innerText = ele;
            ul.appendChild(newLi2);
          };
        }

        submitBttn.addEventListener("click", (e) => {
          e.preventDefault();

          const userComent = comInput.value;

          const newLi = document.createElement("li");

          if (comInput.value) {
            newLi.innerText = userComent;
            ul.appendChild(newLi);
            comInput.value = "";
            commentArray.push(userComent);
            localStorage.setItem("comArr", JSON.stringify(commentArray));
            console.log(localStorage.getItem("comArr"));
          }
        });

        displayComContainer.appendChild(ul);

        const resetButton = document.createElement("button");
        resetButton.className = "downBttn";
        resetButton.innerText = "Reset";
        resetButton.style.marginLeft = "5px";
        resetButton.style.marginRight = "5px";

        resetButton.addEventListener("click", () => {
          location.reload();
          localStorage.removeItem('score');
          localStorage.removeItem('comArr');
          localStorage.removeItem('urlTarget');
        });

        // const removeCats = () => {
        //     const catList = document.get
        // }

        const foundBttn = document.createElement("button")
        foundBttn.className = 'downBttn';
        foundBttn.innerText = 'Focus'
        foundBttn.style.marginRight = "5px"
        // foundBttn.style.fontSize = "20px";

        foundBttn.addEventListener("click", () => {
              const catList = document.getElementsByClassName('cats');
              while (catList[0]) {
                catList[0].parentNode.removeChild(catList[0]);
              };
        });

        const centerBttn = document.createElement('button');
        centerBttn.className = 'downBttn';
        centerBttn.innerText = 'Center';
        centerBttn.style.marginLeft = "5px";

        centerBttn.addEventListener('click', () => {
              const catList = document.getElementsByClassName('y');
              for (let ele of catList) {
                ele.remove();
              };

              const imgCenter = document.createElement('img');
              imgCenter.setAttribute('id', 'imgCenter');
              imgCenter.src = targetUrl;
              imgCenter.style.marginBottom = "12px";
              imgCenter.style.marginTop = "-20px";
              imgCenter.style.height = "150px";
              imgCenter.style.width = "unset";

              const container = document.querySelector(".container");
              container.appendChild(h1);
              container.appendChild(imgCenter);
              container.appendChild(scoreHolder);
              container.appendChild(popScoreContainer);
              container.appendChild(voteContainer);
              container.appendChild(submitComForm);
              container.appendChild(displayComContainer);
              container.appendChild(lowerBttnHolder);

        })

        const lowerBttnHolder = document.createElement('div');
        lowerBttnHolder.appendChild(foundBttn);
        lowerBttnHolder.appendChild(resetButton);
        lowerBttnHolder.appendChild(centerBttn);


        const container = document.querySelector(".container");
        container.appendChild(h1);
        container.appendChild(scoreHolder);
        container.appendChild(popScoreContainer);
        container.appendChild(voteContainer);
        container.appendChild(submitComForm);
        container.appendChild(displayComContainer);
        container.appendChild(lowerBttnHolder);
      }
      toggle = true;
    });
  });
};
