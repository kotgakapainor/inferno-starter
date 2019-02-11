import { Component } from 'inferno'
import { Link } from 'inferno-router'

export default class NotFound extends Component {

    render() {
        return <section className="main">
                <h1>Not Found.. sorry</h1>
                <Link to="/">Back to Home</Link>
            </section>
    }
}
