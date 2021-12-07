import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/Dropdown';
import Input from 'components/Input';
import useFormData from 'hooks/useFormData';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Enum_Rol } from 'utils/enum';
import { REGISTRO } from 'graphql/auth/mutations';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';

const Register = () => {

  const navigate = useNavigate();

  const { form, formData, updateFormData } = useFormData();

  const [registro, {data: dataMutation, loading: loadingMutation, error: errorMutation}] =
  useMutation(REGISTRO)

  const submitForm = (e) => {
    e.preventDefault();
    console.log("fd", formData);
    registro({ variables: formData })
  };

  useEffect(() => {
    if (dataMutation) {
      toast.success("Usuario Creado");
      if(dataMutation.registro.token){
        localStorage.setItem("token", dataMutation.registro.token);
        navigate("/");
      }
    }
  }, [dataMutation]);

  useEffect(() => {
    if (errorMutation) {
      toast.error("Error creando el usuario");
    }
  }, [errorMutation]);

  return (
    <div className='flex flex-col h-full w-full items-center justify-center'>
      <h1 className='text-3xl font-bold my-4'>Regístrate</h1>
      <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
        <div className='grid grid-cols-2 gap-5'>
          <Input label='Nombre' name='nombre' type="text" required />
          <Input label='Apellido' name='apellido' type="text" required />
          <Input label='Documento' name='identificacion' type="text" required />
          <DropDown label="Rol Deseado:" name='rol' required={true} options={Enum_Rol} />
          <Input label='Correo' name='correo' type="email" required />
          <Input label='Contraseña' name='password' type="password" required />
        </div>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={loadingMutation}
          text="Registrarme"
        />
      </form>
      <span>¿Ya tienes una cuenta?</span>
      <Link to="/auth/login">
        <span className='text-blue-700'>Inicia sesión</span>
      </Link>
    </div>
  )
}

export default Register;
