import React, {useEffect, useState} from "react";
import Airtable from "airtable";
import {Link} from "react-router-dom";
let base = new Airtable({apiKey: 'keyHvrSKnN3fo7ORx'}).base('appou4euyZ2UDPPEg');

const Quests = () => {

    const [quests, setQuests] = useState([]);
    const [link, setLink] = useState([]);

    useEffect( () => {
        base('Quests').select().all( (error, records) => {
            const quests = records.map( record => record.fields)
            setQuests(quests);
        })
    }, [] )

    const addQuest = (chat_link) => {

        base('Quests').create([
            {
                "fields": {
                    "quest_id": 20000003,
                    "full_name": "Харонов Харон Харонович",
                    "chat_link": chat_link
                }
            }
        ], function(err, records) {
            if (err) {
                console.error(err);
                return;
            }
            const addedQuest = records.map( record => record.fields)[0]
            setQuests([...quests, addedQuest])
        });
    }

    return (
        <div>
            <h1>Quests</h1>
            <div>
                Link <br />
                <input value={link} onChange={(e) => setLink(e.target.value)}/>
            </div>
            <button onClick={() => addQuest(link)}>
                Add Quest
            </button>
            <ul>
                {quests && quests.map( (quest) => (
                    <li key={quest.quest_id}>
                        <Link to={'/crew?quest_id='+quest.quest_id}>
                            {quest.full_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Quests;