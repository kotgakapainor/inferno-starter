import { Component } from 'inferno'
import { inject, observer } from 'inferno-mobx'
import { Link } from 'inferno-router'
import Loading from '../components/common/Loading'

@inject('state', 'store' ) @observer 
export default class Home extends Component {

    static async onEnter({store, state}) {
          store.common.setTitle('Quick Start')
          store.common.setDescription('Quickstart')
    }

    render({state, store}) {
        return <section className="page-home">
            <h1> Inferno Starter Quick Start</h1>
            <ol>
                <li><a href=''>Visit Repository</a></li>
                <li><a href=''>Repo documentation</a></li>
                <li><a href='https://infernojs.org/docs/guides/installation'>Inferno documentation</a></li>
                <li><a href='https://mobx.js.org/'>MobX documentation</a></li>
            </ol>
        </section>
    }
}