import React,{ Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

class NavBar extends Component{
  constructor(props){
    super(props);
    this.state={
      drawerOpened: false
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
        <AppBar title='Hai Au Company'onLeftIconButtonTouchTap={()=>this._toggleOpenDrawer()} zDepth={1}/>
        <Drawer open={this.state.drawerOpened} docked={false} onRequestChange={()=>this._toggleOpenDrawer()}/>
      </div>
    )
  }
}

export default NavBar;
