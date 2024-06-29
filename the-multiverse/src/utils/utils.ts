export const toSVGPoint = (svg, x, y) => {
  let p = new DOMPoint(x, y);
  return p.matrixTransform(svg.getScreenCTM().inverse());
};
