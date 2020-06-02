import { Component } from "inferno";
import { inject, observer } from "inferno-mobx";

@inject("highalert", 'state')
@observer
export default class Counter extends Component {
  render({ highalert, state }) {
    return <div>
        {`Current Count: ${highalert.currentCount}`}
        {state.seoTitle}
    </div>;
  }
}
