import styles from "./styles/Token.module.css";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

//const tokenExample = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

function objectToJson(tokens) {
  var decoded = jwt_decode(tokens);
  var stringToken = JSON.stringify(decoded, null, "\t");
  return stringToken;
}

/*
const postToken = (token) => {
  axios({
  method: 'get',
  url: "htpp://localhost:9090/hello",
  headers: {
    'Authorization': 'Bearer '+ token,
    "Access-Control-Allow-Origin": "*"
  }, 
  data: {
    foo: 'bar', 
  }
});
  console.log("postToken",token);
}
*/

const TokenPage = () => {
  const location = useLocation();
  const { from } = location.state;

  const [accessToken, setAccessToken] = useState(from.access_token);
  const [apiMessage, setApiMessage] = useState("...");

  const makeAjaxRequest = (token, setApiMessage) => {
    axios
      .get("http://localhost:9090/hello", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        //setAccessToken(response.data);
        console.log(
          "Response status: ",
          response.status,
          "Response value: ",
          response.data
        );
        setApiMessage(response.data);
      })
      .catch(function (error) {
        console.log("refreshing");
        setApiMessage("401 Unauthorized!");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.card}>
          <Link to="/">
            <p>Home Page</p>
          </Link>
        </div>
        <div
          onClick={() => setAccessToken(from.access_token)}
          className={styles.card}
        >
          <p>Access Token</p>
        </div>
        <div
          onClick={() => setAccessToken(from.id_token)}
          className={styles.card}
        >
          <p>ID Token</p>
        </div>
        <div
          onClick={() => setAccessToken(from.refresh_token)}
          className={styles.card}
        >
          <p>Refresh Token</p>
        </div>
        <div
          onClick={() => makeAjaxRequest(from.access_token, setApiMessage)}
          className={styles.card}
        >
          <p>Call API</p>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.avatarContainer}>
          <img
            src={jwt_decode(from.access_token).avatar}
            alt="token_avatar_claim"
            style={{ width: 150 }}
          />
        </div>

        <div className={styles.cardInfo}>
          <pre>{objectToJson(accessToken)}</pre>
        </div>
        <div className={styles.apiCallContainer}>
          <p>{apiMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default TokenPage;
