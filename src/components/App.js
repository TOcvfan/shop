import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import '../styles.css';
import { Role } from '../helpers/role';
import { history } from '../history';
import { authenticationService } from '../services/authentication.service';
import { PrivateRoute } from '../components/PrivateRoute';
//import { HomePage } from '../HomePage/HomePage';
import { AdminPage } from '../AdminPage/AdminPage';
import { LoginPage } from '../LoginPage/LoginPage';
import { StartPage } from '../StartPage/StartPage';
import AutoShop from '../AutoShop/AutoShop';
import DetailsCar from '../AutoShop/Cars/DetailsCar';
import DetailsPart from '../AutoShop/Parts/DetailsParts';
import About from '../AboutPage/About';
import CreateAdmin from '../AdminPage/CreateAdmin/CreateAdmin';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            currentUser: null,
            isAdmin: false
        };
    }

    renderlogin(){
        
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            isLoggedIn: true,
            currentUser: x,
            isAdmin: x && x.role === Role.Admin
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/');
    }

    loadUser = (data) => {
        this.setState({user: {
          id: data.id,
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          address1: data.address1,
          address2: data.address2,
          zip: data.zip,
          city: data.city,
          phone: data.phone,
          role: data.role
        }})
      }
    
    render() {
        const { currentUser, isAdmin } = this.state;
        
        return (
            <Router history={history}>
                <div className="ui container">
                <div>           
                  <div className="ui secondary pointing menu">
                            <Link to="/" className="item" id="headerLink">
                                Autoshoppen
                            </Link>
                            <div className="right pointing menu">
                                <Link to="/autoshop" className="item" id="headerLink">
                                    Shop
                                </Link>
                                <Link to="/about" className="item" id="headerLink">
                                    something else
                                </Link>
                                <Link to="/login" className="item" id="headerlink">Login</Link>
                                {currentUser && <div className="ui secondary pointing">
                                    <div className="ui secondary pointing menu">
                                        <Link to="/" onClick={this.logout} className="item" id="headerlink">Logout</Link>
                                {isAdmin && 
                                    <Link to="/admin" className="item" id="headerLink">
                                        Admin
                                    </Link>
                                    
                                }
                                </div> 
                                </div>
                            }
                            </div>
                        </div>
                        </div>
                    <div className="ui container">
                        <div className="ui container">
                            <div className="row">
                                <div>
                                    <PrivateRoute exact path="/" component={StartPage} />
                                    <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
                                    <PrivateRoute loadUser={this.loadUser} path="/admin/create" roles={[Role.Admin]} component={CreateAdmin} />
                                    <Route path="/startpage" component={StartPage} />
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/autoshop" component={AutoShop} />
                                    <Route path="/about" exact component={About} />
                                    <Route path="/detailsCar/:id" render={(matchProps) => <DetailsCar {...matchProps} {...this.props} />} />
                                    <Route path="/detailsPart/:id" render={(matchPropsPart) => <DetailsPart {...matchPropsPart} {...this.props} />} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
