import React, { Component } from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "../components/Fish";
import base from "../base";

class App extends Component {
  state = {};

  constructor() {
    super();
    // This is important for the method to work
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // Initiate State
    this.state = {
      fishes: {},
      order: {}
    };
  }
  // Life Cycle hooks
  componentWillMount() {
    // This runs right before  the <app> is rendered

    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(
      `order-${this.props.params.storeId}`
    );

    if (localStorageRef) {
      // update our app component
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log("Something chage");
    // console.log({ nextProps, nextState });
    // [BP] Below: we use stringtify becaues we cannot store object
    localStorage.setItem(
      `order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order)
    );
  }

  addFish(fish) {
    // update state
    // ... = spread
    const fishes = { ...this.state.fishes };
    // add in our new fish
    const timestamp = this.state.fishes;
    fishes[`fish-${timestamp}`] = fish;
    // Set state
    // This is same as below : this.setState({ fishes: fishes });
    this.setState({ fishes });
  }

  updateFish(key, updatedFish) {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    // Take a copy of our state. ... == object spread
    const order = { ...this.state.order };

    // Update or add new number of fish order
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({ order });
  }
  removeFromOrder(key) {
    // Take a copy of our state. ... == object spread
    const order = { ...this.state.order };

    // Delete the order with key, we only use null because of firebase
    delete order[key];
    // update our state
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagLine={500} />
          <ul className="list-of-fishes">
            {/* Map is for array and object cannot be map but only keys */}
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          fishes={this.state.fishes}
          loadSamples={this.loadSamples}
        />
      </div>
    );
  }
}

export default App;
