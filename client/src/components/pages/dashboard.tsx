import { useState } from 'react';
import Navbar from '../ui/Navbar';
import FloatingActions from '../ui/floatingActions';
import TodoList from './todosList';

const Dashboard: React.FC = () => {
    const [showCompleted, setShowCompleted] = useState<boolean>(false)
    return(
        <>
            <Navbar email={localStorage.getItem('auth-user-email') ?? "username"} />
            <TodoList showCompleted={showCompleted} />
            <FloatingActions showCompleted={showCompleted} setShowCompleted={setShowCompleted}/>
        </>
    )
}

export default Dashboard;