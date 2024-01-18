
const urlParams = new URLSearchParams(window.location.search);
const getCode = urlParams.get("code");
// console.log(getCode);
const tokenEndpoint =
    "https://test-college-source-poc.auth.us-east-2.amazoncognito.com/oauth2/token";
const redirectUri =
    "https://anushka-kokate-saras.github.io/test-college-source-poc/logged_in.html"; // Your Redirect URI

const formData = new URLSearchParams();
formData.append("grant_type", "authorization_code");
formData.append("code", getCode);
formData.append("redirect_uri", redirectUri);

// Add the client credentials to the headers
const headers = {
    Authorization:
        "Basic NW0yMXBodXMxNzhjbHI4cnBnN25xdG05cm06MTB1ZmI0ZDZhNmp2NGc4ZW1qbDg0Zmx1N2JwNGhrNXJodjRpMWN1bDk1bG81bGtqM3F1ZQ==",
    "Content-Type": "application/x-www-form-urlencoded",
};
let idToken;
fetch(tokenEndpoint, {
    method: "POST",
    headers: headers,
    body: formData,
})
    .then((response) => {
        response.json()
    })
    .then((data) => {
        idToken = data.id_token;

        document
            .getElementById("documentButton")
            .addEventListener("click", function () {
                console.log(idToken);
                const apiURL = `https://u066vc0441.execute-api.us-east-2.amazonaws.com/test/getIdToken?idToken=${idToken}`;
                console.log(apiURL);
                fetch(apiURL, {
                    method: "GET"
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data)
                        const redirectUrl = data.url;
                        console.log(redirectUrl);
                        // Open the URL in a new tab
                        window.open(redirectUrl, "_blank");
                    });
            });
    })
    .catch((error) => {
        console.error(error);
    });
