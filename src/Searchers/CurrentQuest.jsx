import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Airtable from "airtable";
import {Inforgs} from "./Inforgs";
import {Statuses} from "./Statuses";

const test = {
    currentQuest: [],
    get crews() {
        const crews = [[]];
        const arr = [...new Set(this.statuses['в пути на задачу'].map( (searcher) => searcher["searcher_crew"]))]
        arr.forEach( crew => {
            if (crew===0) {
                crews[0] = this.statuses['в пути на задачу'].filter( searcher => searcher["searcher_crew"] === crew )
            } else {
                crews.push(this.statuses['в пути на задачу'].filter( searcher => searcher["searcher_crew"] === crew ))
            }
        })
        return crews;
    },
    get inforgs() {
        return this.currentQuest.filter( searcher => searcher["searcher_role"].includes('инфорг') )
    },
    get snm() {
        return this.currentQuest.filter( (searcher) => searcher["searcher_role"].includes('снм') )
    },
    get coord() {
        return this.currentQuest.filter( (searcher) => searcher["searcher_role"].includes('коорд') )
    },
    get statuses() {
        const statuses = {'готов':[], 'в пути на задачу':[], 'на задаче':[], 'в пути домой':[], 'дома':[]}
        this.currentQuest.forEach(searcher => {
            if (searcher.searcher_status !== 'готов') {
                statuses[searcher.searcher_status].push(searcher)
            } else if ( searcher["searcher_role"].includes('пилот') || searcher["searcher_role"].includes('пеший') ) {
                statuses[searcher.searcher_status].push(searcher)
            }
        })
        return statuses;
    }

};

export function CurrentQuest({questID, toggleModal}) {
    const [crews, setCrews] = useState({});
    const [selectedSearchers, setSelected] = useState([]);
    let base = new Airtable({apiKey: 'keyHvrSKnN3fo7ORx'}).base('appou4euyZ2UDPPEg');

    useEffect(() => {
        base('Searchers').select().all((error, records) => {
            const searchers = records.map(record => record.fields)

            base('CrewMeta').select(
                {
                    filterByFormula: `{quest_id} = ${questID}`
                }
            ).all((error, records) => {
                test['currentQuest'] = records.map(record => ({
                    ...record.fields,
                    table_id: record.id, ...searchers.find(s => s["searcher_id"] === record.fields.searcher_id)
                }));
                console.log(test);
                setCrews({...test});
            })
        })

    }, [])


    function uniteCrew() {
        const data = []
        selectedSearchers.forEach(searcher => {
            console.log(searcher);
            data.push({
                id: searcher.table_id,
                fields: {
                    searcher_status: "готов"
                }
            })
        })
        base('CrewMeta').update(data, (error, records) => {
            records.forEach(record => {
                test.currentQuest.find(searcher => searcher.table_id === record.id).searcher_status = record.fields.searcher_status
                setCrews({...test});
            })
        });
    }

    return <div>
                <Inforgs toggleModal={toggleModal} crews={crews}/>
                <Statuses toggleModal={toggleModal} crews={crews} setSelected={setSelected} selectedSearchers={selectedSearchers} />
                <div>
                    {selectedSearchers && selectedSearchers.map(searcher => {
                        return <div>
                            {searcher["call_sign"]}
                        </div>
                    })}
                    <button onClick={() => uniteCrew()}>Объединить в экипаж</button>
                </div>
    </div>;
}