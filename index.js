const displayResults = (parties) => {
  $app = document.querySelector("#app");
  $header = document.createElement("header");
  $title = document.createElement("h1");
  $title.textContent = "Party Planner";
  $header.append($title);
  $app.append($header);

  $upcomingDiv = document.createElement("div");
  $h2 = document.createElement("h2");
  $h2.textContent = "Upcoming Events";
  $upcomingDiv.append($h2);
  $detailsDiv = document.createElement("div");
  $app.append($upcomingDiv);

  for (const element of parties) {
    $h3 = document.createElement("h3");
    $h3.textContent = element.name;
    //     $img = document.createElement("img");
    //     $img.src = element.image;
    $button = document.createElement("button");
    $button.textContent = "Click to get more info";
    $button.addEventListener("click", () => getMoreInfo(element.id));
    $upcomingDiv.append($h2);
    $upcomingDiv.append($h3);
    //     $div.append($img);
    //     $div.append($button);
  }
  $app.append($detailsDiv);
};

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2505-ftb-ct-web-pt/events"
    );

    const data = await response.json();
    console.log(data.data);
    displayResults(data.data);
  } catch (error) {
    console.error(error);
  }
};

const start = () => {
  console.log("I am in the start function");
  fetchData();
};

start();
