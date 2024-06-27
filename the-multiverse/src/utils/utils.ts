export const toSVGPoint = (svg, x, y) => {
  let p = new DOMPoint(x, y);
  console.log("DOMPOINT:", p);
  return p.matrixTransform(svg.getScreenCTM().inverse());
};
