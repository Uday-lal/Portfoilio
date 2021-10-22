class MakeRequests {
  baseUrl: string;
  constructor() {
    this.baseUrl = "https://portfoil.herokuapp.com/api";
  }

  makeRequest(
    endPoint: string,
    method: string,
    body: object,
    onDone: () => void
  ) {
    fetch(this.baseUrl + endPoint, {
      method: method,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(body),
    }).then((responce) => {
      if (responce.ok) {
        onDone();
      }
    });
  }
}

export default MakeRequests;
