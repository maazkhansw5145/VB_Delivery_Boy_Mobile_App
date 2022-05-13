import url from "./url";
export const savingToken = (deliveryboyId, token) => {
    fetch(`${url}/add/notification/token/${deliveryboyId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token.data }),
    });
  };