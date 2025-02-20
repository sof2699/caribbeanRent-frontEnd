import { useFormik } from 'formik';
import * as Yup from 'yup';
import { HeadFormCredentials } from '../HeadFormCredentials';
import { Divider } from '@mui/material';
import { ButtonGoogle } from '../ButtonGoogle';
import { DividerForm } from '../DividerForm';
import { ActionFooterAuth } from '../ActionFooterAuth';
import { InputPassword } from '../InputPassword';
import { useContext } from 'react';
import { MainLayoutContext } from '../../../Services/Context/MainLayoutContext';
import { modalEnums } from '../../../Enums/modalEnums';
import { InputForm } from '../InputForm';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../../Services/Store/slices/auth/actions';

export const Login = () => {
    const dispatch = useDispatch();

    const { handleOpenModal } = useContext(MainLayoutContext);

    const controller = false ? {
        email: 'pruebita@gmail.com',
        password: 'test2'
    } : {
        email: 'HP@gmail.com',
        password: '235'
    }

    const formik = useFormik({
        initialValues: controller,
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Formato de correo incorrecto').required('Campo requerido'),
            password: Yup.string().required('Campo requerido')
        }),
        onSubmit: async (values, actions) => {

            dispatch(startLogin(values));

            // actions.resetForm();
        }
    });
    

    return (
        <>
            <div className="flex flex-column align-items-center gap-20 px-3">
                <HeadFormCredentials text={"Bienvenido a"} />

                <Divider sx={{ borderColor: '#3B7D7A', width: '450px' }} />

                <form onSubmit={formik.handleSubmit} className='w-full'>
                    <div className="flex flex-column gap-20">

                        <InputForm
                            name="email"
                            type="email"
                            label="Correo"
                            formik={formik}
                        />

                        <InputPassword name="password" label="Contraseña" formik={formik} />

                        <button type="submit" className="button-style button-action">Continuar</button>
                    </div>
                </form >

                <DividerForm />

                <ButtonGoogle />

                <ActionFooterAuth
                    text="¿No tienes cuenta?"
                    actionText="Regístrate"
                    actionHandle={() => handleOpenModal(modalEnums.register)}
                />
            </div>
        </>
    )
}
