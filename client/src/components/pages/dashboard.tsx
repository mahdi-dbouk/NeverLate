import Navbar from '../ui/Navbar';
import FloatingActions from '../ui/floatingActions';
import TodoList from './todosList';

const Dashboard: React.FC = () => {
    return(
        <>
            <Navbar email='mahdi.dbouk97@gmail.com' />
            <TodoList />
            <FloatingActions />
        </>
    )
}

export default Dashboard;