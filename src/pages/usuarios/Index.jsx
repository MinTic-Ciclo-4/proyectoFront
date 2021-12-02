import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';

const IndexUsuarios = () => {
  const { data, error, loading } = useQuery(GET_USUARIOS);

  useEffect(() => {
    console.log('data servidor', data);
  }, [data]);


  return (
    <div>
      Datos Usuarios:
      <table className='tabla'>
        <thead>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Correo</th>
          <th>Identificación</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Editar</th>
        </thead>
        <tbody>
          {data && data.Users.map((u) => {
            return (
              <tr key={u._id}>
                <td>{u.nombre}</td>
                <td>{u.apellido}</td>
                <td>{u.correo}</td>
                <td>{u.identificacion}</td>
                <td>{u.rol}</td>
                <td>{u.estado}</td>
                <td>
                  {/* <Link to={`/usuarios/editar/${u._id}`}>
                    <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer'></i>
                  </Link> */}
                </td>
              </tr>
            )
          })

          }
        </tbody>
      </table>
    </div>
  )
}

export default IndexUsuarios
