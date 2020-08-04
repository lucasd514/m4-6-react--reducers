import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";
import { ReactComponent as Seat } from "../assets/seat-available.svg";
import { getRowName, getSeatNum } from "../helpers";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { range } from "../utils";

const TicketWidget = () => {
  const {
    state: { hasLoaded, seats, numOfRows, seatsPerRow },
  } = React.useContext(SeatContext);
  // TODO: use values from Context
  if (!hasLoaded) {
    return <CircularProgress />;
  }
  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  return (
    <Wrapper>
      {range(numOfRows).map((rowIndex) => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map((seatIndex) => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
              const isAvailable = seats[seatId];
              const toolTipContent = isAvailable
                ? `Row: ${rowName} Seat: ${getSeatNum(seatIndex)} Price: ${
                    isAvailable.price
                  } $`
                : "Booked";
              console.log(seatId, isAvailable);

              //here
              return (
                <SeatButton key={seatId}>
                  <Tippy content={toolTipContent}>
                    <Seat
                      rowIndex={rowIndex}
                      seatIndex={seatIndex}
                      width={40}
                      height={40}
                      price={seats.price}
                      status={seats.isBooked ? "unavailable" : "available"}
                      style={{
                        filter: seats.isBooked
                          ? "grayscale(100%)"
                          : "sepia(100%)",
                      }}
                    />
                  </Tippy>
                </SeatButton>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatButton = styled.button`
  padding: 5px;
`;

export default TicketWidget;
