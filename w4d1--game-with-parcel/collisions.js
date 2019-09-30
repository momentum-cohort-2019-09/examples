export function colliding (b1, b2) {
  return !(
    b1.safe ||
    b2.safe ||
    b1 === b2 ||
        b1.center.x + b1.size.width / 2 < b2.center.x - b2.size.width / 2 ||
        b1.center.y + b1.size.height / 2 < b2.center.y - b2.size.height / 2 ||
        b1.center.x - b1.size.width / 2 > b2.center.x + b2.size.width / 2 ||
        b1.center.y - b1.size.height / 2 > b2.center.y + b2.size.height / 2
  )
}
