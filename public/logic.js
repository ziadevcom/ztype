const wordContainer = document.querySelector(".words-container");
const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a porta sapien. Sed fermentum tincidunt massa, sit amet egestas lacus porta vel. Morbi iaculis ante vel consectetur finibus. Sed at tincidunt dui. Ut sagittis nec nisi id mollis. Nullam lorem mi, tempor nec tempus in, semper ut ipsum. Duis tempor massa odio, non bibendum ligula porta ut.".split(
    " "
  );

text.forEach((word) => {
  let div = document.createElement("div");
  div.innerText = word;
  div.className =
    "word text-2xl md:text-3xl text-[#646669] mr-2 mb-2 md:mr-4 mb-4";
  wordContainer.appendChild(div);
});
