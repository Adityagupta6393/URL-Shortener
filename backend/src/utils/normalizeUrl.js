const normalizeUrl = (url) => {

    let normalized = url.trim();

    normalized = normalized.toLowerCase();

    if (normalized.endsWith("/")) {
        normalized = normalized.slice(0, -1);
    }

    return normalized;
};

export default normalizeUrl;