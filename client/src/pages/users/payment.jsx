import React, { useEffect, useState } from "react";
import Receipt from "../../components/users/Receipt";
import ReactLoading from "react-loading";
import styled from "styled-components";
import { REQUEST_URL } from "../../config.json";

const Loading = ({ type, color }) => (
  <Section>
    <ReactLoading type={type} color={color} height={"10%"} width={"10%"} />
  </Section>
);

const Section = styled.section`
  padding-top: 10%;
  div {
    margin: 0 auto;
  }
`;

const Payment = ({ location }) => {
  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState({});

  async function fetchReceipt() {
    const url = `${REQUEST_URL}/api${location.pathname}${location.search}`;
    const options = {
      method: "GET",
      mode: "cors",
      credentials: "include"
    };
    const response = await fetch(url, options);

    if (response.ok) {
      const result = await response.json();
      setReceipt(result);
    }
  }

  useEffect(() => {
    fetchReceipt();
  }, []);

  useEffect(() => {
    if (Object.keys(receipt).length !== 0) setLoading(false);
  }, [receipt]);

  return (
    <div>
      {loading ? (
        <Loading type="spokes" color="#F6538B" />
      ) : (
        <Receipt reservationInfo={receipt.reservationInfo} />
      )}
    </div>
  );
};

export default Payment;
