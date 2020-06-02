import { Component } from "inferno";
import { inject, observer } from "inferno-mobx";

@inject("highalert")
@observer
export default class Button extends Component {
  render({ highalert }) {
    return (
      <button onClick={() => highalert.incrementCount()}>
        <div>Click me</div>
      </button>
    );
  }
}
