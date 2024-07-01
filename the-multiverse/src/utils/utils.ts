export const toSVGPoint = (svg, x, y) => {
  let p = new DOMPoint(x, y);
  return p.matrixTransform(svg.getScreenCTM().inverse());
};

export const lineColors = [
  "red",
  "Khaki",
  "powderblue",
  "orange",
  "cyan",
  "seashell",
  "yellow",
  "salmon",
  "pink",
  "plum",
  "palegreen",
  "springgreen",
  "turquoise",
  "whitesmoke",
  "sandybrown",
];
