import React from 'react'
import {BrowserRouter, Route, Routes }  from "react-router-dom"
import Login from './pages/auth/Login'
import SignUp from  './pages/auth/SignUp'
import DashBoard from './pages/admin/Dashboard'
import CreateTask from './pages/admin/CreateTask'
import ManageTask from './pages/admin/ManageTask'
import ManageUsers from './pages/admin/ManageUsers'
import PrivateRoute from './routes/PrivateRoute'
import UserDashboard from './pages/user/UserDashboard'
import TaskDetails from './pages/user/TaskDetails'
import MyTask from './pages/user/MyTasks'


const App = () => {
  return (
     <div>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
  
      {/* Admin Routes */}

      <Route element={<PrivateRoute allowRoles={["admin"]}/>}>
       <Route path='/admin/dashboard' element={<DashBoard/>} />
       <Route path='/admin/task' element={<ManageTask/>} />
       <Route path='/admin/users' element={<ManageUsers/>}/>
       <Route path='/admin/CreateTask' element={<CreateTask/>}/>
      </Route>

      {/* User ROute */}
     <Route element={<PrivateRoute allowRoles={["user"]}/>}>
       <Route path='/user/dashboard' element={<UserDashboard/>}/>
       <Route path='/user/tasks' element={<MyTask/>}/>
       <Route path='/user/taskdetails/:id' element={<TaskDetails/>}/>
      </Route>

      </Routes>
      </BrowserRouter>
     </div>
  )
}

export default App