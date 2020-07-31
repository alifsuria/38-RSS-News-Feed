// const url = "https://www.hmetro.com.my/utama.xml";
// const rss_box = document.querySelector("#rss-container > ul");
// feednami.load(url).then((feed) => {
//   rss_box.value = "";
//   console.log(feed);
//   for (let entry of feed.entries) {
//     let li = document.createElement("li");
//     li.classList.add("my-3")
//     li.innerHTML = `<h5><a href="${entry.link}">${entry.title}</a><h5>`;
//     rss_box.appendChild(li);
//   }
// });

const rss_container = document.querySelector("#rss-container > ul");
const timestamp = document.querySelector("#timestamp");
const request = new XMLHttpRequest();
const url = "https://www.hmetro.com.my/utama.xml";
// request.responseType = "document";
// request.overrideMimeType("text/xml");
request.onreadystatechange = function () {
  if (this.readyState === this.DONE && this.status === 200) {
    // console.log(request.response);
    GettingDataFromXML(this);
    timestamp.innerHTML = new Date().toDateString();
  }
};
request.open("GET", url, true);
request.send();

function GettingDataFromXML(xml) {
  let xmlDoc = xml.responseXML;
  let item = xmlDoc.getElementsByTagName("item");
  for (let i = 0; i < item.length; i++) {
    // console.log(item[i]);
    let title = item[i].querySelector("title").textContent;
    let link = item[i].getElementsByTagName("link")[0].textContent;
    let description = item[i].getElementsByTagName("description")[0]
      .textContent;
    // console.log(description);
    let x = description.split(" ").slice(6, -20).join(" ");
    let y = x.slice(9, -12);
    console.log(x, y);
    let li = document.createElement("li");
    li.classList.add("my-3");
    li.innerHTML = `<h5><a href="${link}">${title}</a></h5><p>${y}</p>`;
    rss_container.appendChild(li);
  }
  console.log(xmlDoc);
}
