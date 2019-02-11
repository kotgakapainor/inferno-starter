import { Component } from 'inferno'
import { Link } from 'inferno-router'

export default class Header extends Component{

    render(props){
        return <header className='header'>
            <Logo/>
            <Menu/>
        </header>
    }

}


const Logo = props =>{
    return <Link to='/'><div className='header--logo'>Inferno Starter </div></Link>
}


const Menu = props =>{
    return <menu className='header--menu'>
        <ul className='menu--items'>
            <li> <Link to='/about' > About </Link> </li>
            <li> <Link to='/about' > About </Link> </li>
            <li> <Link to='/about' > About </Link> </li>
        </ul>
    </menu>
}