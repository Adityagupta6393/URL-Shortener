import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    getClickTrends,
    getUrlAnalytics,
} from "../../api/analytics.api";

import AnalyticsHeader from "../../components/analytics/AnalyticsHeader";
import AnalyticsCards from "../../components/analytics/AnalyticsCards";
import ClickTrendChart from "../../components/analytics/ClickTrendChart";
import RecentVisitors from "../../components/analytics/RecentVisitors";
import DistributionChart from "../../components/analytics/DistributionChart";

function Analytics() {

    const { id } = useParams();

    const [analytics, setAnalytics] = useState(null);
    const [trendData, setTrendData] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchAnalytics = async () => {

        try {

            const [
                analyticsRes,
                trendRes,
            ] = await Promise.all([
                getUrlAnalytics(id),
                getClickTrends(id),
            ]);

            setAnalytics(analyticsRes.data);
            setTrendData(trendRes.data || []);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchAnalytics();

    }, [id]);

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
                url={analytics.url}
            />

            <AnalyticsCards

                totalClicks={analytics.totalClicks}

                countries={analytics.countryStats.length}

                browsers={analytics.browserStats.length}

                devices={analytics.deviceStats.length}

            />

            <ClickTrendChart data={trendData} />

            {/* <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                <CountryChart
                    data={analytics.countryStats}
                />

                <BrowserChart
                    data={analytics.browserStats}
                />

                <DeviceChart
                    data={analytics.deviceStats}
                />

            </div> */}

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

                <DistributionChart
                    title="Country Distribution"
                    data={analytics.countryStats}
                    nameKey="country"
                />

                <DistributionChart
                    title="Browser Distribution"
                    data={analytics.browserStats}
                    nameKey="browser"
                />

                <DistributionChart
                    title="Device Distribution"
                    data={analytics.deviceStats}
                    nameKey="device"
                />

            </div>

            <RecentVisitors
                visitors={analytics.recentClicks}
            />

        </div>

    );

}

export default Analytics;