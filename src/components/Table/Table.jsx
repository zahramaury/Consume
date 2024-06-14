import React from 'react'

export default function Table(props) {
    const data = [
        {
        nama: 'Zahra',
        rombel: 'PPLG XI-5',
        rayon: 'Cicurug 4'
        },
        {
        nama: 'Dhea',
        rombel: 'PPLG XI-5',
        rayon: 'Tajur 2'
        },
        {
        nama: 'Frieska',
        rombel: 'PPLG XI-5',
        rayon: 'Cicurug 1'
        },
    
      ];
  return (
    <>
        <table border= "1px solid pink">
            <thead>
                <tr>
                    <td>No</td>
                    <td>Nama</td>
                    <td>Rombel</td>
                    <td>Rayon</td>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((el, key) => (
                        <tr key={key}>
                            <td>{key+1}</td>
                            <td>{el.nama}</td>
                            <td>{el.rombel}</td>
                            <td>{el.rayon}</td>
                        </tr> 
                    ))
                }
            </tbody>
        </table>
    </>
  )
}
