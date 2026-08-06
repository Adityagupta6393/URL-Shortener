import { FaRegUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const { user } = useAuth();

    return (
        <header className="h-16 bg-white shadow-sm border-b flex items-center justify-between px-6">

            <h1 className="text-2xl font-bold text-blue-600">
                URL Shortener
            </h1>

            <div className="flex items-center gap-3">

                <div className="text-right">

                    <p className="font-semibold">
                        {user?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                        {user?.email}
                    </p>

                </div>

                <FaRegUserCircle
                    size={38}
                    className="text-blue-600"
                />

            </div>

        </header>
    );
}

export default Navbar;