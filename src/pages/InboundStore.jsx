import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function InboundStore() {
    const [inbound, setInbound] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getInbound()
    }, []);

    function getInbound() {
        axios.get(`http://localhost:8000/inbound-stuff/data`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setInbound(res.data.data);
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
        "Stuff_id",
        "Total",
        "Date",
        "Proff-file"
    ]

    const endpointModal = {
        // "data_detail": "http://localhost:8000/stuff/{id}",
        // "delete": "http://localhost:8000/stuff/{id}",
        // "update": "http://localhost:8000/stuff/update/{id}",
        // "store" : "http://localhost:8000/stuff/store",
        "delete_permanent" : "http://localhost:8000/inbound-stuff/delete/{id}",
    }

    const columnIdentitasDelete = 'stuff_id';
    const title = 'Inbound'
  

    const inputData = {
        "stuff_id" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "total": {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "date": {
             "tag": "input",
              "type": "text",
             "option": null
         }, 
         "proff_file": {
            "tag": "input",
            "type": "text",
            "option": null
         }

        }


    const buttons = [
        // "create",
        // "trash",
        // "edit",
        "delete"
    ]

    const tdColumn = {
        "stuff_id": null,
        "total": null,
        "date": null,
        "proff_file": null,
    }

    return (
        <Case>
            <Table headers={headers} data={inbound} endpoint={endpointModal} inputData={inputData} 
            titleModal={title} identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    )
}