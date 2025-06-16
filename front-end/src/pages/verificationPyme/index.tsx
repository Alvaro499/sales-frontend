import { VerificationForm } from '../../components/forms/VerificationForm';
import { useVerification } from './hooks';
import './styles/index.css';

export const VerificationPage = () => {
	const {
		code,
		error,
		isSubmitting,
		handleCodeChange,
		handleVerify,
		handleBack,
	} = useVerification();

	return (
		<div className='verification-page-container'>
			<div className='verification-wrapper'>
				<VerificationForm
					code={code}
					error={error}
					isSubmitting={isSubmitting}
					onCodeChange={handleCodeChange}
					onSubmit={handleVerify}
					onBack={handleBack}
				/>
			</div>
		</div>
	);
};

export default VerificationPage;
