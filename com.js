document.body.style.background = "LightCyan"
function da() {
  dat = document.getElementById("dat")
  let date = new Date()
  dat.innerHTML = `<b>${date}</b>`
}
setInterval(da, 1000);
show();
addBtn = document.getElementById("addBtn")

addBtn.addEventListener("click", function (e) {

  let addTxt = document.getElementById("addTxt");
  let addTit = document.getElementById("addTit");
  notes = localStorage.getItem("notes")
  if (notes == null) {
    note_obj = []
    note_Tit = []
  }
  else {
    note_obj = JSON.parse(localStorage.getItem("notes"))
    note_Tit = JSON.parse(localStorage.getItem("Title"))
  }
  note_Tit.push(addTit.value)
  note_obj.push(addTxt.value)
  addTxt.value = ""
  addTit.value = ""
  localStorage.setItem('Title', JSON.stringify(note_Tit))
  localStorage.setItem('notes', JSON.stringify(note_obj))
  show()

});
function show() {
  let notes = localStorage.getItem("notes");
  Title = localStorage.getItem("Title")
  if (notes == null) {
    notesObj = [];
    notesTit = [];
  } else {
    notesObj = JSON.parse(notes);
    notesTit = JSON.parse(Title)
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
              <div class="noteCard my-2 mx-2 card" style="width: 18rem; background-color:rgb(191, 243, 142);">
                      <div class="card-body">
                          <h5 class="card-title">${notesTit[index]}</h5>
                          <p class="card-text"> ${element}</p>
                          <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                      </div>
                  </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}
function deleteNote(index) {
  notesobj = JSON.parse(localStorage.getItem("notes"))
  notesobj.splice((index), 1)
  notesTit = JSON.parse(localStorage.getItem("Title"))
  notesTit.splice(index, 1)
  localStorage.setItem('notes', JSON.stringify(notesobj))
  localStorage.setItem('Title', JSON.stringify(notesTit))
  show()


}
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("h5")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  })
})
