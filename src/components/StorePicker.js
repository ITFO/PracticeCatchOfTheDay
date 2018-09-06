import React, { Component } from "react";
import { getFunName } from "../helpers";

class StorePicker extends Component {
  // BILLY THIS IS NOT NEEDED BECAUSE IT WAS ENTERE INLINE
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }

  goToStore(event) {
    event.preventDefault();
    // First Grab the Text
    console.log("You change the URL");
    const storeId = this.storeInput.value;
    console.log("storeId", storeId);
    // transition to next page
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  state = {};
  render() {
    return (
      // <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
      // UP: this is sam e as below
      <form className="store-selector" onSubmit={e => this.goToStore(e)}>
        <h2>Please Enter a Store</h2>
        <input
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={input => {
            this.storeInput = input;
          }}
        />
        <button type="submit"> Visit Store </button>
      </form>
    );
  }
}

// Adding Content but not recomended
StorePicker.contextTypes = {
  router: React.PropTypes.object
};

export default StorePicker;
