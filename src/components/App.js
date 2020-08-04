import React from "react";
import { SeatContext } from "./SeatContext";
import GlobalStyles from "./GlobalStyles";
function App() {
  const {
    state: { numOfRows },
    actions: { recieveSeatInfoFromServer },
  } = React.useContext(SeatContext);
  React.useEffect(() => {
    fetch("/api/seat-availibility")
      .then((res) => res.json())
      .then((data) => recieveSeatInfoFromServer(data));
  }, []);
  console.log(SeatContext);
  return (
    <>
      <GlobalStyles />
      This venue has this number of rows: {numOfRows}
    </>
  );
}
export default App;
