import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios";
import Table from "../components/Table";

// useState untuk menampung dan menampilkan 
export default function TrashStuff() {
    const [stuffTrash, setStuffTrash] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/stuff/trash`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        })
    }, [])

    const headers = [
        "#", 
        "Name",
        "Category"
    ]

    const endpointModal = {
        "restore": "http//localhost:8000/stuff/trash/restore/{id}",
        "delete_permanent": "http//localhost:8000/stuff/trash/permanent-delete/{id}",
    }

    const inputData = {}

    const title = 'Stuff'

    const columnIdentitasDelete = 'name'
    const buttons = [
        "restore",
        "permanentDelete",
    ]

    const tdColumn = {
        "name": null,
        "category": null,
    }

    return (
        <>
            <Case>
                <table headers={headers} data={stuffTrash} endpoint={endpointModal} inputData={inputData} titleModal={title} 
                identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}></table>
            </Case>
        </>
    )
}