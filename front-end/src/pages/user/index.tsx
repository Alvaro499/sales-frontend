import { useRegisterForm } from './hooks';
import { UserForm } from '../../components/forms/UserForms';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

const RegisterUserPage = () => {
    const { formData, error, isSubmitting, handleChange, handleSubmit } = useRegisterForm();

    return (
        <div className='register-user-container'>
            <div className='registration-user-wrapper'>
                <UserForm
                    formData={formData}
                    error={error}
                    isSubmitting={isSubmitting}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default RegisterUserPage;
