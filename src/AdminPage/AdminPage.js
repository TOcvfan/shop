import React from 'react';
import {Link} from 'react-router-dom';
//import { userService } from '../services/user.service';

export class AdminPage extends React.Component {
   
    render() {
        
        return (
            <div>
                <h1>Admin</h1>
                <p>This page can only be accessed by administrators.</p>
                <div>
                    All users from secure (admin only) api end point:
                    <Link to="/admin/create" className="item" id="headerLink">
                                        Create
                                    </Link>
                </div>
            </div>
        );
    }
}
export default AdminPage;