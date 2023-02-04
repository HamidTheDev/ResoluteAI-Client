import React, { useContext } from 'react';
import { Usercontext } from '../../components/Authprovider/Authprovider';
import { Navigate, useLocation} from "react-router-dom";
import Spinner from '../../Shared/Spinner';

const Privateroute = ({children}) => {

    const { user, loader } = useContext(Usercontext)
    if (loader) {
        return <Spinner></Spinner>
    }

    if (user) {
        return children;
    } else {
        return <Navigate to='/signup'></Navigate>
    }
};

export default Privateroute;