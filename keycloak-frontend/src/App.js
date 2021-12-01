import React from "react";
import styles from "./styles/Home.module.css";
import { AuthProvider, AuthService, useAuth } from "react-oauth2-pkce";
import { Link } from "react-router-dom";
/*
function base64URLEncode(str) {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}
var verifier = base64URLEncode(crypto.randomBytes(32));

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest();
}
var challenge = base64URLEncode(sha256(verifier));
*/

const authService = new AuthService({
  authorizeEndpoint:
    "http://localhost:8080/auth/realms/Demo/protocol/openid-connect/auth",
  tokenEndpoint:
    "http://localhost:8080/auth/realms/Demo/protocol/openid-connect/token",
  clientId: "pkce-frontend",
  //provider: 'http://localhost:8080/auth/realms/Demo/protocol/openid-connect/token',
  redirectUri: "http://localhost:3000",
  scopes: ["openid"],
  logoutEndpoint:
    "http://localhost:8080/auth/realms/Demo/protocol/openid-connect/logout",
});

export default function App() {
  return (
    <AuthProvider authService={authService}>
      <SecuredApp />
    </AuthProvider>
  );
}

function SecuredApp() {
  const { authService } = useAuth();

  const login = async () => authService.authorize();
  const logout = async (endSession) => authService.logout(endSession);

  if (!authService.isAuthenticated()) {
    return (
      <>
        <div className={styles.container}>
          <main className={styles.main}>
            <h1 className={styles.title}>Keycloak Frontend Application</h1>

            <p className={styles.description}>
              You must be logged in to continue the application.
            </p>

            <div className={styles.grid}>
              <span className={styles.card}>
                <h2 onClick={login}>Login Page</h2>
              </span>
            </div>
          </main>

          <footer className={styles.footer}>Keycloak POC</footer>
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Keycloak Frontend Application</h1>

        <p className={styles.description}>
          Go to "Token Page" to access details about JWT.
        </p>

        <div className={styles.grid}>
          <span className={styles.card}>
            <Link to="/token" state={{ from: authService.getAuthTokens() }}>
              <h2>Token Page</h2>
            </Link>
            <p onClick={() => logout(true)}>Logout</p>
          </span>
        </div>
      </main>

      <footer className={styles.footer}>Keycloak POC</footer>
    </div>
  );
}
