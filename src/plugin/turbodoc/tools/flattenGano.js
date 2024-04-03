function flattenGano(node, result = {}, currentRoute = []) {
    if (node && typeof node === 'object') {
        const atKey = node['@'];
        if (atKey) {
            const key = currentRoute.join('.');
            result[key] = atKey;
        }

        for (const [key, value] of Object.entries(node)) {
            if (key !== '@') {
                flattenGano(value, result, [...currentRoute, key]);
            }
        }
    }

    return result;
}

module.exports = flattenGano;