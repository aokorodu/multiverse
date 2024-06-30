export const toSVGPoint = (svg, x, y) => {
  let p = new DOMPoint(x, y);
  return p.matrixTransform(svg.getScreenCTM().inverse());
};

export const lineColors = [
  "red",
  "yellow",
  "cyan",
  "green",
  "white",
  "red",
  "yellow",
  "cyan",
  "green",
  "white",
  "red",
  "yellow",
  "cyan",
  "green",
  "white",
];
