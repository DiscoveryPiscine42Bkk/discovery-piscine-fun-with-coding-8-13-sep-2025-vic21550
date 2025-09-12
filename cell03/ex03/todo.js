const COOKIE_NAME = "ft_list";
const oneYear = 365 * 24 * 60 * 60 * 1000;

function readCookie(name) {
  const entry = document.cookie.split("; ").find(r => r.startsWith(name + "="));
  return entry ? decodeURIComponent(entry.split("=")[1]) : null;
}
function writeCookie(name, value) {
  const exp = new Date(Date.now() + oneYear).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/`;
}

let todos = [];
try {
  const raw = readCookie(COOKIE_NAME);
  if (raw) todos = JSON.parse(raw);
} catch { todos = []; }

const list = document.getElementById("ft_list");
const btnNew = document.getElementById("new");

function createItem(text, index) {
  const div = document.createElement("div");
  div.className = "todo";
  div.textContent = text;
  div.addEventListener("click", () => {
    if (confirm("Do you want to remove this TO DO?")) {
      todos.splice(index, 1);
      writeCookie(COOKIE_NAME, JSON.stringify(todos));
      render();
    }
  });
  return div;
}

function render() {
  list.textContent = "";
  todos.forEach((t, i) => list.appendChild(createItem(t, i)));
}

btnNew.addEventListener("click", () => {
  const val = prompt("New TO DO:");
  if (val && val.trim()) {
    todos.unshift(val.trim());
    writeCookie(COOKIE_NAME, JSON.stringify(todos));
    render();
  }
});

render();
