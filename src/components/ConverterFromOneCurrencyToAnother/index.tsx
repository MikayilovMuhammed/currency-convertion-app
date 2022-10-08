import React from "react";
import { getCurrencyConverter } from "../../redux/actions/currencyConverter";
import { useDispatch, useSelector } from "react-redux";
import { ICurrencyConverter } from "../../redux/interface/ICurrencyConverter";
import { ICurrencySymbols } from "../../redux/interface/ICurrencyExchangeRates";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import "./index.scss";
import { Link } from "react-router-dom";

interface ICurrencyConvertion {
  currencyConvertion: { data: ICurrencyConverter; isLoading: boolean };
  currencySymbols: { data: ICurrencySymbols; isLoading: boolean };
}

function ConverterFromOneCurrencyToAnother() {
  const dispatch = useDispatch();
  const [currencyConveryionState, setCurrencyConveryionState] = React.useState({
    to: "",
    amount: "",
    from: "",
  });

  const { data: currencyConvertion } = useSelector(
    (state: ICurrencyConvertion) => state.currencyConvertion
  );

  const handleChangeAmountAndCurrencySymbol = (e: any) => {
    const { name, value } = e.target;

    setCurrencyConveryionState({ ...currencyConveryionState, [name]: value });
  };

  const { data: currencySymbols } = useSelector(
    (state: ICurrencyConvertion) => state.currencySymbols
  );

  const handleConvertToCurency = React.useCallback(
    (toCurrency: string, fromCurrency: string, amount: string | number) => {
      if (toCurrency.length || fromCurrency.length || Number(amount) > 0) {
        getCurrencyConverter(toCurrency, fromCurrency, amount)(dispatch);
      }
    },
    [dispatch]
  );

  const currencySymbolsKeys = React.useMemo(() => {
    if (currencySymbols?.currencies) {
      return Object.keys(currencySymbols?.currencies);
    }

    return [];
  }, [currencySymbols]);

  return (
    <Container>
      <div className="currency-convertion">
        <h2>Convertion Page</h2>
        <Row>
          <Col md={5}>
            <div className="currency-convertion__from">
              <InputGroup className="currency-convertion__to__input">
                <Form.Control
                  placeholder="From"
                  defaultValue="0"
                  value={currencyConveryionState.amount}
                  name="amount"
                  onChange={(e) => handleChangeAmountAndCurrencySymbol(e)}
                />
              </InputGroup>
              <Form.Select
                aria-label="Default select example"
                className="currency-convertion__to__select-option"
                name="from"
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
          <Col md={2}>
            <div className="currency-convertion__convert text-center">
              <Button
                onClick={() =>
                  handleConvertToCurency(
                    currencyConveryionState.to,
                    currencyConveryionState.from,
                    currencyConveryionState.amount
                  )
                }
              >
                Convert
              </Button>
            </div>
          </Col>
          <Col md={5}>
            <div className="currency-convertion__to">
              <InputGroup className="currency-convertion__to__input">
                <Form.Control
                  placeholder="To"
                  disabled
                  defaultValue={0}
                  value={
                    currencyConvertion?.result &&
                    (currencyConvertion?.result).toFixed(2)
                  }
                />
              </InputGroup>
              <Form.Select
                aria-label="Default select example"
                className="currency-convertion__to__select-option"
                name="to"
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
        </Row>
      </div>

      <Link to={"/"}>Back to home page</Link>
    </Container>
  );
}

export default ConverterFromOneCurrencyToAnother;
