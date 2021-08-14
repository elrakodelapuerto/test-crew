export const getTime = searcher_time => {
    const date = new Date(searcher_time);
    const now = new Date()
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const day = now.toLocaleDateString() === date.toLocaleDateString() ? 'Сегодня' : tomorrow.toLocaleDateString() === date.toLocaleDateString() ? 'Завтра' : date.toLocaleDateString()
    const time = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    return `${time} (${day})`;
};