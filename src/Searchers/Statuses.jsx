import styles from "./Searchers.module.css";
import {Searcher} from "./Searcher";

export function Statuses({crews, setSelected, selectedSearchers, toggleModal}) {
    function getTime(searcher_time) {
        const date = new Date(searcher_time);
        const now = new Date()
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const day = now.toLocaleDateString() === date.toLocaleDateString() ? 'Сегодня' : tomorrow.toLocaleDateString() === date.toLocaleDateString() ? 'Завтра' : date.toLocaleDateString()
        const time = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        return day + ' ' + time;
    }

    function select(searcher) {
        const selected = [...selectedSearchers];
        let index = selectedSearchers.indexOf(searcher);
        if (index === -1) {
            selected.push(searcher);
        } else {
            selected.splice(index, 1);
        }
        setSelected(selected)
    }

    return <div className={styles.status}>
        {crews && crews.statuses && Object.keys(crews.statuses).map(status => {
            if (crews.statuses[status].length > 0) {
                const lite = (status === 'готов' || status === 'в пути на задачу') ? false : true;
                // console.log(status, ': ', lite)

                if (status === 'в пути на задачу') {
                    return <div>
                        <div className={styles.separator}></div>
                        <h3>В пути на задачу:</h3>
                        {crews.crews && crews.crews.map((crew, index) => (
                            <div>
                                {crew.length > 0 && <h4>{index === 0 ? 'Ждут экипаж' : 'Экипаж #' + index}</h4>}
                                {crew && crew.map(searcher => (
                                    searcher &&
                                    <Searcher lite={lite} toggleModal={toggleModal} searcher={searcher} getTime={getTime} select={select}></Searcher>
                                ))}
                            </div>
                        ))}
                    </div>
                } else {
                    return <div>
                        <div className={styles.separator}></div>
                        <h3>{status}:</h3>
                        {crews.statuses[status] && crews.statuses[status].map(searcher => (
                            searcher && <Searcher lite={lite} toggleModal={toggleModal} searcher={searcher} getTime={getTime} select={select}></Searcher>
                        ))}
                    </div>
                }
            }
        })}
    </div>
}