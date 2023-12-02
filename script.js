// script.js
let idb = indexedDB.open("notes-editor", 1);

idb.onupgradeneeded = () => {
  let res = idb.result;
  res.createObjectStore("notes", { autoIncrement: true });
};

idb.onsuccess = () => {
  let res = idb.result;
  let tx = res.transaction("notes", "readonly");
  let store = tx.objectStore("notes");
  let cursor = store.openCursor();
  let noteCard = "";

  cursor.onsuccess = () => {
    let notes = cursor.result;

    if (notes) {
      noteCard += `<div class="col">
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">${notes.value.Title}</h5>
                        <p>${notes.value.Content}</p>
                        <a href="#" class="btn btn-primary px-4 mt-4" onclick="viewNote(${notes.key})">view</a>
                    </div>
                    <div class="card-footer text-muted">${notes.value.DateTime}</div>
                </div>
            </div>`;
      document.getElementById("notes-view").innerHTML = noteCard;
      notes.continue();
    }
  };
};

let addNote = () => {
  let newTitle = document.getElementById("add-note-title").value;
  let newContent = document.getElementById("add-note-content").value;
  let date = new Date();
  var newDateTime = date.toLocaleString();

  let idb = indexedDB.open("notes-editor", 1);

  idb.onupgradeneeded = () => {
    let res = idb.result;
    res.createObjectStore("notes", { autoIncrement: true });
  };

  idb.onsuccess = () => {
    let res = idb.result;
    let tx = res.transaction("notes", "readwrite");
    let store = tx.objectStore("notes");

    store.put({
      Title: newTitle,
      Content: newContent,
      DateTime: newDateTime,
    });
  };
  location.reload();
};

let viewNote = (key) => {
  let idb = indexedDB.open("notes-editor", 1);
  idb.onupgradeneeded = () => {
    let res = idb.result;
    res.createObjectStore("notes", { autoIncrement: true });
  };

  idb.onsuccess = () => {
    let res = idb.result;
    let tx = res.transaction("notes", "readonly");
    let store = tx.objectStore("notes");
    let cursor = store.openCursor();

    cursor.onsuccess = () => {
      let note = cursor.result;
      if (note && note.key === key) {
        console.log(note.value);
      }
    };
  };
};
