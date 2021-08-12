import styles from "./Searchers.module.css";

export function Inforgs({crews}) {
    return <div>
        <div className={styles.separator}></div>
        <h3>Инфорги:</h3>
        {
            crews.inforgs && crews.inforgs.map((searcher) => {
                const {searcher_phone, call_sign} = searcher;
                return (
                    <div className={styles.searcher}>
                        <div>
                            <div>{call_sign}</div>
                            <div>{searcher_phone}</div>
                        </div>
                    </div>
                );
            })
        }
    </div>
}