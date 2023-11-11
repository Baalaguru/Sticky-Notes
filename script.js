let notes = [];

function createNote() {
  showModal();
}

function saveNote() {
  const noteText = document.getElementById("note-text").value;
  if (noteText.trim() !== "") {
    notes.push(noteText);
    renderNotes();
    closeModal();
  }
}

function deleteNote(index) {
  notes.splice(index, 1);
  renderNotes();
}

function editNote(index) {
  document.getElementById("note-text").value = notes[index];
  showModal();
}

function renderNotes() {
  const notesContainer = document.getElementById("notes-container");
  notesContainer.innerHTML = "";

  for (let i = 0; i < notes.length; i++) {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.textContent = notes[i];
    noteDiv.setAttribute("onclick", `editNote(${i})`);

    const deleteButton = document.createElement("span");
    deleteButton.textContent = "X";
    deleteButton.classList.add("close");
    deleteButton.setAttribute("onclick", `deleteNote(${i})`);
    noteDiv.appendChild(deleteButton);

    notesContainer.appendChild(noteDiv);
  }
}

function showModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
  document.getElementById("note-text").value = "";
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

renderNotes();
