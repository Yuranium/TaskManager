import React from 'react';
import './navbar.css'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Main from "../main/main";

function Navbar() {
    return (
        <BrowserRouter>
            <nav>
                <ul className="navbar">
                    <li>
                        <Link to='/'>
                            <a href="#">Главная</a>
                        </Link></li>
                    <li>
                        <Link to='/account'>
                            <a href="#">Аккаунт</a>
                        </Link></li>
                    <li>
                        <Link to='/createProject'>
                            <a href="#">Создать проект</a>
                        </Link></li>
                    <li>
                        <Link to='/projects'>
                            <a href="#">Просмотр проектов</a>
                        </Link></li>
                    <li>
                        <Link to='/info'>
                            <a href="#">Инфографика</a>
                        </Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/account" element=''/>
                <Route path="/createProject" element=''/>
                <Route path="/projects" element=''/>
                <Route path="/info" element=''/> {}
            </Routes>
        </BrowserRouter>
    )
}

export default Navbar;