import { useAuth } from "../context/AuthContext";
import Navbar from './Navbar/Nabvar';
import { TaskList } from '../components/TaskList'; 

export function Home() {  
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container mx-auto relative z-0">
      <div className="container">
        <Navbar />
        <main className="pt-16">
                <TaskList />
        </main>
      </div>
      <div className="Logout">
        {user ? (
          <>
          </>
        ) : (
          <p className="text-xl mb-4"></p>
        )}
      </div>  
    </div>
  );
}
