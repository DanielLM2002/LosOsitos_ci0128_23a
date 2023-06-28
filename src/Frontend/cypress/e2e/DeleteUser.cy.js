/// <reference types='cypress' />

import Home from '../pages/Home';
import Login from '../pages/Login';
import Userlist from '../pages/Userlist';
import SideBarMenu from '../pages/SideBarMenu';

const home = new Home();
const login = new Login();
const userlist = new Userlist();
const sideBarMenu = new SideBarMenu();

describe('<UserList />', () => {
  it('Operator user elimination process', () => {
    home.visit();
    login.visit();
    login.insertUsername('estebancb');
    login.insertPassword('estebancb');
    login.submit();
    userlist.visit();
    userlist.createUser();
    userlist.insertID('123456789');
    userlist.insertName('Test');
    userlist.insertLastName1('Test');
    userlist.insertLastName2('Test');
    userlist.insertEmail('test@gmail.com');
    userlist.selectGender('Female');
    userlist.selectCountry('Costa Rica');
    userlist.selectState('Guanacaste');
    userlist.selectRole('Operator');
    userlist.insertUsername('test');
    userlist.insertPassword('test1234')
    userlist.saveUser();
    userlist.verifyUserExist('test');
    userlist.deleteUser('test');
    userlist.verifyUserNotExist('test');
  });
});