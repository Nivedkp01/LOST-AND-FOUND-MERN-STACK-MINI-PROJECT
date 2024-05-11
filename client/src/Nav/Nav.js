import React, { useContext, useEffect, useState, useRef } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/Context';
import { CiUser } from "react-icons/ci";
import { MdManageSearch } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

function Nav() {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [show, setShow] = useState(true);
    const [user, setUser] = useState(false);
    const [data, setData] = useState([]);
    const showItemRef = useRef(null);

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const response = await fetch('http://localhost:4000/profile', {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch User Profile');
                }

                const userData = await response.json();
                setUserInfo(userData);
                setData(userData);
            } catch (err) {
                console.error(err);
            }
        }

        fetchUserProfile();
    }, [userInfo?.username]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (showItemRef.current && !showItemRef.current.contains(event.target)) {
                setShow(true);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    async function handleLogout() {
        try {
            const response = await fetch('http://localhost:4000/logout', {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                setUserInfo(null);
                alert('Logged out');
            } else {
                throw new Error('Failed to logout');
            }
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Failed to logout');
        }
    }

    function handleNav() {
        setShow(prev => !prev);
    }

    function handleUser() {
        setUser(prev => !prev);
    }

    return (
        <div className='nav'>
            <div className='Name'>
                <div className='hea'>
                    <MdManageSearch size={30} style={{ color: 'white' }} />
                    <Link to='/'><h3 className='name'>foundfolio</h3></Link>
                </div>
            </div>
            <div className='details1'>
                {userInfo ? (
                    <>
                        <div className={show ? "disable" : "showitem"} ref={showItemRef}>
                            <div className='hea12'>
                                <Link to='/report'><h3 className='log1'>Report</h3></Link>
                                <p onClick={handleNav} style={{ color: 'white', marginTop: '2px', fontSize: '16px', cursor: 'pointer' }}>X</p>
                            </div>
                            {/* <Link to='/verify'><h3 className='log1'>Verify</h3></Link> */}
                            <Link to='/notification'>{userInfo?.username==="Admin"?"":<h3 className='log1'>Notification</h3>}</Link>
                            <Link to='/feedback'><h3 className='log1'>Feedback</h3></Link>
                            <Link to='/lost'>{userInfo?.username==="Admin"?<h3 className='log1'>Manage Lost</h3>:<h3 className='log1'>Lost</h3>}</Link>
                            <Link to='/found'>{userInfo?.username==="Admin"?<h3 className='log1'>Manage Found</h3>:<h3 className='log1'>Found</h3>}</Link>
                            <Link to='/adminpage'><h3 className={data.username === "Admin" ? "log1" : "d "}>Manage Users</h3></Link>
                        </div>
                        <div className={user ? "showitem1" : "disable"}>
                            <p>{data.username}</p>
                            <p>{data.Imei}</p>
                            <p>{data.Email}</p>
                            <p>{data.ph}</p>
                        </div>
                        <div className='userd'>
                            <CiUser className='he2' size={24} style={{position:'absolute', color: 'white', marginTop: '0px', cursor: 'pointer' }} />
                            <h3 className='he' style={{ color: 'aliceblue', marginTop: '15px', cursor: 'pointer' ,position:'absolute'}}>{userInfo.username}</h3>
                            <IoMdMenu className='menu1' onClick={handleNav} size={28} style={{ color: 'white', cursor: 'pointer' ,position:'absolute'}} />
                            <Link className='he3' style={{ marginRight: '80px' }} to='/logout'><h3 className='log' onClick={handleLogout}>Logout</h3></Link>
                        </div>
                       
                    </>
                ) : (
                    <>
                        <Link to='/login'><h3 className='log'>Login</h3></Link>
                        <Link to='/reg'><h3 className='log'>Register</h3></Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Nav;
