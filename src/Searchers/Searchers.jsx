import {Link, Route, Switch, useHistory, useLocation, useParams, useRouteMatch} from "react-router-dom";
import styles from './Searchers.module.css'
import back from '../assets/img/back.svg'
import add from '../assets/img/add.svg'
import {CurrentQuest} from "./CurrentQuest";
import EditSearcher from "../EditSearcher/EditSearcher";
import {useState} from "react";

const Searchers = () => {
    const [activeModal, setActiveModal] = useState(false)
    const [modal, setModal] = useState([])
    const history = useHistory();

    const Modal = ({searcher}) => {
        return <div className={styles.modal}>
            <div className={styles.modalWrapper}>
                <div className={styles.modalHeader}>
                    <h3>{searcher.call_sign}</h3>
                    <div className={styles.modalClose}
                         onClick={() => toggleModal()}>
                        Отмена
                    </div>
                </div>
                <div>
                    <ul>
                        <li>Сменить статус</li>
                        <li>Редактировать</li>
                        <li>В экипаж</li>
                        <li>Удалить</li>
                    </ul>
                </div>
            </div>
        </div>
    }

    const toggleModal = (searcher) => {
        console.log(modal);
        if (!modal[0]) {
            document.body.style.overflowY = "hidden";
            setModal([true, searcher])
        } else {
            document.body.style.overflowY = "auto";
            setModal([false])
        }
    }

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const questID = useQuery().get("quest_id");

    return (
        <div className={styles.searchers}>
            {modal[0] && <Modal searcher={modal[1]}/>}
            <div className={styles.header}>
                <div className={styles.back} onClick={() => history.goBack()}><img src={back} alt='back'/></div>
                <h1>Команда</h1>
            </div>
            <div className={styles.addSearcher}>
                <Link to={'/edit_searcher?quest_id=' + questID}>+ Добавить поисковика</Link>
            </div>
            <CurrentQuest questID={questID} toggleModal={toggleModal}/>
        </div>
    )
}

export default Searchers;