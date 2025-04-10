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

export default function Navbar()
{
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
                <Route path="/updateProject/:projectId" element={<NewProjectForm/>}/>
                <Route path="/projects" element={<ProjectShow/>}/>
                <Route path="/info" element={<Main/>}/>
                <Route path="*" element={<Http404/>}/>
                <Route path="/projects/:projectId" element={<ProjectPage/>}/>
                <Route path="/projects/:projectId/tasks/:taskId" element={<TaskCard/>}/>
            </Routes>
        </>
    )
}