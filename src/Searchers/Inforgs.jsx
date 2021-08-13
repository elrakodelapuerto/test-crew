import styles from "./Searchers.module.css";
import {Searcher} from "./Searcher";

export function Inforgs({crews, toggleModal}) {
    return <div>
        <div className={styles.separator}></div>
        <h3>Инфорги:</h3>
        {
            crews.inforgs && crews.inforgs.map((searcher) => (
                <Searcher toggleModal={toggleModal} lite={true} searcher={searcher}></Searcher>
                )
            )
        }
    </div>
}