window.addEventListener('scroll', function() {
  const boxes = document.querySelectorAll('.caja1');
  boxes.forEach(box => {
    const position = box.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      box.classList.add('slide-left');  // o slide-left
    }
  });
});