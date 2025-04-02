import React from 'react';
import './navbar.css'
import {Link, Route, Routes} from "react-router-dom";
import Main from "../main/main";
import Account from "../account/account";
import NewProjectForm from "../project-form/new-project-form";

function Navbar() {
    return (
        <>
            <nav className="navigation-menu">
                <ul className="navbar">
                    <li>
                        <span className="link-wrap">
                            <Link to='/'>Главная</Link>
                        </span></li>
                    <li>
                        <span className="link-wrap">
                            <Link to='/account'>Аккаунт</Link>
                        </span></li>
                    <li>
                        <span className="link-wrap">
                            <Link to='/createProject'>Создать проект</Link>
                        </span></li>
                    <li>
                        <span className="link-wrap">
                            <Link to='/projects'>Просмотр проектов</Link>
                        </span></li>
                    <li>
                        <span className="link-wrap">
                            <Link to='/info'>Инфографика</Link>
                        </span></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/createProject" element={<NewProjectForm/>}/>
                <Route path="/projects" element={<Main/>}/>
                <Route path="/info" element={<Main/>}/>
            </Routes>
        </>
    )
}

export default Navbar;