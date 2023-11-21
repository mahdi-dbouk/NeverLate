import Navbar from '../ui/Navbar';
import FloatingActions from '../ui/floatingActions';
import TodoList from './todosList';

const Dashboard: React.FC = () => {
    return(
        <>
            <Navbar email={localStorage.getItem('auth-user-email') ?? "username"} />
            <TodoList />
            <FloatingActions />
        </>
    )
}

export default Dashboard;