import { Component, Fragment } from 'inferno'
import { inject, observer } from 'inferno-mobx'
import renderRoutes from '../../helpers/inferno-router-config/renderRoutes'
import Header from './Header'
import Footer from './Footer'

@inject( 'state', 'store' ) @observer
export default class Layout extends Component {

    static async onEnter({state, store}) {
        /* 
            will always be called on the server side regardless of the route
        */
    }

    render({ route, state }) {

        return <Fragment>
                <div className={`content`}>
                    <Header/>
                    <main className="">
                        {renderRoutes(route.routes)}
                    </main>
                    <Footer/>
                </div>
                <Background/>
        </Fragment>
    }
}


const Background = props =>{
    return <div className='layout-bg'>
    <svg class="inferno-logo" version="1" viewBox="0 0 320 320"><g fill="#494949"><path fill="#e41f1c" d="M144.943 258.523c-43.43-6.11-78.35-46.325-79.25-90.013-.713-25.258 8.342-51.659 26.976-69.117-1.96 9.972-8.404 22.363-6.547 34.116.031 14.373 13.724 28.46 28.515 24.558 13.252-3.2 18.255-18.797 14.698-30.828-3.6-16.262-12.088-31.825-9.642-48.997 2.364-32.356 26.896-58.022 53.89-73.267 5.454-4.001 3.594-.734 1.058 3.207-9.194 14.874-10.49 34.01-2.562 49.708 11.502 27.012 33.991 50.392 35.281 81 .277 6.285-1.878 22.408 7.35 11.987 14.554-13.604 13.453-36.236 6.86-53.473-1.79-9.728 9.909 6.576 12.796 9.419 25.343 31.706 26.693 79.921 2.687 112.763-20.087 29.172-57.198 44.887-92.11 38.937z"></path><path d="M139.302 315.444C82.363 307.677 34.8 268.05 16.436 213.082c-5.721-17.126-7.355-27.624-7.412-47.613-.035-12.501.445-19.646 1.814-27 11.04-59.31 54.57-106.002 112.447-120.62 6.272-1.584 12.032-2.88 12.798-2.88 2.474 0 1.499 2.104-3.522 7.597-10.712 11.721-19.344 27.745-22.767 42.264l-1.736 7.36-7.04 4.781c-23.67 16.07-39.696 40.313-45.014 68.088-1.883 9.833-2.136 29.042-.502 38.052 7.95 43.841 41.671 78.084 84.985 86.3 16.782 3.184 38.601 1.528 54.339-4.125 31.785-11.416 56.011-36.344 65.95-67.86 3.713-11.772 4.813-19.173 4.797-32.27-.03-24.547-6.955-45.19-21.758-64.858-12.865-17.093-28.574-27.906-54.488-37.506-3.276-1.214-7.308-9.703-9.42-19.836-1.624-7.785-.947-15.172 2.084-22.737 1.497-3.738 2.08-4.25 4.844-4.247 4.859.004 20.822 4.585 31.498 9.04 45.638 19.04 79.312 59.862 89.883 108.957 3.255 15.12 3.712 43.132.947 58-14.917 80.202-89.522 134.433-169.861 123.475z"></path></g></svg>
    </div>
}