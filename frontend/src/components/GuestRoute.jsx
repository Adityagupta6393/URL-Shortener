import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function GuestRoute({ children }) {

    const { user, restoreSession } = useAuth();

    const [checking, setChecking] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        let mounted = true;

        const check = async () => {

            if (user) {

                if (mounted) {
                    setAuthenticated(true);
                    setChecking(false);
                }

                return;
            }

            const ok = await restoreSession();

            if (mounted) {
                setAuthenticated(ok);
                setChecking(false);
            }

        };

        check();

        return () => {
            mounted = false;
        };

    }, []);

    if (checking) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );

    }

    if (authenticated) {

        return <Navigate to="/dashboard" replace />;

    }

    return children;
}

export default GuestRoute;