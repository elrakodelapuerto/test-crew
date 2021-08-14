import {Link, useHistory, useLocation} from "react-router-dom";
import styles from './AddSearcher.module.css'
import back from "../assets/img/back.svg";
import Airtable from "airtable";
import {useEffect} from "react";

let base = new Airtable({apiKey: 'keyHvrSKnN3fo7ORx'}).base('appou4euyZ2UDPPEg');

const EditSearcher = ({searcherData, setSearcherData}) => {
    let history = useHistory();
    console.log(searcherData);

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    useEffect( () => {
        document.body.style.overflowY = "auto";
    }, [] )

    const questID = useQuery().get("quest_id");

    const updateSearcher = (e) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target))
        const time = new Date(formData["searcher_time"]).toISOString()
        const meta_data = {
            quest_id: parseInt(questID),
            searcher_id: parseInt(formData["searcher_id"]),
            searcher_place: formData["searcher_place"],
            searcher_role: [formData["searcher_role"]],
            searcher_time: time
        }
        const searcher_data = {
            searcher_id: parseInt(formData["searcher_id"]),
            searcher_phone: formData["searcher_phone"],
            call_sign: formData["call_sign"],
        }

        base('CrewMeta').update([
            {
                "id": searcherData.meta_table_id,
                "fields": meta_data
            }
        ], function (err, records) {
            if (err) {
                console.error(err);
                return;
            }
            records.forEach(function (record) {
                console.log(record.getId());
            });

            base('Searchers').update([
                {
                    "id": searcherData.searchers_table_id,
                    "fields": searcher_data
                }
            ], function (err, records) {
                if (err) {
                    console.error(err);
                    return;
                }
                records.forEach(function (record) {
                    console.log(record.getId());
                });

                history.goBack();
            });
        });
    }

    return <div className={styles.editSearcher}>
        <div className={styles.header}><div className={styles.back} onClick={() => history.goBack()}><img src={back} alt='back'/></div>
            <h1>Редакировать</h1>
        </div>
        <div>
            <form className={styles.form} onSubmit={(e) => updateSearcher(e)}>
                <label>
                    Позывной:
                    <input type="text" name="call_sign" defaultValue={searcherData.call_sign}/>
                </label>
                <label>
                    @id:
                    <input type="number" name="searcher_id" defaultValue={searcherData.searcher_id}/>
                </label>
                <label>
                    Номер телефона:
                    <input type="phone" name="searcher_phone" defaultValue={searcherData.searcher_phone}/>
                </label>
                <label>
                    Адрес:
                    <input type="text" name="searcher_place" defaultValue={searcherData.searcher_place}/>
                </label>
                <label>
                    Время:
                    <input type="datetime-local" name="searcher_time" defaultValue={searcherData.searcher_time.substring(0, 16)}/>
                </label>
                <label>
                    Роль:
                    <select name="searcher_role" multiple={false} defaultValue={searcherData.searcher_role}>
                        <option value="пеший">Пеший</option>
                        <option value="пилот">Пилот</option>
                        <option value="инфорг">Инфорг</option>
                        <option value="снм">СНМ</option>
                        <option value="коорд">Коорд</option>
                    </select>
                </label>
                <input type="submit" value="Редактировать"/>
            </form>
        </div>

    </div>
}
export default EditSearcher;