import React,{ Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';


class Login extends Component{
  render(){
    return(
      <FlatButton {...this.props} label="Dang nhap"/>
    )
  }
}


const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <Avatar src="images/uxceo-128.jpg" />
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Quan Ly thong tin" />
    <MenuItem primaryText="Dang xuat" />
  </IconMenu>
);

class NavBar extends Component{
  constructor(props){
    super(props);
    this.state={
      drawerOpened: false,
      isLoged: false
    }
  }
  _toggleOpenDrawer=()=>{
    this.setState({
      drawerOpened: !this.state.drawerOpened
    })
  }
  render(){
    return(
      <div>
        <AppBar title='Hai Au Company'
          onLeftIconButtonTouchTap={()=>this._toggleOpenDrawer()}
          zDepth={1}
          iconElementRight={this.state.isLoged ? <Logged/>: <Login /> }/>
        <Drawer open={this.state.drawerOpened} docked={false} onRequestChange={()=>this._toggleOpenDrawer()}/>
      </div>
    )
  }
}

export default NavBar;
