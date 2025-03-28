import './account.css'

export default function Account({avatar, user, task})
{
    return (
        <div className="main">
            <div className="avatar">
                <img className="avatar-link" src={avatar.data} alt={avatar.name}/>
            </div>
            <div className="main-info">
                <p>{user.name}</p>
                <p>{user.lastName}</p>
                <p>{user.email}</p>
                <p>{user.activeProjects}</p>
                <p>
                    <a className="toProject" href={`/projects/user/allProjects${user.id}`}>К проектам</a>
                </p>
            </div>

            <div className="tasks">
                <p>{task.allTasks}</p>
                <p>{task.activeTasks}</p>
                <p>{task.completedTasks}</p>
                <p>{task.canceledTasks}</p>
                <p>{task.expiredTasks}</p>
            </div>

            <div className="svg-image">
                <svg width="560" height="350" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 300 Q140 150, 260 200 T400 120 T540 240"
                          stroke="limegreen" strokeWidth="6" fill="none"
                          strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="20" cy="300" r="5" fill="limegreen" />
                    <circle cx="260" cy="200" r="5" fill="limegreen" />
                    <circle cx="400" cy="120" r="5" fill="limegreen" />
                    <circle cx="540" cy="240" r="5" fill="limegreen" />
                </svg>
            </div>
        </div>
    )
}