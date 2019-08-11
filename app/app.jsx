import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
  }

  render() {
    return (
      <form>
        <p>GET /reviews/:product_id/list</p>
        <p>GET /reviews/:product_id/meta</p>
        <p>POST /reviews/:product_id</p>
        <p>PUT /reviews/helpful/:review_id</p>
        <p>PUT /reviews/report/:review_id</p>
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
