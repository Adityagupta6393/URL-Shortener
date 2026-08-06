function UrlStatusBadge({ active }) {

    return (

        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold
            ${
                active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
            }`}
        >

            {active ? "Active" : "Expired"}

        </span>

    );

}

export default UrlStatusBadge;