import React from 'react';
import usePublishProduct from './hooks';
import { Button, Form, Input, Checkbox, Spin, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import './style.css';

const { TextArea } = Input;
const { Option } = Select;

const ProductPublishForm = () => {
	const {
		product,
		categories,
		error,
		isLoading,
		handleInputChange,
		handleCategoryChange,
		handlePriceChange,
		handlePublish,
	} = usePublishProduct();

	return (
		<div className='form-container'>
			<h2>Publicar Producto</h2>
			<Form
				layout='vertical'
				onFinish={handlePublish}
				initialValues={{
					available: product.available,
				}}
			>
				<Form.Item label='Nombre del Producto' name='name'>
					<Input
						name='name'
						value={product.name}
						onChange={handleInputChange}
						placeholder='Nombre del producto'
					/>
				</Form.Item>

				<Form.Item label='Descripción' name='description'>
					<TextArea
						name='description'
						value={product.description}
						onChange={handleInputChange}
						placeholder='Descripción del producto'
						rows={4}
					/>
				</Form.Item>

				<Form.Item label='Precio' name='price'>
					<Input
						type='number'
						name='price'
						value={product.price || ''}
						onChange={handlePriceChange}
						placeholder='29.99'
					/>
				</Form.Item>

				<Form.Item label='Imágenes' name='url_img'>
					<Input
						name='url_img'
						value={product.url_img}
						onChange={handleInputChange}
						placeholder='https://example.com/images/product1.jpg'
					/>
				</Form.Item>

				<Form.Item label='Stock' name='stock'>
					<Input
						type='number'
						name='stock'
						value={product.stock}
						onChange={handleInputChange}
						placeholder='100'
					/>
				</Form.Item>

				<Form.Item label='Promoción' name='promotion'>
					<Input
						name='promotion'
						value={product.promotion || ''}
						onChange={handleInputChange}
						placeholder='20% off this product'
					/>
				</Form.Item>

				<Form.Item label='Pyme ID' name='pyme_id'>
					<Input
						name='pyme_id'
						value={product.pyme_id || ''}
						onChange={handleInputChange}
						placeholder='123e4567-e89b-12d3-a456-426614174000'
					/>
				</Form.Item>

				<Form.Item label='Categoría' name='category_id'>
					<Select
						value={product.category_id}
						onChange={handleCategoryChange}
						placeholder='Selecciona una categoría'
					>
						{categories.map(category => (
							<Option key={category.category_id} value={category.category_id}>
								{category.name}
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item name='available' valuePropName='checked'>
					<Checkbox
						name='available'
						checked={product.available}
						onChange={(e: CheckboxChangeEvent) => handleInputChange(e)}
					>
						Disponible
					</Checkbox>
				</Form.Item>

				{error && <p className='text-danger'>{error}</p>}

				<Form.Item className='form-actions'>
					<Button
						type='default'
						onClick={() => window.history.back()}
						className='cancel-button'
					>
						Cancelar
					</Button>
					<Button
						type='primary'
						htmlType='submit'
						loading={isLoading}
						className='publish-button'
					>
						{isLoading ? <Spin /> : 'Publicar Producto'}
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ProductPublishForm;
