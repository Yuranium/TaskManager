import React from 'react';
import './navbar.css'
import {Link, Route, Routes} from "react-router-dom";
import Main from "../main/main";
import Account from "../account/account";
import NewProjectForm from "../project-form/new-project-form";
import Http404 from "../info/http-error/404";
import ProjectPage from "../project-page/project-page";
import ProjectShow from "../project-show/project-show";
import TaskCard from "../task-card/task-card";
import Infograf from "../charts/infograf";

export default function Navbar()
{
    return (
        <>
            <nav className="navigation-menu">
                <div className="svg-main-avatar">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 13H10V19H4V13Z" fill="currentColor" />
                        <path d="M4 5H10V11H4V5Z" fill="currentColor" />
                        <path d="M12 5H18V11H12V5Z" fill="currentColor" />
                        <path d="M14 13H20V19H14V13Z" fill="currentColor" />
                    </svg>
                    <h2 className="h2-main-page">Task Manager</h2>
                </div>
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
                <Route path="/updateProject/:projectId" element={<NewProjectForm/>}/>
                <Route path="/projects" element={<ProjectShow/>}/>
                <Route path="/info" element={<Infograf/>}/>
                <Route path="/projects/:projectId" element={<ProjectPage/>}/>
                <Route path="/projects/:projectId/tasks/:taskId" element={<TaskCard/>}/>
                <Route path="*" element={<Http404/>}/>
            </Routes>
        </>
    )
}