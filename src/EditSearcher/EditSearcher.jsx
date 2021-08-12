import {Link, useHistory, useLocation} from "react-router-dom";
import styles from './EditSearcher.module.css'
import back from "../assets/img/back.svg";
import Airtable from "airtable";

let base = new Airtable({apiKey: 'keyHvrSKnN3fo7ORx'}).base('appou4euyZ2UDPPEg');

const EditSearcher = () => {
    let history = useHistory();

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const questID = useQuery().get("quest_id");

    const updateSearcher = (e) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target))
        const time = new Date(formData["searcher_time"]).toISOString()
        const metaData = {
            quest_id: parseInt(questID),
            searcher_crew: 0,
            searcher_id: parseInt(formData["searcher_id"]),
            searcher_place: formData["searcher_place"],
            searcher_role: [formData["searcher_role"]],
            searcher_status: 'готов',
            searcher_time: time
        }
        const searcherData = {
            searcher_id: parseInt(formData["searcher_id"]),
            searcher_phone: formData["searcher_phone"],
            call_sign: formData["call_sign"],
        }

        base('CrewMeta').create([
            {
                "fields": metaData
            }
        ], function (err, records) {
            if (err) {
                console.error(err);
                return;
            }
            records.forEach(function (record) {
                console.log(record.getId());
            });
        });
        base('Searchers').create([
            {
                "fields": searcherData
            }
        ], function (err, records) {
            if (err) {
                console.error(err);
                return;
            }
            records.forEach(function (record) {
                console.log(record.getId());
            });
        });
    }

    return <div className={styles.editSearcher}>
        <div className={styles.header}><div className={styles.back} onClick={() => history.goBack()}><img src={back} alt='back'/></div>
            <h1>Добавить</h1>
        </div>
        <div>
            <form className={styles.form} onSubmit={(e) => updateSearcher(e)}>
                <label>
                    Позывной:
                    <input type="text" name="call_sign"/>
                </label>
                <label>
                    @id:
                    <input type="number" name="searcher_id"/>
                </label>
                <label>
                    Номер телефона:
                    <input type="phone" name="searcher_phone"/>
                </label>
                <label>
                    Адрес:
                    <input type="adress" name="searcher_place"/>
                </label>
                <label>
                    Время:
                    <input type="datetime-local" name="searcher_time"/>
                </label>
                <label>
                    Роль:
                    <select name="searcher_role">
                        <option selected value="пеший">Пеший</option>
                        <option value="пилот">Пилот</option>
                        <option value="инфорг">Инфорг</option>
                        <option value="снм">СНМ</option>
                        <option value="коорд">Коорд</option>
                    </select>
                </label>
                <input type="submit" value="Добавить"/>
            </form>
        </div>

    </div>
}
export default EditSearcher;