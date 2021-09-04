const skyscannerDate = (dateWithTime) => {
  let arr = Array.from(dateWithTime).slice(0, 10).join("");
  let organizedDate = [
    arr[8],
    arr[9],
    "-",
    arr[5],
    arr[6],
    "-",
    arr[0],
    arr[1],
    arr[2],
    arr[3],
  ];
  return organizedDate;
};
export default skyscannerDate;
