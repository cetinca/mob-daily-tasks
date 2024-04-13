const inputEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const notListEl = document.getElementById("note-list")


addButtonEl.addEventListener("click", addNote)


function generateUniqueID() {
    return crypto.randomUUID();
  }

function setNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes))
}

function getNotes() {
    return JSON.parse(localStorage.getItem("notes")) || []
}

function addNote() {
    let inputValue = inputEl.value
    if (!inputValue) {
        inputEl.focus()
        return
    }
    const notList = getNotes()
    const note = { id: generateUniqueID(), text: inputEl.value }
    notList.push(note)
    setNotes(notList)
    renderNotes(notList)
    inputEl.value = ""
    inputEl.focus()
}


function deleteNote(event) {
    const liId = event.target.id
    const notes = getNotes()
    const newNotes = []
    notes.map(note => {
        liId !== note.id && newNotes.push(note)
    })
    setNotes(newNotes)
    renderNotes(newNotes)
}

inputEl.addEventListener("keypress", (event) => {
    event.key === "Enter" &&  addNote();
      })

function renderNotes(notes) {
    notListEl.innerHTML = ""
    notes.map(note => {
        const noteLi = document.createElement("li")
        noteLi.id = note.id
        noteLi.innerText = note.text
        noteLi.className = "note"
        noteLi.onclick = deleteNote
        console.log(noteLi)
        notListEl.append(noteLi)
    })
}

renderNotes(getNotes())