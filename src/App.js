import "./App.css";
import TaskForm from "./components/TaskForm";
import Card from "./components/shared/card";

function App() {
  return (
    <>
      <Card className="card flex-column">
        <h1>Task Management App</h1>
        <div className="title-summary">Manage your tasks!</div>
        <div className="title-summary">Get stuff done!</div>
        <div className="title-summary">Embrace productivity!</div>
      </Card>

      <TaskForm />
    </>
  );
}

export default App;
