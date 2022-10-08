import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./index.scss";

import convertionImg from "../../assets/images/currency-exchange.png";
import exchangeRatesImg from "../../assets/images/exchange-rates.jpeg";
import { getCurrencySymbols } from "../../redux/actions/exchangeCurrency";
import { useDispatch } from "react-redux";

function Home() {
  const { push } = useHistory();

  const dispatch = useDispatch();

  const handleGoToConvertionPage = () => push("/convertion");
  const handleGoToExchangeRatesPage = () => push("/current-exchange");

  React.useEffect(() => {
    getCurrencySymbols()(dispatch);
  }, [dispatch]);
  return (
    <Container>
      <div className="currency-converter-app">
        <div className="currency-converter-app__title">
          <h2>Welcome to Currency Convertion App</h2>
        </div>
      </div>

      <Row>
        <Col md={6}>
          <Card className="currency-converter-app__card">
            <Card.Img
              variant="top"
              src={convertionImg}
              className="currency-converter-app__card__image"
              onClick={handleGoToConvertionPage}
            />
            <Card.Body>
              <Card.Title>Currency Convertion</Card.Title>
              <Card.Text>You can convert your currency on this page</Card.Text>
              <Button onClick={handleGoToConvertionPage}>
                Go to convertion page
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="currency-converter-app__card">
            <Card.Img
              variant="top"
              src={exchangeRatesImg}
              className="currency-converter-app__card__image"
              onClick={handleGoToExchangeRatesPage}
            />
            <Card.Body>
              <Card.Title>Exchange rates</Card.Title>
              <Card.Text>
                You can see latest exchange rate between currency
              </Card.Text>
              <Button onClick={handleGoToExchangeRatesPage}>
                Go to convertion page
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
