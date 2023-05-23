import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"
import "primereact/resources/themes/lara-light-indigo/theme.css";

import "primereact/resources/primereact.min.css";

import AuthRoute from './autentication/AuthRoute';
import AdminRoute from './autentication/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

    return (

        <div className="App">
            <Router>
                <Routes>
                    <Route path="/*" element={<AuthRoute/>}/>
                    <Route path="admin/*" element={
                        <ProtectedRoute>
                            <AdminRoute />
                        </ProtectedRoute>
                    }/>

                </Routes>
            </Router>
        </div>

    );
}

export default App;
