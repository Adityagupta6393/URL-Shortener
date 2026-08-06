import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
    MdDashboard,
} from "react-icons/md";

import {
    FiLink,
    FiLock,
} from "react-icons/fi";

import { HiOutlineCursorClick } from "react-icons/hi";

import { getDashboardStats, getTopUrls, getRecentActivity } from "../../api/analytics.api";

import StatsCard from "../../components/dashboard/StatsCard";
import RecentActivity from "../../components/dashboard/RecentActivity";
import TopUrls from "../../components/dashboard/TopUrls";
import CreateUrlModal from "../../components/urls/CreateUrlModal";

function Dashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [topUrls, setTopUrls] = useState([]);
    const [activities, setActivities] = useState([]);

    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const fetchStats = async () => {

        try {

            // const response =
            //     await getDashboardStats();

            // setStats(response.data);

            const [
                statsRes,
                topUrlsRes,
                activityRes,
            ] = await Promise.all([
                getDashboardStats(),
                getTopUrls(),
                getRecentActivity(),
            ]);

            setStats(statsRes.data);
            setTopUrls(topUrlsRes.data || []);
            setActivities(activityRes.data || []);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchStats();

    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-lg text-gray-500">
                    Loading Dashboard...
                </p>
            </div>
        );
    }

    return (

        <div className="space-y-8">

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-3xl font-bold">
                        Dashboard
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Welcome back, {user?.name} 👋
                    </p>

                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
                >
                    + Create URL
                </button>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <StatsCard
                    title="Total URLs"
                    value={stats?.totalUrls ?? 0}
                    icon={<FiLink />}
                    color="text-blue-600"
                />

                <StatsCard
                    title="Total Clicks"
                    value={stats?.totalClicks ?? 0}
                    icon={<HiOutlineCursorClick />}
                    color="text-green-600"
                />

                <StatsCard
                    title="Active URLs"
                    value={stats?.activeUrls ?? 0}
                    icon={<MdDashboard />}
                    color="text-purple-600"
                />

                <StatsCard
                    title="Protected URLs"
                    value={stats?.passwordProtectedUrls ?? 0}
                    icon={<FiLock />}
                    color="text-red-600"
                />

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                <RecentActivity
                    activities={activities}
                />

                <TopUrls
                    urls={topUrls}
                />

            </div>
            <CreateUrlModal
                open={open}
                onClose={() => setOpen(false)}
                onSuccess={fetchStats}
            />
        </div>


    );
}



export default Dashboard;