import Logo from './Logo';
import './Header.scss';
import UnitSelect from './UnitSelect';


export default function Header(){
    return(
        <header className='flex flex-row justify-between'>
            <Logo/>
            <UnitSelect></UnitSelect>
        </header>
    )
}