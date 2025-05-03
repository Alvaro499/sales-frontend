import RegisterPymeForm from '../../components/register/RegisterForm.tsx';
import styles from './RegisterPymePage.module.css';

const RegisterPymePage = () => {
	return (
		<div className={styles['register-pyme-page-container']}>
			<h1>Registro de Pyme en la Plataforma</h1>
			<RegisterPymeForm />
		</div>
	);
};

export default RegisterPymePage;
