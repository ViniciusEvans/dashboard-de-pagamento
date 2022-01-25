import './Header.scss';
import Logo from '../assets/logoDindin.svg';

export default function Header(){
    return (
        <header className="container-header">
            <img src={Logo} alt="" />
            <h1>Dindin</h1>
        </header>
    );
} 