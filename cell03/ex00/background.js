const btn = document.getElementById('btn');

function randomColor() {
  // ใช้ HSL ให้ได้สีสวย อ่านชัด (ความอิ่ม 70%, สว่าง 35%)
  const h = Math.floor(Math.random()*360);
  return `hsl(${h} 70% 35%)`;
}

btn.addEventListener('click', () => {
  document.body.style.background = randomColor();
});
