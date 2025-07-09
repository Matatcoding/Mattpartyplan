let parties = [];
let selectedParty;

const getMoreInfo = async (id) => {
  try {
    const response = await fetch(
      `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2505-ftb-ct-web-pt/events/${id}`
    );
    const data = await response.json();
    console.log(data.data);
    selectedParty = data.data;
    render();
  } catch (error) {
    console.error(error);
  }
};

const header = () => {
  $header = document.createElement("header");
  $title = document.createElement("h1");
  $title.textContent = "Party Planner";
  $header.append($title);
  return $header;
};

const displayResults = () => {
  $upcomingSec = document.createElement("section");
  $h2 = document.createElement("h2");
  $h2.textContent = "Upcoming Parties";
  $upcomingSec.append($h2);

  for (const element of parties) {
    $h3 = document.createElement("h3");
    $h3.textContent = element.name;
    $h3.addEventListener("click", () => getMoreInfo(element.id));
    $upcomingSec.append($h3);
  }
  return $upcomingSec;
};

const partyDetails = () => {
  $detailsSec = document.createElement("section");
  if (!selectedParty) {
    $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    $detailsSec.append($p);
    return $detailsSec;
  }
  const $party = document.createElement("section");
  $party.innerHTML = `
      <h3>${selectedParty.name}   id: #${selectedParty.id}</h3>
      <time>Date: ${selectedParty.date.slice(0, 10)}</time>
      <address>Address: ${selectedParty.location}</address>
      <p>${selectedParty.description}</p>
    `;

  return $party;
};

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2505-ftb-ct-web-pt/events"
    );

    const data = await response.json();
    console.log(data.data);
    parties = data.data;
    render();
  } catch (error) {
    console.error(error);
  }
};

const render = () => {
  const $app = document.querySelector("#app");
  $app.innerHTML = "";

  $app.append(header());

  $content = document.createElement("div");
  $content.classList.add("partyInfo");
  $content.append(displayResults());
  $content.append(partyDetails());

  $app.append($content);
};

const start = () => {
  fetchData();
};

start();
