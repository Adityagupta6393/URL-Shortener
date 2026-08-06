import { useEffect, useMemo, useState } from "react";

import {
    getOverallClickTrends,
    getOverallCountryStats,
    getOverallBrowserStats,
    getOverallDeviceStats,
    getTopUrls,
    getRecentActivity,
} from "../../api/analytics.api";

import AnalyticsHeader from "../../components/analytics/AnalyticsHeader";
import AnalyticsCards from "../../components/analytics/AnalyticsCards";
import ClickTrendChart from "../../components/analytics/ClickTrendChart";
// import CountryChart from "../../components/analytics/CountryChart";
// import BrowserChart from "../../components/analytics/BrowserChart";
// import DeviceChart from "../../components/analytics/DeviceChart";
import TopUrlsTable from "../../components/analytics/TopUrlsTable";
import RecentActivityTable from "../../components/analytics/RecentActivityTable";
import DistributionChart from "../../components/analytics/DistributionChart";

function DashboardAnalytics() {

    const [trendData, setTrendData] = useState([]);
    const [countries, setCountries] = useState([]);
    const [browsers, setBrowsers] = useState([]);
    const [devices, setDevices] = useState([]);
    const [topUrls, setTopUrls] = useState([]);
    const [activities, setActivities] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchAnalytics = async () => {

        try {

            const [

                trendRes,
                countryRes,
                browserRes,
                deviceRes,
                topUrlRes,
                activityRes,

            ] = await Promise.all([

                getOverallClickTrends(),
                getOverallCountryStats(),
                getOverallBrowserStats(),
                getOverallDeviceStats(),
                getTopUrls(),
                getRecentActivity(),

            ]);

            setTrendData(trendRes.data || []);
            setCountries(countryRes.data || []);
            setBrowsers(browserRes.data || []);
            setDevices(deviceRes.data || []);
            setTopUrls(topUrlRes.data || []);
            setActivities(activityRes.data || []);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchAnalytics();

    }, []);

    const totalClicks = useMemo(() => {

        return trendData.reduce(

            (sum, item) => sum + item.clicks,

            0

        );

    }, [trendData]);

    if (loading) {

        return (
            <div className="flex justify-center items-center h-96">
                Loading Analytics...
            </div>
        );

    }

    return (

        <div className="space-y-8">

            <AnalyticsHeader
                title="Overall Analytics"
                subtitle="Track the performance of all your shortened URLs."
            />

            <AnalyticsCards
                totalClicks={totalClicks}
                countries={countries.length}
                browsers={browsers.length}
                devices={devices.length}
            />

            <ClickTrendChart
                data={trendData}
            />

            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <CountryChart
                    data={countries}
                />

                <BrowserChart
                    data={browsers}
                />

                <DeviceChart
                    data={devices}
                />

            </div> */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

                <DistributionChart
                    title="Country Distribution"
                    data={countries}
                    nameKey="country"
                />

                <DistributionChart
                    title="Browser Distribution"
                    data={browsers}
                    nameKey="browser"
                />

                <DistributionChart
                    title="Device Distribution"
                    data={devices}
                    nameKey="device"
                />

            </div>

            <TopUrlsTable
                urls={topUrls}
            />

            <RecentActivityTable
                activities={activities}
            />

        </div>

    );

}

export default DashboardAnalytics;