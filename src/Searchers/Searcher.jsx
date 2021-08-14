import styles from "./Searchers.module.css";
import isPilot from "../assets/img/pilot.svg";
import iconTime from "../assets/img/time.svg";
import iconPlace from "../assets/img/place.svg";
import {getTime} from "../helpers";

export function Searcher({searcher, toggleModal, lite=false}) {

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
                <span><img src={iconPlace} /></span>
                <span>{searcher_place}</span>
            </div>
            <div>
                <span><img src={iconTime} /></span>
                <span>{getTime(searcher_time)}</span>
            </div>
        </div>
        }
    </div>;
}