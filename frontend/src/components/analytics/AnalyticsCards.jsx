import { HiOutlineCursorClick,} from "react-icons/hi";

import { FiGlobe, FiMonitor, FiSmartphone, } from "react-icons/fi";

import StatCard from "./StatCard";

function AnalyticsCards({ totalClicks, countries, browsers, devices, }) {

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatCard
                title="Total Clicks"
                value={totalClicks}
                icon={<HiOutlineCursorClick />}
                color="text-blue-600"
            />

            <StatCard
                title="Countries"
                value={countries}
                icon={<FiGlobe />}
                color="text-green-600"
            />

            <StatCard
                title="Browsers"
                value={browsers}
                icon={<FiMonitor />}
                color="text-purple-600"
            />

            <StatCard
                title="Devices"
                value={devices}
                icon={<FiSmartphone />}
                color="text-red-600"
            />

        </div>

    );

}

export default AnalyticsCards;