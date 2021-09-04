const FlightItem = ({ results, date, arrival, departure, outbound }) => {
  if (results) {
    return (
      <div className="ui segment results__container">
        <div className="results__header">
          {outbound} <div className="results__date">{skyscannerDate(date)}</div>
        </div>

        <div className="results__flight-container">
          <div className="results__flight-airline">
            {results.Carriers[0].Name}
          </div>
          <div className="results__flight-first">
            <div className="results__flight-departure-time">18:20</div>
            <div className="results__flight-departure-airport">{departure}</div>
          </div>
          <div className="results__flight-second">
            <div className="results__flight-direct">
              {results.Quotes[0].Direct === "Direct" ? "Direct" : "Not Direct"}
            </div>
            <i className="plane icon"></i>
          </div>
          <div className="results__flight-third">
            <div className="results__flight-arrival-time">20:20</div>
            <div className="results__flight-arrival-airport">{arrival}</div>
          </div>
        </div>
        <div className="results__price-container">
          <div className="results__price">${results.Quotes[0].MinPrice}</div>
          <button className="ui primary button results__btn">
            Select<i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};

export default FlightItem;
