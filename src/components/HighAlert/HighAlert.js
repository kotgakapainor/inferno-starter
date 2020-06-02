import { Component } from 'inferno'
import { inject, observer, Provider } from 'inferno-mobx'
import HighAlertStore from './HighAlertStore'
import Counter from './Counter'
import Button from './Button'

export default class HighAlert extends Component {

    constructor(props) {
        super(props)
        this.store = new HighAlertStore(props)
    }

    render(props) {

        return (
                <Provider highalert={this.store}>
                    <div className="highaltert">
                        <Counter/>
                        <Button/>
                    </div>
                </Provider>
            )
        
    }
}


