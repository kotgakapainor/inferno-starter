import { Component } from 'inferno'
import { inject, observer } from 'inferno-mobx'
import { Link } from 'inferno-router'
import Loading from '../components/common/Loading'
import HighAlert from '../components/HighAlert/HighAlert'
import withHydration from '../helpers/withHydration'

@inject('state', 'store' ) @observer 
export default class Home extends Component {

    static async onEnter({store, state}) {
          store.common.setTitle('Quick Start')
          store.common.setDescription('Quickstart')
    }

    render(props) {
        return <section className="page-home">
            <h1> Inferno Starter Quick Start</h1>
            <ol>
                <li><a href='https://github.com/kotgakapainor/inferno-starter'>Visit Repository</a></li>
                <li><a href='https://github.com/kotgakapainor/inferno-starter/blob/master/README.md'>Repo documentation</a></li>
                <li><a href='https://infernojs.org/docs/guides/installation'>Inferno documentation</a></li>
                <li><a href='https://mobx.js.org/'>MobX documentation</a></li>
            </ol>
            <HydratedHighAlert/>
            <div>more content</div>
            <div>more content</div>
        </section>
    }
}


const HydratedHighAlert = withHydration(HighAlert)