import Logo from './Logo';
import './Header.scss';


export default function Header(){
    return(
        <header className='flex flex-row'>
            <Logo />
        </header>
    )
}