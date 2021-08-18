const placeColor = "#eee";
const placeHighlightedColor = "#aaa";
const item = document.querySelector("#item");

const places = Array.from(document.querySelectorAll(".place"));

let dragging = false;
let x;
let y;
let itemOriginalX;
let itemOriginalY;

updateInlineStyles();

function updateInlineStyles() {
  item.style.top = getComputedStyle(item).top;
  item.style.left = getComputedStyle(item).left;

  places.forEach((place) => {
    const { top, left, width, height } = getComputedStyle(place);
    place.style.width = width;
    place.style.height = height;
    place.style.top = top;
    place.style.left = left;
  });
}

function getCurrentPlace(mx, my) {
  const index = places.findIndex((place) => {
    const placeX1 = parseInt(place.style.left);
    const placeY1 = parseInt(place.style.top);
    const placeX2 = placeX1 + parseInt(place.style.width);
    const placeY2 = placeY1 + parseInt(place.style.height);

    if (mx >= placeX1 && mx <= placeX2 && my >= placeY1 && my <= placeY2) {
      return true;
    }

    return false;
  });

  return index === -1 ? 0 : index;
}

function highlightPlace(placeNo) {
  places.forEach((place) => (place.style["border-color"] = placeColor));
  places[placeNo].style["border-color"] = placeHighlightedColor;
}

function getPlaceRect(placeNo) {
  const place = places[placeNo];
  return {
    left: parseInt(place.style.left),
    top: parseInt(place.style.top),
    width: parseInt(place.style.width),
    height: parseInt(place.style.height),
  };
}

item.onmousedown = (e) => {
  console.log(item.style.left);
  dragging = true;
  x = e.clientX;
  y = e.clientY;
  itemOriginalX = parseInt(item.style.left);
  itemOriginalY = parseInt(item.style.top);
};

item.onmouseup = (e) => {
  dragging = false;

  const rect = getPlaceRect(getCurrentPlace(x, y));

  item.style.left = rect.left + "px";
  item.style.top = rect.top + "px";

  // TODO: check this out
  //
  // const animation = item.animate(
  //   [
  //     {
  //       left: rect.left + "px",
  //       top: rect.top + "px",
  //     },
  //   ],
  //   { duration: 300, fill: "forwards" }
  // );

  // animation.onfinish = () => console.log(item.style.left);
};

item.onmousemove = (e) => {
  if (dragging) {
    dX = e.clientX - x;
    dY = e.clientY - y;
    x = e.clientX;
    y = e.clientY;

    const itemX = parseInt(item.style.left) + dX;
    const itemY = parseInt(item.style.top) + dY;

    item.style.left = itemX + "px";
    item.style.top = itemY + "px";

    highlightPlace(getCurrentPlace(x, y));
  }
};
