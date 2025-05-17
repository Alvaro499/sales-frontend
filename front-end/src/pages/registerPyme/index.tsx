import { useRegisterForm } from './hooks';
import { RegistrationForm } from '../../components/forms/RegistrationForms';
import { showRecoveryAlert } from '../../utilities/alerts/recoveryAlert';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

const RegisterPymePage = () => {
	const { formData, error, isSubmitting, handleChange, handleSubmit } = useRegisterForm();

	return (
		<div className='register-page-container'>
			<div className='registration-wrapper'>
				<RegistrationForm
					formData={formData}
					error={error}
					isSubmitting={isSubmitting}
					onChange={handleChange}
					onSubmit={handleSubmit}
					onRecoveryClick={showRecoveryAlert}
				/>
			</div>
		</div>
	);
};

export default RegisterPymePage;
