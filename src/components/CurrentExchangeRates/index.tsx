import React from "react";
import { Button, Col, Container, Form, FormLabel, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLatestExchangeRate } from "../../redux/actions/exchangeRate";
import { ICurrencySymbols } from "../../redux/interface/ICurrencyExchangeRates";
import { IExchangeRates } from "../../redux/interface/IExchangeRates";

interface ICurrencyConvertion {
  exchangeRates: { data: IExchangeRates; isLoading: boolean };
  currencySymbols: { data: ICurrencySymbols; isLoading: boolean };
}

function CurrentExchangeRates() {
  const dispatch = useDispatch();
  const [currencyConvertionState, setCurrencyConvertionState] = React.useState({
    currencies: "",
    source: "",
  });

  const [isShowExchangeRates, setIsShowExchangeRates] = React.useState(false);

  const { data: exchangeRates } = useSelector(
    (state: ICurrencyConvertion) => state.exchangeRates
  );
  const { data: currencySymbols } = useSelector(
    (state: ICurrencyConvertion) => state.currencySymbols
  );

  const handleChangeAmountAndCurrencySymbol = (e: any) => {
    setIsShowExchangeRates(false);
    const { name, value } = e.target;

    setCurrencyConvertionState({ ...currencyConvertionState, [name]: value });
  };

  const currencySymbolsKeys = React.useMemo(() => {
    if (currencySymbols?.currencies) {
      return Object.keys(currencySymbols?.currencies);
    }

    return [];
  }, [currencySymbols]);

  const handleFindExchangeRate = React.useCallback(
    (toCurrency: string, fromCurrency: string) => {
      if (toCurrency.length || fromCurrency.length) {
        getLatestExchangeRate(fromCurrency, toCurrency)(dispatch);
        setIsShowExchangeRates(true);
      }
    },
    [dispatch]
  );

  return (
    <div
      onClick={() => console.log("state", exchangeRates)}
      className="text-center mt-5"
    >
      <Container>
        <Row>
          <Col md={6}>
            <div className="exchange-rates">
              <FormLabel>From:</FormLabel>
              <Form.Select
                aria-label="Default select example"
                className="currency-convertion__to__select-option"
                name="source"
                onChange={handleChangeAmountAndCurrencySymbol}
                defaultValue={"Select Currency"}
              >
                <option disabled>Select Currency</option>
                {currencySymbolsKeys?.map((currencySymbol, idx) => (
                  <option key={idx} value={currencySymbol}>
                    {currencySymbol}
                  </option>
                ))}
              </Form.Select>
            </div>
          </Col>
          <Col md={6}>
            <FormLabel>To:</FormLabel>
            <Form.Select
              aria-label="Default select example"
              className="currency-convertion__to__select-option"
              name="currencies"
              onChange={handleChangeAmountAndCurrencySymbol}
              defaultValue={"Select Currency"}
            >
              <option disabled>Select Currency</option>
              {currencySymbolsKeys?.map((currencySymbol, idx) => (
                <option key={idx} value={currencySymbol}>
                  {currencySymbol}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Button
          className="btn-success mt-5"
          onClick={() =>
            handleFindExchangeRate(
              currencyConvertionState.currencies,
              currencyConvertionState.source
            )
          }
        >
          Find rate
        </Button>

        {isShowExchangeRates && (
          <div className="exhcange-rate__result mt-5">
            <h5>
              1 {exchangeRates.source} ={" "}
              {exchangeRates?.quotes[
                `${currencyConvertionState.source}${currencyConvertionState.currencies}`
              ].toFixed(2)}{" "}
              {currencyConvertionState.currencies}
            </h5>
          </div>
        )}

        <Link to={"/"}>Back to home page</Link>
      </Container>
    </div>
  );
}

export default CurrentExchangeRates;
