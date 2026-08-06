import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {

    const { user, restoreSession } = useAuth();

    const [checking, setChecking] = useState(true);

    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {

        const check = async () => {

            if (user) {

                setAuthorized(true);
                setChecking(false);
                return;

            }

            const success = await restoreSession();

            setAuthorized(success);
            setChecking(false);

        };

        check();

    }, [user]);

    if (checking) {

        return (
            <div className="min-h-screen flex justify-center items-center">
                Loading...
            </div>
        );

    }

    if (!authorized) {

        return <Navigate to="/login" replace />;

    }

    return children;

}

export default ProtectedRoute;