export function useFormat() {
    function formatDate(value) {
        if (typeof value === 'undefined' || value == null) {
            return null;
        }

        if (typeof value === 'string') {
            value = new Date(value);
        }

        return value.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    function formatDateTime(value) {
        if (typeof value === 'undefined' || value == null) {
            return null;
        }

        if (typeof value === 'string') {
            value = new Date(value);
        }

        return value.toLocaleTimeString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    function formatCurrency(value) {
        if (typeof value === 'undefined' || value == null) {
            return null;
        }

        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    return { formatDate, formatDateTime, formatCurrency };
}
