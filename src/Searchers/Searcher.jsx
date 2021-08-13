import styles from "./Searchers.module.css";
import isPilot from "../assets/img/pilot.svg";

export function Searcher({searcher, getTime, toggleModal, lite=false}) {

    const {searcher_role, searcher_phone, searcher_time, call_sign, searcher_place} = searcher;
    return <div onClick={() => toggleModal(searcher)} className={styles.searcher}>
        <div className={styles.searcherHeader}>
            <div className={styles.searcherCallSign}>{call_sign}
                {searcher_role.includes('пилот') ?
                    <span className={styles.isPilot}><img src={isPilot}
                                                          alt=''/> </span> : ''}
            </div>
            <div>{searcher_phone}</div>
        </div>
        {!lite && <div className={styles.searcherBody}>
            <div>
                {searcher_place}
            </div>
            <div>
                {getTime(searcher_time)}
            </div>
        </div>
        }
    </div>;
}