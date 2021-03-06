import React from 'react'
import Modal from './ModalLogIn'
import user from '../../img/user1.svg'
import { NavBar, NavButton, SectionButtons, NavOptions, SectionLogOut, LogOutOptions, ImgUser, ContainerOptions, NameUser } from '../styled/Nav';
import { useHistory } from 'react-router-dom'
import { useActive } from '../hooks/index'
// import { Token } from '../tokenProvider'
import { Token }  from '../functions/index'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookie = new Cookies()

const Nav = () => {
    const history = useHistory();
    const token = Token()
    const [active, toggleActive] = useActive();

    const logOut = async () => {       
        const token = cookie.get('auth')
        
        if(token){
            await axios.get('/api/logout')
            .then(resp => resp)
            .catch(error => console.log(error))

            history.push('/login')
        } 
    }

    return(
        <>
        <NavBar>
            <SectionButtons>
                <NavButton to="/" secondary="true">
                    Mis Encuestas
                </NavButton>
                <NavButton to="/surveys">
                    Responder Encuestas
                </NavButton>
            </SectionButtons>
            <SectionLogOut>
                <ContainerOptions>
                    <ImgUser src={ user } alt=""/>
                    <NameUser>
                        { token.name }
                    </NameUser>
                </ContainerOptions>
                <LogOutOptions>
                    <li>
                        <NavOptions onClick={ () => history.push('/profile') }>
                            Editar Perfil
                        </NavOptions>
                    </li>
                    <li>
                        <NavOptions onClick={ toggleActive }>
                            Cerrar Sesion
                        </NavOptions>
                    </li>
                </LogOutOptions>
            </SectionLogOut>
        </NavBar>
        <Modal 
            state={ active } 
            toggle={ toggleActive }
            title={ "??Estas seguro que deseas cerrar sesi??n?" }
            work={ logOut }
        />
        </>
    )
}

export default Nav