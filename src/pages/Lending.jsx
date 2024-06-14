import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Lending({titleModal}) {
    const [lending, setLending] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getLending()
    }, []);

    function getLending() {
        axios.get(`http://localhost:8000/lending/data`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setLending(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message' + encodeURIComponent('Anda belum login!'));
            }
        })
    }

    const headers = [
        "No.",
        "Name",
        "Bararng",
        "Data Time",
        "Notes",
        "Total Stuff",
    ]

    const endpointModal = {
        "data_detail": "http://localhost:8000/lending/{id}",
        // "delete": "http://localhost:8000/stuff/{id}",
        // "update": "http://localhost:8000/stuff/update/{id}",
        // "store" : "http://localhost:8000/stuff/store",
        // "delete_permanent" : "http://localhost:8000/inbound-stuff/delete/{id}",
    }

    const columnIdentitasDelete = 'name';
    const title = 'Lending'
  

    // const inputData = {
    //     "stuff_id" : {
    //         "tag": "input",
    //         "type": "numeric",
    //         "option": null
    //     },
    //     "user_id": {
    //         "tag": "input",
    //         "type": "numeric",
    //         "option": null
    //     },
    //     "date_time": {
    //          "tag": "input",
    //           "type": "date",
    //          "option": null
    //      }, 
    //      "notes": {
    //         "tag": "input",
    //         "type": "text",
    //         "option": null
    //      },
    //      "name": {
    //         "tag": "input",
    //         "type": "text",
    //         "option": null
    //      },
    //      "total_stuff": {
    //         "tag": "input",
    //         "type": "text",
    //         "option": null
    //      }

    //     };


    const buttons = [
        "create",
        // "trash",
        // "edit",
        "delete"
    ]

    const tdColumn = {
        "name": null,
        "stuff": "name",
        "date_time": null,
        "notes": null,
        "total_stuff": null,
    }

    return (
        <Case>
            <Table headers={headers} data={lending} endpoint={endpointModal} 
            titleModal={title} identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    )
}