import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import { Link } from 'react-router-dom';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import useFormData from 'hooks/useFormData';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario } from 'utils/enum';

const EditarUsuarios = () => {

  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  const {
    data: queryData,
    error:queryError,
    loading:queryLoading
   } = useQuery(GET_USUARIO, {
    variables: { _id}
  });

  const [editarUsuario,
    {data:mutationData, loading:mutationLoading, error:mutationError}] = useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("fd", formData);
    editarUsuario({
      variables: { _id, ...formData }
    })
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("Usuario Actualizado");
    }
  }, [mutationData]);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultando el usuario");
    }
    if(mutationError) {
      toast.error("Error actualizando el usuario");
    }
  }, [queryError, mutationError]);

  if (queryLoading || mutationLoading) return <div>Cargando....</div>;

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/usuarios'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Usuario</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        <Input
          label='Nombre de la persona:'
          type='text'
          name='nombre'
          defaultValue={queryData.User.nombre}
          required={true}
        />
        <Input
          label='Apellido de la persona:'
          type='text'
          name='apellido'
          defaultValue={queryData.User.apellido}
          required={true}
        />
        <Input
          label='Correo de la persona:'
          type='email'
          name='correo'
          defaultValue={queryData.User.correo}
          required={true}
        />
        <Input
          label='Identificación de la persona:'
          type='text'
          name='identificacion'
          defaultValue={queryData.User.identificacion}
          required={true}
        />
        <DropDown
          label='Estado de la persona:'
          name='estado'
          defaultValue={queryData.User.estado}
          required={true}
          options={Enum_EstadoUsuario}
        />
        <ButtonLoading
          disabled={Object.keys(formData).length===0}
          loading={mutationLoading}
          text='Confirmar'
        />
      </form>
    </div>
  )
}

export default EditarUsuarios;