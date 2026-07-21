const calculateExpiry = (expireIn) => {

    if (!expireIn) {
        return null;
    }

    const value = Number(
        expireIn.slice(0, -1)
    );

    const unit = expireIn.slice(-1);

    let milliseconds = 0;

    switch (unit) {

        case "m":
            milliseconds =
                value * 60 * 1000;
            break;

        case "h":
            milliseconds =
                value * 60 * 60 * 1000;
            break;

        case "d":
            milliseconds =
                value * 24 * 60 * 60 * 1000;
            break;

        default:
            return null;
    }

    return new Date(
        Date.now() + milliseconds
    );
};

export default calculateExpiry;